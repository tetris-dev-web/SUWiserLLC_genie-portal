const GNITokenCrowdsaleMock = artifacts.require("GNITokenCrowdsaleMock");
const InvestorListStub = artifacts.require("InvestorListStub");
const TokenStub = artifacts.require("TokenStub");
const ProjectStub = artifacts.require("ProjectStub");
const ProjectLeaderBoardStub = artifacts.require("ProjectLeaderBoardStub");
const Project = artifacts.require("Project");
const BigNumber = require('bignumber.js');
const exceptions = require('./exceptions');
const stubUtil = require('./stubUtil');
const { parseBN, parseMethod, weiBalanceOf } = require('./parseUtil');

let accounts;
let mockGTC;
let iLStub;
let tokenStub;
let lBStub;
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
    let voteHash;
    let removeVoteHash;
    describe('when the crowdsale is open', async () => {
      let initialProjectCount;
      let initialTotalValuation;
      let initialDoomsDay;
      let mintCallData;

      before(async () => {
        initialProjectCount = await parseMethod(getProjectCount);
        initialTotalValuation = await parseMethod(getTotalValuation);
        initialDoomsDay = await parseMethod(getDoomsDay);

        await stubUtil.addMethod(tokenStub, 'mint');
        voteHash = web3.fromAscii('random');
        removeVoteHash = web3.fromAscii('moreRandom');

        await mockGTC.pitchProject('mockProject', 1000000, 3000000, '345', '345', voteHash, removeVoteHash);
        mintCallData = await stubUtil.callHistory(tokenStub, 'mint');
      })

      after(async () => {
        await mockGTC.setStubProjectCount(0);
      })

      it('mints developer tokens to the developer as a function of (rate * (valuation - capitalRequired))', async () => {
        let { firstAddress, firstUint } = mintCallData;
        assert.equal(firstAddress, accounts[1], 'developer tokens not minted to contract');
        assert.equal(firstUint, 100000000, 'incorrect number of developer tokens minted');
      })

      it('mints investor tokens to the contract as a function of (rate * capitalRequired)', async () => {
        let { secondAddress, secondUint } = mintCallData;
        assert.equal(secondAddress, mockGTC.address, 'investor tokens not minted to contract');
        assert.equal(secondUint, 50000000, 'incorrect number of investor tokens minted');
      })

      it('increases the totalValuation by the project valuation', async () => {
        let finalTotalValuation = await parseMethod(getTotalValuation);
        assert.equal(finalTotalValuation, initialTotalValuation + 3000000, 'valuation not updated properly');
      })

      it('extends the doomsDay by 90 days from the current time', async () => {
        let finalDoomsDay = await parseMethod(getDoomsDay);
        let now = await getLatestBlockTime();
        assert.equal(finalDoomsDay, now + (90 * 1728000), 'doomsDay not extended properly');
      })

      it('increments totalProjectCount by one', async () => {
        let finalProjectCount = await parseMethod(getProjectCount);
        assert.equal(finalProjectCount, initialProjectCount + 1, 'totalProjectCount should increment by 1');
      })

      it('stores the project address by the order in which it was created', async () => {
        let address = await mockGTC.mockProjectById(4);
        assert(address, 'project address not stored');
      })

      //it should create mappings for vote hashes
      it('stores a vote hash associated with the project', async () => {
        let address = await mockGTC.mockProjectById(4);
        let storedVoteHash = await mockGTC.viewMockVoteHash(address);
        let recoveredHash = web3.toAscii(storedVoteHash);
        assert(recoveredHash, 'voteHash should be stored asssociated with project');
      })

      it('stores a remove vote hash associated with the project', async () => {
        let address = await mockGTC.mockProjectById(4);
        let storedRemoveVoteHash = await mockGTC.viewMockRemoveVoteHash(address);
        let recoveredHash = web3.toAscii(storedRemoveVoteHash);
        assert(recoveredHash, 'voteHash should be stored asssociated with project');
      })
      //checks that it creates a mapping of count to address
      // it('adds the new project address to projectAddrs array', async () => {
      //   let finalProjectCount = await parseMethod(getProjectCount);
      //   assert.equal(finalProjectCount, initialProjectCount + 1, 'project address not added to projectAddrs array');
      // })
    })

    describe('when the crowdsale is not open', async () => {
      after(async () => {
        await mockGTC.setMockDoomsDay(defaultDoomsDay);
      })

      it('reverts when the crowdsale has not opened yet', async () => {
        await mockGTC.setMockOpening(defaultOpeningTime * 400);
        await exceptions.catchRevert(mockGTC.pitchProject('mockProject', 1000000, 3000000, '345', '345', voteHash, removeVoteHash));
      })

      it('reverts after the crowdsale has closed', async () => {
        await mockGTC.setMockOpening(defaultOpeningTime);
        await mockGTC.setMockDoomsDay(defaultDoomsDay / 2);
        await exceptions.catchRevert(mockGTC.pitchProject('mockProject', 1000000, 3000000, '345', '345', voteHash, removeVoteHash));
      })
    })
  })

  describe('buyTokens', async () => {
    describe('when the crowdsale is open', async () => {
      let initialWeiRaised;
      let initialDoomsDay;

      before(async () => {
        initialWeiRaised = await parseMethod(getWeiRaised);
        initialDoomsDay = await parseMethod(getDoomsDay);

        await stubUtil.addMethod(tokenStub, 'activatePending');
        await stubUtil.addMethod(iLStub, 'addInvestor');
        await stubUtil.addMethod(tokenStub, 'transferInactive');
        await stubUtil.addMethod(projStub1, 'vote');
        await stubUtil.addMethod(mockGTC, 'considerTentativeLeaderShip');
        await stubUtil.addMethod(mockGTC, 'attemptProjectActivation');

        await mockGTC.buyTokens({from: accounts[2], value: 500000});
      })

      after(async () => {
        await stubUtil.resetMethod(tokenStub, 'activatePending');
        await stubUtil.resetMethod(iLStub, 'addInvestor');
        // await stubUtil.resetMethod(tokenStub, 'transferInactive');
        // await stubUtil.resetMethod(projStub1, 'vote');
        // await stubUtil.resetMethod(mockGTC, 'considerTentativeLeaderShip');
        // await stubUtil.resetMethod(mockGTC, 'attemptProjectActivation');
      })

      it('activates the buyers pending activations', async () => {
        let { firstAddress } = await stubUtil.callHistory(tokenStub, 'activatePending');
        assert.equal(firstAddress, accounts[2], 'pending activations not activated for the sender');
      })

      it('activates pending activations before transfering active tokens to the sender', async () => {
        let { correctCallOrder } = await stubUtil.callHistory(tokenStub, 'transferInactive');
        assert(correctCallOrder, 'pending activations not handled before more tokens are transferred');
      })

      it('transfers inactive tokens from the contract to the beneficiary as a function of value * rate', async () => {
        let { firstAddress, firstUint } = await stubUtil.callHistory(tokenStub, 'transferInactive');
        assert.equal(firstAddress, accounts[2], 'tokens not transfered to the correct beneficiary');
        assert.equal(firstUint, 25000000, 'incorrect token amount transfered');
      })

      it('increases weiRaised by the purchase value', async () => {
        let finalWeiRaised = await parseMethod(getWeiRaised);
        assert.equal(finalWeiRaised, initialWeiRaised + 500000, 'purchase value not added to weiRaised');
      })

      // it('votes for the project indicated', async () => {
      //   let { firstAddress, firstUint } = await stubUtil.callHistory(projStub1, 'vote');
      //   assert.equal(firstAddress, accounts[2], 'the corrent project was not voted for');
      //   assert.equal(firstUint, 25000000, 'incorrect vote amount assigned to project');
      // })

      it('extends the doomsDay by 90 days from the current time', async () => {
        let finalDoomsDay = await parseMethod(getDoomsDay);
        let now = await getLatestBlockTime();
        assert.equal(finalDoomsDay, now + (90 * 1728000), 'doomsDay not extended properly');
      })

    //these should be for voting
      // it('considers the voted for project for leadership', async () => {
      //   let { firstUint } = await stubUtil.callHistory(mockGTC, 'considerTentativeLeaderShip');
      //   assert.equal(firstUint, 0, 'voted for project should be considered for leadership');
      // })
      //
      // it('attemps to activate the leading project', async () => {
      //   let { called } = await stubUtil.callHistory(mockGTC, 'attemptProjectActivation');
      //   assert.equal(called, true, 'project activation should be attempted');
      // })
    })

    describe('when the crowdsale is not open', async () => {
      after(async () => {
        await mockGTC.setMockDoomsDay(defaultDoomsDay);
      })

      it('reverts when the crowdsale has not opened yet', async () => {
        await mockGTC.setMockOpening(defaultOpeningTime * 400);
        await exceptions.catchRevert(mockGTC.buyTokens({from: accounts[2], value: 500000}));
      })

      it('reverts after the crowdsale has closed', async () => {
        await mockGTC.setMockOpening(defaultOpeningTime);
        await mockGTC.setMockDoomsDay(defaultDoomsDay / 2);
        await exceptions.catchRevert(mockGTC.buyTokens({from: accounts[2], value: 500000}));
      })
    })
  })

  // describe('transferVotes', async () => {
  //   before(async () => {
  //     await stubUtil.addMethod(projStub1, 'removeVotes');
  //     await stubUtil.addMethod(projStub2, 'vote');
  //
  //     await mockGTC.transferVotes(0, 1, 20000000, {from: accounts[2]});
  //   })
  //
  //   after(async () => {
  //     await stubUtil.resetMethod(projStub1, 'removeVotes');
  //     await stubUtil.resetMethod(projStub2, 'vote');
  //   })
  //
  //   it('removes votes from one project', async () => {
  //     let { firstAddress, firstUint } = await stubUtil.callHistory(projStub1, 'removeVotes');
  //     assert.equal(firstAddress, accounts[2], 'votes not removed from correct voter');
  //     assert.equal(firstUint, 20000000, 'incorrect vote amount transfered from project');
  //   })
  //
  //   it('votes for another project', async () => {
  //     let { firstAddress, firstUint } = await stubUtil.callHistory(projStub2, 'vote');
  //     assert.equal(firstAddress, accounts[2], 'votes not assigned for correct voter');
  //     assert.equal(firstUint, 20000000, 'incorrect vote amount transfered to project');
  //   })
  // })

  describe('removeVotesFromProject_', async () => {
    before(async () => {
      await stubUtil.addMethod(projStub2, 'removeVotes');
      await stubUtil.addMethod(iLStub, 'addVoteCredit');
      await mockGTC._removeVotesFromProject_(accounts[2], projStub2.address, 20000000);
    })

    after(async () => {
      await stubUtil.resetMethod(projStub2, 'removeVotes');
      await stubUtil.resetMethod(iLStub, 'addVoteCredit');
    })

    it('removes the indicated amount of votes from a project', async () => {
      let { firstAddress, firstUint } = await stubUtil.callHistory(projStub2, 'removeVotes');
      assert.equal(firstAddress, accounts[2], 'votes not removed from correct voter');
      assert.equal(firstUint, 20000000, 'incorrect vote amount transfered from project');
    })

    it('assigns the inicated amount of vote credit to the sender', async () => {
      let { firstAddress, firstUint } = await stubUtil.callHistory(iLStub, 'addVoteCredit');
      assert.equal(firstAddress, accounts[2], 'votes not assigned for correct voter');
      assert.equal(firstUint, 20000000, 'incorrect vote credit amount assigned');
    })
  })

  describe('removeVotesFromProjectByAccount', async () => {
    describe('when the project is not open', async () => {
      before(async () => {
        await stubUtil.addMethod(mockGTC, 'removeVotesFromProject_');
        await projStub2.setMockVotesOf(accounts[2], 5000);
        await projStub2.setStubOpenStatus(false);
        await mockGTC.removeVotesFromProjectByAccount(accounts[2], projStub2.address);
      })

      after(async () => {
        await stubUtil.resetMethod(mockGTC, 'removeVotesFromProject_');
      })

      it('adds all votes that the account dedicated to the project to the accounts vote credit', async () => {
        let { firstAddress, secondAddress, firstUint } = await stubUtil.callHistory(mockGTC, 'removeVotesFromProject_');
        assert.equal(firstAddress, accounts[2], 'vote credit not added to the correct account');
        assert.equal(secondAddress, projStub2.address, 'votes not removed from the correct project');
        assert.equal(firstUint, 5000, 'incorrect vote credit amount assigned');
      })
    })

    describe('when the project is active', async () => {
      before(async () => {
        await stubUtil.addMethod(mockGTC, 'removeVotesFromProject_');
        await projStub1.setMockVotesOf(accounts[2], 5000);
        await projStub1.setStubOpenStatus(true);
        await projStub1.setStubActiveStatus(true);
        await mockGTC.removeVotesFromProjectByAccount(accounts[2], projStub2.address);
      })

      after(async () => {
        await stubUtil.resetMethod(mockGTC, 'removeVotesFromProject_');
      })

      it('adds all votes that the account dedicated to the project to the accounts vote credit', async () => {
        let { firstAddress, secondAddress, firstUint } = await stubUtil.callHistory(mockGTC, 'removeVotesFromProject_');
        assert.equal(firstAddress, accounts[2], 'vote credit not added to the correct account');
        assert.equal(secondAddress, projStub2.address, 'votes not removed from the correct project');
        assert.equal(firstUint, 5000, 'incorrect vote credit amount assigned');
      })
    })

    describe('when the project is open and not active', async () => {
      before(async () => {
        await projStub2.setStubOpenStatus(true);
        await projStub2.setStubActiveStatus(false);
      })

      after(async () => {
        await stubUtil.resetMethod(mockGTC, 'removeVotesFromProject_');
      })

      it('reverts', async () => {
        await exceptions.catchRevert(mockGTC.removeVotesFromProjectByAccount(accounts[2], 0));
      })
    })
  })

  //we will test out sending unsigned/incorrectly signed messages on the frontend
  describe('voteForProject', async () => {
    before(async () => {
      await stubUtil.addMethod(projStub3, 'vote');
      await stubUtil.addMethod(iLStub, 'removeVoteCredit');
      await stubUtil.addMethod(mockGTC, 'authenticateVoter');
      const hash = await web3.fromAscii('random');
      await mockGTC.setMockVoteHash(projStub3.address, hash);
      await mockGTC.voteForProject(projStub3.address, accounts[2], 20000000, hash, {from: accounts[1]});
    })

    after(async () => {
      await stubUtil.resetMethod(projStub3, 'vote');
      await stubUtil.resetMethod(iLStub, 'removeVoteCredit');
    })

    it('removes the indicated amount of votes from the senders vote credit', async () => {
      let { firstAddress, firstUint } = await stubUtil.callHistory(iLStub, 'removeVoteCredit');
      assert.equal(firstAddress, accounts[2], 'votes credit not removed for the correct voter');
      assert.equal(firstUint, 20000000, 'incorrect vote credit amount removed');
    })

    it('votes for the project indicated', async () => {
      let { firstAddress, firstUint } = await stubUtil.callHistory(projStub3, 'vote');
      assert.equal(firstAddress, accounts[2], 'the corrent project was not voted for');
      assert.equal(firstUint, 20000000, 'incorrect vote amount assigned to project');
    })
  })
})

