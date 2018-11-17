const GNITokenCrowdsaleMock = artifacts.require("GNITokenCrowdsaleMock");
const InvestorListStub = artifacts.require("InvestorListStub");
const TokenStub = artifacts.require("TokenStub");
const ProjectQueueStub = artifacts.require("ProjectQueueStub");
const ProjectStub = artifacts.require("ProjectStub");
const Project = artifacts.require("Project");
const exceptions = require('./exceptions');
const stubUtil = require('./stubUtil');
let accounts;
let mockGTC;
let iLStub;
let tokenStub;
let pQStub;
let projStub1;
let projStub2;

contract('GNITokenCrowdsale', async (_accounts) => {
  accounts = _accounts;

  describe('pitchProject', async () => {
    describe('when the crowdsale is open', async () => {
      let initialProjectCount;
      let initialTotalValuation;
      let initialDoomsDay;
      let mintCallData;

      before(async () => {
        await setUp();
        initialProjectCount = await parseMethod(getProjectCount);
        initialTotalValuation = await parseMethod(getTotalValuation);
        initialDoomsDay = await parseMethod(getDoomsDay);

        await stubUtil.addMethod(tokenStub, 'mint');
        await stubUtil.addMethod(pQStub, 'enqueue');

        await mockGTC.pitchProject('mockProject', 1000000, 3000000, '345', '345');
        mintCallData = await stubUtil.callHistory(tokenStub, 'mint');
      })
      //
      it('mints developer tokens to the developer as a function of (rate * (valuation - capitalRequired)', async () => {
        let { firstAddress, firstUint } = mintCallData;
        assert.equal(firstAddress, accounts[0], 'developer tokens not minted to contract');
        assert.equal(firstUint, 100000000, 'incorrect number of developer tokens minted');
      })
      //
      it('mints investor tokens to the contract as a function of (rate * capitalRequired)', async () => {
        let { secondAddress, secondUint } = mintCallData;
        assert.equal(secondAddress, mockGTC.address, 'investor tokens not minted to contract');
        assert.equal(secondUint, 50000000, 'incorrect number of investor tokens minted');
      })

      it('increases the totalValuation by the project valuation', async () => {
        let finalTotalValuation = await parseMethod(getTotalValuation);
        assert.equal(finalTotalValuation, initialTotalValuation + 3000000, 'valuation not updated properly');
      })

      it('extends the doomsDay by 90 days', async () => {
        let finalDoomsDay = await parseMethod(getDoomsDay);
        assert.equal(finalDoomsDay, initialDoomsDay + (90 * 1728000), 'doomsDay not extended properly');
      })

      it('adds the new project address to projectAddrs array', async () => {
        let finalProjectCount = await parseMethod(getProjectCount);
        assert.equal(finalProjectCount, initialProjectCount + 1, 'project address not added to projectAddrs array');
      })

      it('enqueues the projectQueue with the project address', async () => {
        let projectAddr = await mockGTC.lastAddedAddr.call();
        let { firstAddress } = await stubUtil.callHistory(pQStub, 'enqueue');
        assert.equal(firstAddress, projectAddr, 'projectQueue not enqueued with the projcet address');
      })
    })

    describe('when the crowdsale is not open', async () => {
      it('reverts when the crowdsale has not opened yet', async () => {
        await setUp();
        await mockGTC.increaseMockOpening(400);
        await exceptions.catchRevert(mockGTC.pitchProject('mockProject', 1000000, 3000000, '345', '345'));
      })

      it('reverts after the crowdsale has closed', async () => {
        await setUp();
        await mockGTC.decreaseMockDoomsDay(4);
        await exceptions.catchRevert(mockGTC.pitchProject('mockProject', 1000000, 3000000, '345', '345'));
      })
    })
  })

  describe('buyTokensAndVote', async () => {
    let initialWeiRaised;

    before(async () => {
      await setUp();
      await initProjectStubs();

      initialWeiRaised = await parseMethod(getWeiRaised);

      await stubUtil.addMethod(iLStub, 'addInvestor');
      await stubUtil.addMethod(tokenStub, 'transferInactive');
      await stubUtil.addMethod(pQStub, 'heapify');
      await stubUtil.addMethod(projStub1, 'vote');
      await stubUtil.addMethod(mockGTC, 'tryActivateProject');

      await mockGTC.buyTokensAndVote(0, {from: accounts[1], value: 500000});
    })

    it('increases weiRaised by the purchase value', async () => {
      let finalWeiRaised = await parseMethod(getWeiRaised);
      assert.equal(finalWeiRaised, initialWeiRaised + 500000, 'purchase value not added to weiRaised');
    })

    it('transfers inactive tokens from the contract to the beneficiary as a function of value * rate', async () => {
      let { firstAddress, firstUint } = await stubUtil.callHistory(tokenStub, 'transferInactive');
      assert.equal(firstAddress, accounts[1], 'tokens not transfered to the correct beneficiary');
      assert.equal(firstUint, 25000000, 'incorrect token amount transfered');
    })

    it('votes for the project indicated', async () => {
      let { firstAddress, firstUint } = await stubUtil.callHistory(projStub1, 'vote');
      assert.equal(firstAddress, accounts[1], 'the corrent project was not voted for');
      assert.equal(firstUint, 25000000, 'incorrect vote amount assigned to project');
    })

    it('updates the projectQueue', async () => {
      let { firstAddress } = await stubUtil.callHistory(pQStub, 'heapify');
      assert.equal(firstAddress, projStub1.address, 'project queue not updated with the proper address');
    })

    it('trys to activate a project', async () => {
      let { called } = await stubUtil.callHistory(mockGTC, 'tryActivateProject');
      assert.equal(called, true, 'project activation not attempted');
    })
  })

  describe('transferVotes', async () => {
    before(async () => {
      await setUp();
      await initProjectStubs();

      await stubUtil.addMethod(projStub1, 'removeVotes');
      await stubUtil.addMethod(projStub2, 'vote');
      await stubUtil.addMethod(pQStub, 'heapify');
      await stubUtil.addMethod(mockGTC, 'tryActivateProject');

      await mockGTC.transferVotes(0, 1, 20000000, {from: accounts[1]});
    })

    it('removes votes from one project', async () => {
      let { firstAddress, firstUint } = await stubUtil.callHistory(projStub1, 'removeVotes');
      assert.equal(firstAddress, accounts[1], 'votes not removed from correct voter');
      assert.equal(firstUint, 20000000, 'incorrect vote amount transfered from project');
    })

    it('votes for another project', async () => {
      let { firstAddress, firstUint } = await stubUtil.callHistory(projStub2, 'vote');
      assert.equal(firstAddress, accounts[1], 'votes not assigned for correct voter');
      assert.equal(firstUint, 20000000, 'incorrect vote amount transfered to project');
    })

    it('updates the position of the from project in the projectQueue', async () => {
      let { firstAddress } = await stubUtil.callHistory(pQStub, 'heapify');
      assert.equal(firstAddress, projStub1.address, 'project queue not updated with the proper address');
    })

    it('updates the position of the from project in the projectQueue', async () => {
      let { secondAddress } = await stubUtil.callHistory(pQStub, 'heapify');
      assert.equal(secondAddress, projStub2.address, 'project queue not updated with the proper address');
    })

    it('trys to activate a project', async () => {
      let { called } = await stubUtil.callHistory(mockGTC, 'tryActivateProject');
      assert.equal(called, true, 'project activation not attempted');
    })
  })

  describe('addVoteCredit', async () => {
    before(async () => {
      await setUp();
      await initProjectStubs();

      await stubUtil.addMethod(projStub1, 'removeVotes');
      await stubUtil.addMethod(iLStub, 'addVoteCredit');
      await stubUtil.addMethod(pQStub, 'heapify');
      await stubUtil.addMethod(mockGTC, 'tryActivateProject');

      await mockGTC.addVoteCredit(0, 20000000, {from: accounts[1]});
    })

    it('removes the indicated amount of votes from a project', async () => {
      let { firstAddress, firstUint } = await stubUtil.callHistory(projStub1, 'removeVotes');
      assert.equal(firstAddress, accounts[1], 'votes not removed from correct voter');
      assert.equal(firstUint, 20000000, 'incorrect vote amount transfered from project');
    })

    it('assigns the inicated amount of vote credit to the sender', async () => {
      let { firstAddress, firstUint } = await stubUtil.callHistory(iLStub, 'addVoteCredit');
      assert.equal(firstAddress, accounts[1], 'votes not assigned for correct voter');
      assert.equal(firstUint, 20000000, 'incorrect vote credit amount assigned');
    })

    it('updates the projectQueue', async () => {
      let { firstAddress } = await stubUtil.callHistory(pQStub, 'heapify');
      assert.equal(firstAddress, projStub1.address, 'project queue not updated with the proper address');
    })

    it('trys to activate a project', async () => {
      let { called } = await stubUtil.callHistory(mockGTC, 'tryActivateProject');
      assert.equal(called, true, 'project activation not attempted');
    })
  })
  //
  describe('voteWithCredit', async () => {
    before(async () => {
      await setUp();
      await initProjectStubs();

      await stubUtil.addMethod(projStub1, 'vote');
      await stubUtil.addMethod(iLStub, 'removeVoteCredit');
      await stubUtil.addMethod(pQStub, 'heapify');
      await stubUtil.addMethod(mockGTC, 'tryActivateProject');

      await mockGTC.voteWithCredit(0, 20000000, {from: accounts[1]});
    })

    it('removes the indicated amount of votes from the senders vote credit', async () => {
      let { firstAddress, firstUint } = await stubUtil.callHistory(iLStub, 'removeVoteCredit');
      assert.equal(firstAddress, accounts[1], 'votes credit not removed for the correct voter');
      assert.equal(firstUint, 20000000, 'incorrect vote credit amount removed');
    })

    it('votes for the project indicated', async () => {
      let { firstAddress, firstUint } = await stubUtil.callHistory(projStub1, 'vote');
      assert.equal(firstAddress, accounts[1], 'the corrent project was not voted for');
      assert.equal(firstUint, 20000000, 'incorrect vote amount assigned to project');
    })

    it('updates the projectQueue', async () => {
      let { firstAddress } = await stubUtil.callHistory(pQStub, 'heapify');
      assert.equal(firstAddress, projStub1.address, 'project queue not updated with the proper address');
    })

    it('trys to activate a project', async () => {
      let { called } = await stubUtil.callHistory(mockGTC, 'tryActivateProject');
      assert.equal(called, true, 'project activation not attempted');
    })
  })
  //
  // describe('tryActivateProject', async () => {//we should pass the project in instead.
  //   //when the projet has enough funds
  //     //when the project is still open
  //       //dequeue
  //       //activation logic:
  //         //token.activate is called for the number of investors + one for the developer
  //         //funds are forwarded
  //         //weiRaised is decremented
  //         //project.activate is called
  //       //function is called again
  //     //when the project is not open
  //       //dequeue
  //       //function called again
  //   //when the project doesnt have enough funds
  //     //when the project is still open
  //       //nothing
  //     //when the project is not open
  //       //dequeue
  //       //function called again
  //   describe('when the project has enough funds', async () => {
  //     it('')
  //   })
  // })
})

