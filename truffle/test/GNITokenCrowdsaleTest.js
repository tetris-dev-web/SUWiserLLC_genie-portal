const GNITokenCrowdsaleMock = artifacts.require("GNITokenCrowdsaleMock");
const InvestorListStub = artifacts.require("InvestorListStub");
const TokenStub = artifacts.require("TokenStub");
const ProjectQueueStub = artifacts.require("ProjectQueueStub");
const exceptions = require('./exceptions');
const stubUtil = require('./stubUtil');
let accounts;
let mockGTC;
let iLStub;
let tokenStub;
let pQStub;

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
    it('increases weiRaised by the purchase value', async () => {
      
    })

    it('transfers inactive tokens to the beneficiary as a function of value * rate', async () => {

    })

    it('votes for the project indicated', async () => {

    })

    it('updates the projectQueue', async () => {

    })

    it('trys to activate a project', async () => {

    })
  })

  describe('transferVotes', async () => {
    it('transfers votes from one project to another', async () => {

    })

    it('updates the projectQueue', async () => {

    })

    it('trys to activate a project', async () => {

    })
  })

  describe('addVoteCredit', async () => {
    it('removes the indicated amount of votes from a project', async () => {

    })

    it('awards the inicated amount of vote credit to the sender', async () => {

    })

    it('updates the projectQueue', async () => {

    })

    it('trys to activate a project', async () => {

    })
  })

  describe('addVoteCredit', async () => {
    it('removes the indicated amount of votes from the senders vote credit', async () => {

    })

    it('votes for a project', async () => {

    })

    it('updates the projectQueue', async () => {

    })

    it('trys to activate a project', async () => {

    })
  })

  describe('tryActivateProject', async () => {//we should pass the project in instead.
    //when the projet has enough funds
      //when the project is still open
        //dequeue
        //activation logic:
          //token.activate is called for the number of investors + one for the developer
          //funds are forwarded
          //weiRaised is decremented
          //project.activate is called
        //function is called again
      //when the project is not open
        //dequeue
        //function called again
    //when the project doesnt have enough funds
      //when the project is still open
        //nothing
      //when the project is not open
        //dequeue
        //function called again
    describe('when the project has enough funds', async () => {
      it('')
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

const getProjectCount = async () => {
  return await mockGTC.mockProjectCount.call();
}

const getTotalValuation = async () => {
  return await mockGTC.mockValuation.call();
}

const getDoomsDay = async () => {
  return await mockGTC.mockDoomsDay.call();
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
