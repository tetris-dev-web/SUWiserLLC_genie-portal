const GNITokenCrowdsaleMock = artifacts.require("GNITokenCrowdsaleMock");
const InvestorListStub = artifacts.require("InvestorListStub");
const TokenStub = artifacts.require("TokenStub");
const ProjectQueueStub = artifacts.require("ProjectQueueStub");
const ProjectStub = artifacts.require("ProjectStub");
const Project = artifacts.require("Project");
const exceptions = require('./exceptions');
const stubUtil = require('./stubUtil');
const { parseBN, parseMethod, weiBalanceOf } = require('./parseUtil');

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
        initialProjectCount = await parseMethod(getProjectCount);
        initialTotalValuation = await parseMethod(getTotalValuation);
        initialDoomsDay = await parseMethod(getDoomsDay);

        await stubUtil.addMethod(tokenStub, 'mint');
        await stubUtil.addMethod(pQStub, 'enqueue');

        await mockGTC.pitchProject('mockProject', 1000000, 3000000, '345', '345');
        mintCallData = await stubUtil.callHistory(tokenStub, 'mint');
      })

      it('mints developer tokens to the developer as a function of (rate * (valuation - capitalRequired)', async () => {
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

      it('extends the doomsDay by 90 days', async () => {
        let finalDoomsDay = await parseMethod(getDoomsDay);
        assert.equal(finalDoomsDay, initialDoomsDay + (90 * 1728000), 'doomsDay not extended properly');
      })

      it('adds the new project address to projectAddrs array', async () => {
        let finalProjectCount = await parseMethod(getProjectCount);
        assert.equal(finalProjectCount, initialProjectCount + 1, 'project address not added to projectAddrs array');
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

  describe('buyTokensAndVote', async () => {
    let initialWeiRaised;

    before(async () => {
      initialWeiRaised = await parseMethod(getWeiRaised);

      await stubUtil.addMethod(tokenStub, 'activatePending');
      await stubUtil.addMethod(iLStub, 'addInvestor');
      await stubUtil.addMethod(tokenStub, 'transferInactive');
      await stubUtil.addMethod(projStub1, 'vote');

      await mockGTC.buyTokensAndVote(0, {from: accounts[2], value: 500000});
    })

    after(async () => {
      await stubUtil.resetMethod(tokenStub, 'activatePending');
      await stubUtil.resetMethod(iLStub, 'addInvestor');
      await stubUtil.resetMethod(tokenStub, 'transferInactive');
      await stubUtil.resetMethod(projStub1, 'vote');
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

    it('votes for the project indicated', async () => {
      let { firstAddress, firstUint } = await stubUtil.callHistory(projStub1, 'vote');
      assert.equal(firstAddress, accounts[2], 'the corrent project was not voted for');
      assert.equal(firstUint, 25000000, 'incorrect vote amount assigned to project');
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
  })

  describe('addVoteCredit_', async () => {
    before(async () => {
      await stubUtil.addMethod(projStub1, 'removeVotes');
      await stubUtil.addMethod(iLStub, 'addVoteCredit');
      await stubUtil.addMethod(mockGTC, 'addVoteCredit_');

      await mockGTC._addVoteCredit_(accounts[2], 0, 20000000);
    })

    after(async () => {
      await stubUtil.resetMethod(projStub1, 'removeVotes');
      await stubUtil.resetMethod(iLStub, 'addVoteCredit');
      await stubUtil.resetMethod(mockGTC, 'addVoteCredit_');
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
  })

  describe('addVoteCreditTo', async () => {
    describe('when the project is not open', async () => {
      before(async () => {
        await stubUtil.addMethod(mockGTC, 'addVoteCredit_');
        await projStub1.setMockVotesOf(accounts[2], 5000);
        await projStub1.setStubOpenStatus(false);
        await mockGTC.addVoteCreditTo(accounts[2], 0);
      })

      after(async () => {
        await stubUtil.resetMethod(mockGTC, 'addVoteCredit_');
      })

      it('adds all votes that the account dedicated to the project to the accounts vote credit', async () => {
        let { firstAddress, firstUint, secondUint } = await stubUtil.callHistory(mockGTC, 'addVoteCredit_');
        assert.equal(firstAddress, accounts[2], 'vote credit not added to the correct account');
        assert.equal(firstUint, 0, 'votes not removed from the correct project');
        assert.equal(secondUint, 5000, 'incorrect vote credit amount assigned');
      })
    })

    describe('when the project is active', async () => {
      before(async () => {
        await stubUtil.addMethod(mockGTC, 'addVoteCredit_');
        await projStub1.setMockVotesOf(accounts[2], 5000);
        await projStub1.setStubOpenStatus(true);
        await projStub1.setStubActiveStatus(true);
        await mockGTC.addVoteCreditTo(accounts[2], 0);
      })

      after(async () => {
        await stubUtil.resetMethod(mockGTC, 'addVoteCredit_');
      })

      it('adds all votes that the account dedicated to the project to the accounts vote credit', async () => {
        let { firstAddress, firstUint, secondUint } = await stubUtil.callHistory(mockGTC, 'addVoteCredit_');
        assert.equal(firstAddress, accounts[2], 'vote credit not added to the correct account');
        assert.equal(firstUint, 0, 'votes not removed from the correct project');
        assert.equal(secondUint, 5000, 'incorrect vote credit amount assigned');
      })
    })

    describe('when the project is open and not active', async () => {
      before(async () => {
        await projStub1.setStubOpenStatus(true);
        await projStub1.setStubActiveStatus(false);
      })

      after(async () => {
        await stubUtil.resetMethod(mockGTC, 'addVoteCredit_');
      })

      it('reverts', async () => {
        await exceptions.catchRevert(mockGTC.addVoteCreditTo(accounts[2], 0));
      })
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
  mockGTC = await GNITokenCrowdsaleMock.new(defaultOpeningTime, defaultDoomsDay, 50, accounts[1], accounts[2], tokenStub.address, iLStub.address, pQStub.address);
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
    id: 0, name: 'project1', developer: accounts[1], dividendWallet: accounts[2],
    valuation: 4000000, capitalRequired: 2000000, developerTokens: 200000000,
    investorTokens: 100000000, lat: '340', lng: '340', mockVotes: 75000000
  })

  await mockGTC.addMockProject(projStub1.address);

  projStub2 = await createProjectStub({
    id: 1, name: 'project2', developer: accounts[1], dividendWallet: accounts[2],
    valuation: 3000000, capitalRequired: 1000000, developerTokens: 150000000,
    investorTokens: 50000000, lat: '340', lng: '340', mockVotes: 50000000
  })

  await mockGTC.addMockProject(projStub2.address);
}

const createProjectStub = async (params) => {
  let {
    id, name, developer, dividendWallet,
    valuation, capitalRequired, developerTokens,
    investorTokens, lat, lng, mockVotes
  } = params;

  return await ProjectStub.new(
    id, name, developer, dividendWallet,
    valuation, capitalRequired, developerTokens,
    investorTokens, lat, lng, mockVotes
  );
}

const tryActivateProjectSetup = async () => {
  await setUp();

  projStub3 = await createProjectStub({
    id: 0, name: 'project3', developer: accounts[1], dividendWallet: accounts[2],
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