const setUp = async () => {
  await initProjectQ();
  await initIL();
  await initToken();
  await initMock();
}

const initMock = async () => {
  let openingTime = await getLatestBlockTime();
  let doomsDay = openingTime + 86400 * 240;
  mockGTC = await GNITokenCrowdsaleMock.new(openingTime, doomsDay, 50, accounts[0], tokenStub.address, iLStub.address, pQStub.address);
}

const initIL = async () => {
  iLStub = await InvestorListStub.new();
}

const initToken = async () => {
  tokenStub = await TokenStub.new(iLStub.address);
}

const initProjectQ = async () => {
  pQStub = await ProjectQueueStub.new();
}

const initProjectStubs = async () => {
  projStub1 = await createProjectStub({
    id: 0, name: 'project1', developer: accounts[0],
    valuation: 4000000, capitalRequired: 2000000, developerTokens: 200000000,
    investorTokens: 100000000, lat: '340', lng: '340', mockVotes: 75000000
  })

  await mockGTC.addMockProject(projStub1.address);

  projStub2 = await createProjectStub({
    id: 1, name: 'project2', developer: accounts[0],
    valuation: 3000000, capitalRequired: 1000000, developerTokens: 150000000,
    investorTokens: 50000000, lat: '340', lng: '340', mockVotes: 50000000
  })

  await mockGTC.addMockProject(projStub2.address);
}

const createProjectStub = async (params) => {
  let {
    id, name, developer,
    valuation, capitalRequired, developerTokens,
    investorTokens, lat, lng, mockVotes
  } = params;

  return await ProjectStub.new(
    id, name, developer,
    valuation, capitalRequired, developerTokens,
    investorTokens, lat, lng, mockVotes
  );
}

const getProjectCount = async () => {
  return await mockGTC.mockProjectCount.call();
}

const getTotalValuation = async () => {
  return await mockGTC.mockValuation.call();
}

const getDoomsDay = async () => {
  return await mockGTC.mockDoomsDay.call();
}

const getWeiRaised = async () => {
  return await mockGTC.weiRaised_.call();
}

const getLatestBlockTime = async () => {
  let time = await web3.eth.getBlock('latest');
  return time.timestamp;
}


const parseMethod = async (method) => {
  let result = await method();
  return parseBN(result);
}

const parseBN = (bigNumber) => {
  return bigNumber.toNumber();
}
