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
let projStub3;

let defaultOpeningTime;
let defaultDoomsDay;

contract('GNITokenCrowdsale', async (_accounts) => {
  accounts = _accounts;

  before(async () => {
    await setUp();
    await initProjectStubs();
  })

  describe('pitchProject', async () => {
    describe('when the crowdsale is open', async () => {
      let initialProjectCount;
      let initialTotalValuation;
      let initialDoomsDay;
      let mintCallData;

      before(async () => {
        // await setUp();
        initialProjectCount = await parseMethod(getProjectCount);
        initialTotalValuation = await parseMethod(getTotalValuation);
        initialDoomsDay = await parseMethod(getDoomsDay);

        await stubUtil.addMethod(tokenStub, 'mint');
        await stubUtil.addMethod(pQStub, 'enqueue');

        await mockGTC.pitchProject('mockProject', 1000000, 3000000, '345', '345');
        mintCallData = await stubUtil.callHistory(tokenStub, 'mint');
      })
      //
      //after we need to remove the project address from the array

      it('mints developer tokens to the developer as a function of (rate * (valuation - capitalRequired)', async () => {
        let { firstAddress, firstUint } = mintCallData;
        assert.equal(firstAddress, accounts[1], 'developer tokens not minted to contract');
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
      after(async () => {
        await mockGTC.setMockDoomsDay(defaultDoomsDay);
      })

      it('reverts when the crowdsale has not opened yet', async () => {
        await mockGTC.setMockOpening(defaultOpeningTime * 400);
        await exceptions.catchRevert(mockGTC.pitchProject('mockProject', 1000000, 3000000, '345', '345'));
      })

      it('reverts after the crowdsale has closed', async () => {
        await mockGTC.setMockOpening(defaultOpeningTime);
        await mockGTC.setMockDoomsDay(defaultDoomsDay / 2);
        await exceptions.catchRevert(mockGTC.pitchProject('mockProject', 1000000, 3000000, '345', '345'));
      })
    })
  })
  //
  describe('buyTokensAndVote', async () => {
    let initialWeiRaised;

    before(async () => {
      initialWeiRaised = await parseMethod(getWeiRaised);

      await stubUtil.addMethod(iLStub, 'addInvestor');
      await stubUtil.addMethod(tokenStub, 'transferInactive');
      await stubUtil.addMethod(pQStub, 'heapify');
      await stubUtil.addMethod(projStub1, 'vote');
      await stubUtil.addMethod(mockGTC, 'tryActivateProject');

      await mockGTC.buyTokensAndVote(0, {from: accounts[2], value: 500000});
    })

    after(async () => {
      await stubUtil.resetMethod(iLStub, 'addInvestor');
      await stubUtil.resetMethod(tokenStub, 'transferInactive');
      await stubUtil.resetMethod(pQStub, 'heapify');
      await stubUtil.resetMethod(projStub1, 'vote');
      await stubUtil.resetMethod(mockGTC, 'tryActivateProject');
    })

    it('increases weiRaised by the purchase value', async () => {
      let finalWeiRaised = await parseMethod(getWeiRaised);
      assert.equal(finalWeiRaised, initialWeiRaised + 500000, 'purchase value not added to weiRaised');
    })

    it('transfers inactive tokens from the contract to the beneficiary as a function of value * rate', async () => {
      let { firstAddress, firstUint } = await stubUtil.callHistory(tokenStub, 'transferInactive');
      assert.equal(firstAddress, accounts[2], 'tokens not transfered to the correct beneficiary');
      assert.equal(firstUint, 25000000, 'incorrect token amount transfered');
    })

    it('votes for the project indicated', async () => {
      let { firstAddress, firstUint } = await stubUtil.callHistory(projStub1, 'vote');
      assert.equal(firstAddress, accounts[2], 'the corrent project was not voted for');
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
      await stubUtil.addMethod(projStub1, 'removeVotes');
      await stubUtil.addMethod(projStub2, 'vote');
      await stubUtil.addMethod(pQStub, 'heapify');
      await stubUtil.addMethod(mockGTC, 'tryActivateProject');

      await mockGTC.transferVotes(0, 1, 20000000, {from: accounts[2]});
    })

    after(async () => {
      await stubUtil.resetMethod(projStub1, 'removeVotes');
      await stubUtil.resetMethod(projStub2, 'vote');
      await stubUtil.resetMethod(pQStub, 'heapify');
      await stubUtil.resetMethod(mockGTC, 'tryActivateProject');
    })

    it('removes votes from one project', async () => {
      let { firstAddress, firstUint } = await stubUtil.callHistory(projStub1, 'removeVotes');
      assert.equal(firstAddress, accounts[2], 'votes not removed from correct voter');
      assert.equal(firstUint, 20000000, 'incorrect vote amount transfered from project');
    })

    it('votes for another project', async () => {
      let { firstAddress, firstUint } = await stubUtil.callHistory(projStub2, 'vote');
      assert.equal(firstAddress, accounts[2], 'votes not assigned for correct voter');
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
      await stubUtil.addMethod(projStub1, 'removeVotes');
      await stubUtil.addMethod(iLStub, 'addVoteCredit');
      await stubUtil.addMethod(pQStub, 'heapify');
      await stubUtil.addMethod(mockGTC, 'tryActivateProject');

      await mockGTC.addVoteCredit(0, 20000000, {from: accounts[2]});
    })

    after(async () => {
      await stubUtil.resetMethod(projStub1, 'removeVotes');
      await stubUtil.resetMethod(iLStub, 'addVoteCredit');
      await stubUtil.resetMethod(pQStub, 'heapify');
      await stubUtil.resetMethod(mockGTC, 'tryActivateProject');
    })

    it('removes the indicated amount of votes from a project', async () => {
      let { firstAddress, firstUint } = await stubUtil.callHistory(projStub1, 'removeVotes');
      assert.equal(firstAddress, accounts[2], 'votes not removed from correct voter');
      assert.equal(firstUint, 20000000, 'incorrect vote amount transfered from project');
    })

    it('assigns the inicated amount of vote credit to the sender', async () => {
      let { firstAddress, firstUint } = await stubUtil.callHistory(iLStub, 'addVoteCredit');
      assert.equal(firstAddress, accounts[2], 'votes not assigned for correct voter');
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

  describe('voteWithCredit', async () => {
    before(async () => {
      await stubUtil.addMethod(projStub1, 'vote');
      await stubUtil.addMethod(iLStub, 'removeVoteCredit');
      await stubUtil.addMethod(pQStub, 'heapify');
      await stubUtil.addMethod(mockGTC, 'tryActivateProject');

      await mockGTC.voteWithCredit(0, 20000000, {from: accounts[2]});
    })

    after(async () => {
      await stubUtil.resetMethod(projStub1, 'vote');
      await stubUtil.resetMethod(iLStub, 'removeVoteCredit');
      await stubUtil.resetMethod(pQStub, 'heapify');
      await stubUtil.resetMethod(mockGTC, 'tryActivateProject');
    })

    it('removes the indicated amount of votes from the senders vote credit', async () => {
      let { firstAddress, firstUint } = await stubUtil.callHistory(iLStub, 'removeVoteCredit');
      assert.equal(firstAddress, accounts[2], 'votes credit not removed for the correct voter');
      assert.equal(firstUint, 20000000, 'incorrect vote credit amount removed');
    })

    it('votes for the project indicated', async () => {
      let { firstAddress, firstUint } = await stubUtil.callHistory(projStub1, 'vote');
      assert.equal(firstAddress, accounts[2], 'the corrent project was not voted for');
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

  describe('tryActivateProject', async () => {
    let initialDeveloperWei;
    let beforeWeiRaised;

    before(async () => {
      await tryActivateProjectSetup();
    })

    describe('when enough funds have been raised to activate the leading project', async () => {
      describe('when the leading project is still open', async () => {
        let finalDeveloperWei;

        before(async () => {
          await mockGTC.receiveMockWei({value: 2000, from: accounts[2]});
          await projStub3.setStubCapRequired(2000);
          await mockGTC.setMockWeiRaised(3000);

          beforeWeiRaised = await parseMethod(getWeiRaised);
          initialDeveloperWei = await getWeiAmount(accounts[1]);
          await projStub3.setStubOpenStatus(true);
          await mockGTC.tryActivateProject_();
          finalDeveloperWei = await getWeiAmount(accounts[1]);
        })

        after(async () => {
          await stubUtil.resetMethod(projStub3, 'activate');
          await stubUtil.resetMethod(tokenStub, 'activate');
          await stubUtil.resetMethod(projStub3, 'removeVotes');
          await stubUtil.resetMethod(iLStub, 'removeVoteCredit');
          await stubUtil.resetMethod(mockGTC, 'tryActivateProject');
          await stubUtil.resetMethod(pQStub, 'dequeue');
        })

        it('activates the leading project', async () => {
          let { called } = await stubUtil.callHistory(projStub3, 'activate');
          assert.equal(called, true, 'project not activated');
        })

        it('activates the projects invesor tokens', async () => {
          let { firstAddress, secondAddress, firstUint, secondUint } = await stubUtil.callHistory(tokenStub, 'activate');
          assert.equal(firstAddress, accounts[2], 'tokens not activated for the correct investor');
          assert.equal(firstUint, 6153846, 'incorrect number of tokens activated for investor');
          assert.equal(secondAddress, accounts[3], 'tokens not activated for the correct investor');
          assert.equal(secondUint, 3846153, 'incorrect number of tokens activated for investor');
        })

        it('activates the projects developer tokens', async () => {
          let { thirdAddress, thirdUint } = await stubUtil.callHistory(tokenStub, 'activate');
          assert.equal(thirdAddress, accounts[1], 'tokens not activated for the correct developer');
          assert.equal(thirdUint, 10000000, 'incorrect number of tokens activated for developer');
        })

        it('forwards funds to the developer', async () => {
          assert.equal(finalDeveloperWei, initialDeveloperWei + 2000, 'funds not forwarded to developer');
        })

        it('reduces the weiRaised by the capitalRequired of the leading project', async () => {
          let afterWei = await parseMethod(getWeiRaised);
          assert.equal(afterWei, beforeWeiRaised - 2000, 'weiRaised not reduced by capitalRequired');
        })

        it('dequeues the leading project from the projectQueue', async () => {
          let { called } = await stubUtil.callHistory(pQStub, 'dequeue');
          assert.equal(called, true, 'leading project was not dequeued');
        })

        it('resursively calls itself', async () => {
          let { callCount } = await stubUtil.callHistory(mockGTC, 'tryActivateProject');
          assert.equal(callCount, 2, 'function was not called recusively');
        })
      })

      describe('when the leading project has closed', async () => {
        before(async () => {
          await mockGTC.receiveMockWei({value: 2000, from: accounts[2]});
          await projStub3.setStubCapRequired(2000);
          await mockGTC.setMockWeiRaised(3000);

          beforeWeiRaised = await parseMethod(getWeiRaised);
          initialDeveloperWei = await getWeiAmount(accounts[1]);
          await projStub3.setStubOpenStatus(false);
          await mockGTC.tryActivateProject_();
          finalDeveloperWei = await getWeiAmount(accounts[1]);
        })

        after(async () => {
          await stubUtil.resetMethod(projStub3, 'activate');
          await stubUtil.resetMethod(tokenStub, 'activate');
          await stubUtil.resetMethod(projStub3, 'removeVotes');
          await stubUtil.resetMethod(iLStub, 'removeVoteCredit');
          await stubUtil.resetMethod(mockGTC, 'tryActivateProject');
          await stubUtil.resetMethod(pQStub, 'dequeue');
        })

        it('does not forwards funds to the developer', async () => {
          assert.equal(finalDeveloperWei, initialDeveloperWei, 'funds were transferred to developer but shoud not have been');
        })

        it('does not activate the leading project', async () => {
          let { called } = await stubUtil.callHistory(projStub3, 'activate');
          assert.equal(called, false, 'project should not have been activated');
        })

        it('does not activate any tokens', async () => {
          let { called } = await stubUtil.callHistory(tokenStub, 'activate');
          assert.equal(called, false, 'tokens should not have been activated');
        })

        it('does not affect weiRaised', async () => {
          let afterWei = await parseMethod(getWeiRaised);
          assert.equal(afterWei, beforeWeiRaised, 'weiRaised not reduced by capitalRequired');
        })

        it('dequeues the leading project from the projectQueue', async () => {
          let { called } = await stubUtil.callHistory(pQStub, 'dequeue');
          assert.equal(called, true, 'leading project was not dequeued');
        })

        it('resursively calls itself', async () => {
          let { callCount } = await stubUtil.callHistory(mockGTC, 'tryActivateProject');
          assert.equal(callCount, 2, 'function was not called recusively');
        })
      })
    })

    describe('when there is not enough funds to activate the leading project', async () => {
      describe('when the leading project is still open', async () => {
        let finalDeveloperWei;

        before(async () => {
          await projStub3.setStubCapRequired(2000);
          await mockGTC.setMockWeiRaised(1000);

          beforeWeiRaised = await parseMethod(getWeiRaised);
          initialDeveloperWei = await getWeiAmount(accounts[1]);
          await projStub3.setStubOpenStatus(true);
          await mockGTC.tryActivateProject_();
          finalDeveloperWei = await getWeiAmount(accounts[1]);
        })

        after(async () => {
          await stubUtil.resetMethod(projStub3, 'activate');
          await stubUtil.resetMethod(tokenStub, 'activate');
          await stubUtil.resetMethod(projStub3, 'removeVotes');
          await stubUtil.resetMethod(iLStub, 'removeVoteCredit');
          await stubUtil.resetMethod(mockGTC, 'tryActivateProject');
          await stubUtil.resetMethod(pQStub, 'dequeue');
        })

        it('does not forwards funds to the developer', async () => {
          assert.equal(finalDeveloperWei, initialDeveloperWei, 'funds were transferred to developer but shoud not have been');
        })

        it('does not activate the leading project', async () => {
          let { called } = await stubUtil.callHistory(projStub3, 'activate');
          assert.equal(called, false, 'project should not have been activated');
        })

        it('does not activate any tokens', async () => {
          let { called } = await stubUtil.callHistory(tokenStub, 'activate');
          assert.equal(called, false, 'tokens should not have been activated');
        })

        it('does not affect weiRaised', async () => {
          let afterWei = await parseMethod(getWeiRaised);
          assert.equal(afterWei, beforeWeiRaised, 'weiRaised should not change');
        })

        it('leaves the project in the projectQueue', async () => {
          let { called } = await stubUtil.callHistory(pQStub, 'dequeue');
          assert.equal(called, false, 'leading project should remain in the queue');
        })

        it('does not resursively call itself', async () => {
          let { callCount } = await stubUtil.callHistory(mockGTC, 'tryActivateProject');
          assert.equal(callCount, 1, 'function should not have been called recusively');
        })
      })

      describe('when the leading project has closed', async () => {
        before(async () => {
          beforeWeiRaised = await parseMethod(getWeiRaised);
          initialDeveloperWei = await getWeiAmount(accounts[1]);
          await projStub3.setStubOpenStatus(false);
          await mockGTC.tryActivateProject_();
          finalDeveloperWei = await getWeiAmount(accounts[1]);
        })

        it('does not forwards funds to the developer', async () => {
          assert.equal(finalDeveloperWei, initialDeveloperWei, 'funds were transferred to developer but shoud not have been');
        })

        it('does not activate the leading project', async () => {
          let { called } = await stubUtil.callHistory(projStub3, 'activate');
          assert.equal(called, false, 'project should not have been activated');
        })

        it('does not activate any tokens', async () => {
          let { called } = await stubUtil.callHistory(tokenStub, 'activate');
          assert.equal(called, false, 'tokens should not have been activated');
        })

        it('does not affect weiRaised', async () => {
          let afterWei = await parseMethod(getWeiRaised);
          assert.equal(afterWei, beforeWeiRaised, 'weiRaised not reduced by capitalRequired');
        })

        it('dequeues the leading project from the projectQueue', async () => {
          let { called } = await stubUtil.callHistory(pQStub, 'dequeue');
          assert.equal(called, true, 'leading project was not dequeued');
        })

        it('resursively calls itself', async () => {
          let { callCount } = await stubUtil.callHistory(mockGTC, 'tryActivateProject');
          assert.equal(callCount, 2, 'function was not called recusively');
        })
      })
    })
  })
})

const setUp = async () => {
  await initProjectQ();
  await initIL();
  await initToken();
  await initMock();
}

const initMock = async () => {
  defaultOpeningTime = await getLatestBlockTime();
  defaultDoomsDay = defaultOpeningTime + 86400 * 240;
  mockGTC = await GNITokenCrowdsaleMock.new(defaultOpeningTime, defaultDoomsDay, 50, accounts[1], tokenStub.address, iLStub.address, pQStub.address);
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
    id: 0, name: 'project1', developer: accounts[1],
    valuation: 4000000, capitalRequired: 2000000, developerTokens: 200000000,
    investorTokens: 100000000, lat: '340', lng: '340', mockVotes: 75000000
  })

  await mockGTC.addMockProject(projStub1.address);

  projStub2 = await createProjectStub({
    id: 1, name: 'project2', developer: accounts[1],
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

const tryActivateProjectSetup = async () => {
  await setUp();

  projStub3 = await createProjectStub({
    id: 0, name: 'project3', developer: accounts[1],
    valuation: 4000000, capitalRequired: 2000000, developerTokens: 200000000,
    investorTokens: 100000000, lat: '340', lng: '340', mockVotes: 75000000
  });

  await pQStub.addStubLeader(projStub3.address);

  await tokenStub.init(accounts[1], accounts[2], accounts[3]);
  await iLStub.initMockInvestors(accounts[2], accounts[3]);

  await stubUtil.addMethod(pQStub, 'dequeue');
  await stubUtil.addMethod(projStub3, 'activate');
  await stubUtil.addMethod(tokenStub, 'activate');
  await stubUtil.addMethod(projStub3, 'removeVotes');
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

const getWeiAmount = async (account) => {
  let wei = await web3.eth.getBalance(account);
  return Number(wei);
}

const parseMethod = async (method) => {
  let result = await method();
  return parseBN(result);
}

const parseBN = (bigNumber) => {
  return bigNumber.toNumber();
}