const setUp = async () => {
  await initIL();
  await initToken();
  await initLeaderBoard();
  await initMock();
}

const initMock = async () => {
  defaultOpeningTime = await getLatestBlockTime();
  defaultDoomsDay = defaultOpeningTime + 86400 * 240;
  //possibly reverting because of race conditions with the linked library? I think thats the only thing that changed...
  mockGTC = await GNITokenCrowdsaleMock.new(defaultOpeningTime, defaultDoomsDay, 50, accounts[1], accounts[2], tokenStub.address, iLStub.address, lBStub.address, accounts[3]);
}

const initIL = async () => {
  iLStub = await InvestorListStub.new();
}

const initToken = async () => {
  tokenStub = await TokenStub.new(iLStub.address);
}

const initLeaderBoard = async () => {
  lBStub = await ProjectLeaderBoardStub.new();
}

const initProjectStubs = async () => {
  projStub1 = await ProjectStub.new(
    'project1', accounts[1], accounts[2],
    4000000, 2000000, 200000000,
    100000000, '340', '340', 75000000
  )

  await mockGTC.addMockProject(projStub1.address);

  projStub2 = await ProjectStub.new(
    'project2', accounts[1], accounts[2],
    3000000, 1000000, 150000000,
    50000000, '340', '340', 50000000
  )

  await mockGTC.addMockProject(projStub2.address);

  projStub3 = await ProjectStub.new(
    'project3', accounts[1], accounts[2],
    4000000, 2000000, 200000000,
    100000000, '340', '340', 75000000
  );

  await mockGTC.addMockProject(projStub3.address);
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
