const GNITokenCrowdsaleMock = artifacts.require("GNITokenCrowdsaleMock");
const InvestorListStub = artifacts.require("InvestorListStub");
const TokenStub = artifacts.require("TokenStub");
const ProjectStub = artifacts.require("ProjectStub");
const Project = artifacts.require("Project");
const BigNumber = require('bignumber.js');
const exceptions = require('./exceptions');
const stubUtil = require('./stubUtil');
const { parseBN, parseMethod, weiBalanceOf } = require('./parseUtil');

let accounts;
let mockGTC;
let iLStub;
let tokenStub;
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

        await mockGTC.pitchProject('mockProject', 1000000, 3000000, '345', '345');
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

      it('extends the doomsDay by 90 days', async () => {
        let finalDoomsDay = await parseMethod(getDoomsDay);
        assert.equal(finalDoomsDay, initialDoomsDay + (90 * 1728000), 'doomsDay not extended properly');
      })

      it('increments inactiveProjectCount by one', async () => {
        let count = await mockGTC.inactiveProjectCount();
        assert.equal(count, 1, 'inactive project count should increment by one');
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

        await mockGTC.buyTokensAndVote(0, {from: accounts[2], value: 500000});
      })

      after(async () => {
        await stubUtil.resetMethod(tokenStub, 'activatePending');
        await stubUtil.resetMethod(iLStub, 'addInvestor');
        await stubUtil.resetMethod(tokenStub, 'transferInactive');
        await stubUtil.resetMethod(projStub1, 'vote');
        await stubUtil.resetMethod(mockGTC, 'considerTentativeLeaderShip');
        await stubUtil.resetMethod(mockGTC, 'attemptProjectActivation');
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

      it('extends the doomsDay by 90 days', async () => {
        let finalDoomsDay = await parseMethod(getDoomsDay);
        assert.equal(finalDoomsDay, initialDoomsDay + (90 * 1728000), 'doomsDay not extended properly');
      })

      it('considers the voted for project for leadership', async () => {
        let { firstUint } = await stubUtil.callHistory(mockGTC, 'considerTentativeLeaderShip');
        assert.equal(firstUint, 0, 'voted for project should be considered for leadership');
      })

      it('attemps to activate the leading project', async () => {
        let { called } = await stubUtil.callHistory(mockGTC, 'attemptProjectActivation');
        assert.equal(called, true, 'project activation should be attempted');
      })
    })

    describe('when the crowdsale is not open', async () => {
      after(async () => {
        await mockGTC.setMockDoomsDay(defaultDoomsDay);
      })

      it('reverts when the crowdsale has not opened yet', async () => {
        await mockGTC.setMockOpening(defaultOpeningTime * 400);
        await exceptions.catchRevert(mockGTC.buyTokensAndVote(0, {from: accounts[2], value: 500000}));
      })

      it('reverts after the crowdsale has closed', async () => {
        await mockGTC.setMockOpening(defaultOpeningTime);
        await mockGTC.setMockDoomsDay(defaultDoomsDay / 2);
        await exceptions.catchRevert(mockGTC.buyTokensAndVote(0, {from: accounts[2], value: 500000}));
      })
    })
  })

  describe('transferVotes', async () => {
    before(async () => {
      await stubUtil.addMethod(projStub1, 'removeVotes');
      await stubUtil.addMethod(projStub2, 'vote');

      await mockGTC.transferVotes(0, 1, 20000000, {from: accounts[2]});
    })

    after(async () => {
      await stubUtil.resetMethod(projStub1, 'removeVotes');
      await stubUtil.resetMethod(projStub2, 'vote');
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

      await mockGTC.voteWithCredit(0, 20000000, {from: accounts[2]});
    })

    after(async () => {
      await stubUtil.resetMethod(projStub1, 'vote');
      await stubUtil.resetMethod(iLStub, 'removeVoteCredit');
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

  describe('considerTentativeLeaderShip', async () => {
    before(async () => {
      await stubUtil.addMethod(mockGTC, 'updateTentativeLeader');
      await stubUtil.addMethod(mockGTC, 'recordCheck');
      await projStub1.setMockVotes(4000000);
      await projStub1.setStubCapRequired(10000000);
    });

    describe('when there is no tentativeLeaderAddr', async () => {
      describe('when there is only one project', async () => {
        let initialCheckedCount;
        before(async () => {
          await mockGTC.resetMockTentativeProject();
          initialCheckedCount = await parseMethod(mockGTC.totalChecked);
          await mockGTC.setStubProjectCount(1);
          await mockGTC.considerTentativeLeaderShip_(0);
        })

        after(async () => {
          await mockGTC.resetMockTentativeProject();
        })

        it('sets the project as the new tentative leader', async () => {
          let tlAddr = await mockGTC.tentativeLeaderAddr();
          let tlCapRequired = await parseMethod(mockGTC.tentativeLeaderCapRequired);

          assert.equal(tlAddr, projStub1.address, 'tentativeLeaderAddr not assigned properly');
          assert.equal(tlCapRequired, 10000000, 'tentativeLeaderCapRequired not assigned properly');
        })

        it('sets tentativeLeaderConfirmed to true', async () => {
          let tlConfirmed = await mockGTC.tentativeLeaderConfirmed();
          assert.equal(tlConfirmed, true, 'tentative leader should be confirmed');
        })

        it('increments the total number of projects checked by 1', async () => {
          let finalCheckedCount = await parseMethod(mockGTC.totalChecked);
          assert.equal(finalCheckedCount, initialCheckedCount + 1, 'total projects checked not incremented by 1');
        })

        it('sets the projects checked status to true', async () => {
          let checkedStatus = await mockGTC.checkedStatusOf(projStub1.address);
          assert.equal(checkedStatus, true, 'checked status of project notset to true');
        })
      })

      describe('when there are multiple projects', async () => {
        let initialCheckedCount;
        before(async () => {
          initialCheckedCount = await parseMethod(mockGTC.totalChecked);
          await mockGTC.setStubProjectCount(2);
          await mockGTC.considerTentativeLeaderShip_(0);
        })

        after(async () => {
          await mockGTC.resetMockTentativeProject();
        })

        it('sets the project as the new tentative leader', async () => {
          let tlAddr = await mockGTC.tentativeLeaderAddr();
          let tlCapRequired = await parseMethod(mockGTC.tentativeLeaderCapRequired);

          assert.equal(tlAddr, projStub1.address, 'tentativeLeaderAddr not assigned properly');
          assert.equal(tlCapRequired, 10000000, 'tentativeLeaderCapRequired not assigned properly');
        })

        it('sets tentativeLeaderConfirmed to false', async () => {
          let tlConfirmed = await mockGTC.tentativeLeaderConfirmed();
          assert.equal(tlConfirmed, false, 'tentative leader should not be confirmed');
        })

        it('increments the total number of projects checked by 1', async () => {
          let finalCheckedCount = await parseMethod(mockGTC.totalChecked);
          assert.equal(finalCheckedCount, initialCheckedCount + 1, 'total projects checked not incremented by 1');
        })

        it('sets the projects checked status to true', async () => {
          let checkedStatus = await mockGTC.checkedStatusOf(projStub1.address);
          assert.equal(checkedStatus, true, 'checked status of project notset to true');
        })
      })
    })

    describe('when the project has more votes than the tentative leader', async () => {
      before(async () => {
        await projStub2.setMockVotes(5000000);
        await projStub2.setStubCapRequired(10000000);
      })
      describe('when it is the final project to be checked', async () => {
        let initialCheckedCount;
        before(async () => {
          await mockGTC.setMockTentativeLeader(projStub1.address, 7000000);
          await projStub1.setStubOpenStatus(true);
          await mockGTC.setStubProjectCount(2);
          await mockGTC.setMockTotalChecked(1);
          initialCheckedCount = await parseMethod(mockGTC.totalChecked);
          await mockGTC.considerTentativeLeaderShip_(1);
        })
        after(async () => {
          await mockGTC.resetMockTentativeProject();
        })

        it('sets the project as the new tentative leader', async () => {
          let tlAddr = await mockGTC.tentativeLeaderAddr();
          let tlCapRequired = await parseMethod(mockGTC.tentativeLeaderCapRequired);

          assert.equal(tlAddr, projStub2.address, 'tentativeLeaderAddr not assigned properly');
          assert.equal(tlCapRequired, 10000000, 'tentativeLeaderCapRequired not assigned properly');
        })

        it('sets tentativeLeaderConfirmed to true', async () => {
          let tlConfirmed = await mockGTC.tentativeLeaderConfirmed();
          assert.equal(tlConfirmed, true, 'tentative leader should be confirmed');
        })

        it('increments the total number of projects checked by 1', async () => {
          let finalCheckedCount = await parseMethod(mockGTC.totalChecked);
          assert.equal(finalCheckedCount, initialCheckedCount + 1, 'total projects checked not incremented by 1');
        })

        it('sets the projects checked status to true', async () => {
          let checkedStatus = await mockGTC.checkedStatusOf(projStub2.address);
          assert.equal(checkedStatus, true, 'checked status of project notset to true');
        })
      })

      describe('when there are more projects to be checked', async () => {
        //we need for when the leader has been confirmed in addition to when it has not been
        let initialCheckedCount;
        before(async () => {
          await mockGTC.setMockTentativeLeader(projStub1.address, 7000000);
          await projStub1.setStubOpenStatus(true);
          await mockGTC.setStubProjectCount(3);
          await mockGTC.setMockTotalChecked(1);
          initialCheckedCount = await parseMethod(mockGTC.totalChecked);
          await mockGTC.considerTentativeLeaderShip_(1);
        })

        after(async () => {
          await stubUtil.resetMethod(mockGTC, 'updateTentativeLeader');
          await stubUtil.resetMethod(mockGTC, 'recordCheck');
          await mockGTC.resetMockTentativeProject();
        })

        it('sets the project as the new tentative leader', async () => {
          let tlAddr = await mockGTC.tentativeLeaderAddr();
          let tlCapRequired = await parseMethod(mockGTC.tentativeLeaderCapRequired);

          assert.equal(tlAddr, projStub2.address, 'tentativeLeaderAddr not assigned properly');
          assert.equal(tlCapRequired, 10000000, 'tentativeLeaderCapRequired not assigned properly');
        })

        it('sets tentativeLeaderConfirmed to false', async () => {
          let tlConfirmed = await mockGTC.tentativeLeaderConfirmed();
          assert.equal(tlConfirmed, false, 'tentative leader should not be confirmed');
        })

        it('increments the total number of projects checked by 1', async () => {
          let finalCheckedCount = await parseMethod(mockGTC.totalChecked);
          assert.equal(finalCheckedCount, initialCheckedCount + 1, 'total projects checked not incremented by 1');
        })

        it('sets the projects checked status to true', async () => {
          let checkedStatus = await mockGTC.checkedStatusOf(projStub2.address);
          assert.equal(checkedStatus, true, 'checked status of project notset to true');
        })
      })
    })

    describe('when the tentative leader has closed', async () => {
      before(async () => {
        await mockGTC.setMockTentativeLeader(projStub1.address, 7000000);
        await projStub1.setStubOpenStatus(false);
        await mockGTC.setStubProjectCount(3);
        await projStub3.setMockVotes(2000000);
        await projStub3.setStubCapRequired(8000000);
        await mockGTC.considerTentativeLeaderShip_(2);
      })

      after(async () => {
        await mockGTC.resetMockTentativeProject();
      })

      it('sets the project as the new tentative leader', async () => {
        let tlAddr = await mockGTC.tentativeLeaderAddr();
        let tlCapRequired = await parseMethod(mockGTC.tentativeLeaderCapRequired);

        assert.equal(tlAddr, projStub3.address, 'tentativeLeaderAddr not assigned properly');
        assert.equal(tlCapRequired, 8000000, 'tentativeLeaderCapRequired not assigned properly');
      })

      it('sets tentativeLeaderConfirmed to false', async () => {
        let tlConfirmed = await mockGTC.tentativeLeaderConfirmed();
        assert.equal(tlConfirmed, false, 'tentative leader should not be confirmed');
      })

      it('sets the projects checked status to true', async () => {
        let checkedStatus = await mockGTC.checkedStatusOf(projStub3.address);
        assert.equal(checkedStatus, true, 'checked status of project notset to true');
      })

      it('sets the total number of projects checked to 1', async () => {
        let finalCheckedCount = await parseMethod(mockGTC.totalChecked);
        assert.equal(finalCheckedCount, 1, 'total projects checked should be 2');
      })

      it('decrements the inactiveProjectCount by one', async () => {
        let finalInactiveProjectCount = await mockGTC.inactiveProjectCount();
        assert.equal(finalInactiveProjectCount, 2, 'inactiveProjectCount should decrement by one');
      })
    })

    describe('when the tentative leader cannot be updated', async () => {
      before(async () => {
        await projStub1.setStubOpenStatus(true);
      })

      describe('when it is the final project to be checked', async () => {
        before(async () => {
          await mockGTC.setMockTentativeLeader(projStub1.address, 7000000);
          await mockGTC.setStubProjectCount(3);
          await mockGTC.setMockTotalChecked(2);
          await mockGTC.considerTentativeLeaderShip_(2);
        })

        after(async () => {
          await mockGTC.resetMockTentativeProject();
        })

        it('sets the projects checked status to true', async () => {
          let checkedStatus = await mockGTC.checkedStatusOf(projStub3.address);
          assert.equal(checkedStatus, true, 'checked status of project notset to true');
        })

        it('increments the total number of projects checked by 1', async () => {
          let finalCheckedCount = await parseMethod(mockGTC.totalChecked);
          assert.equal(finalCheckedCount, 3, 'total projects checked not incremented by 1');
        })

        it('sets tentativeLeaderConfirmed to true', async () => {
          let tlConfirmed = await mockGTC.tentativeLeaderConfirmed();
          assert.equal(tlConfirmed, true, 'tentative leader should be confirmed');
        })
      })

      describe('when there are more projects to be checked', async () => {
        before(async () => {
          await mockGTC.setMockTentativeLeader(projStub1.address, 7000000);
          await mockGTC.setStubProjectCount(3);
          await mockGTC.setMockTotalChecked(1);
          await mockGTC.considerTentativeLeaderShip_(2);
        })

        after(async () => {
          await mockGTC.resetMockTentativeProject();
        })

        it('sets the projects checked status to true', async () => {
          let checkedStatus = await mockGTC.checkedStatusOf(projStub3.address);
          assert.equal(checkedStatus, true, 'checked status of project notset to true');
        })

        it('increments the total number of projects checked by 1', async () => {
          let finalCheckedCount = await parseMethod(mockGTC.totalChecked);
          assert.equal(finalCheckedCount, 2, 'total projects checked not incremented by 1');
        })

        it('sets tentativeLeaderConfirmed to false', async () => {
          let tlConfirmed = await mockGTC.tentativeLeaderConfirmed();
          assert.equal(tlConfirmed, false, 'tentative leader should not be confirmed');
        })
      })
    })
  })

  describe('attemptProjectActivation', async () => {
    before(async () => {
      await mockGTC.setMockTentativeLeader(projStub1.address, 7000000);

      await stubUtil.addMethod(projStub1, 'activate');
      await stubUtil.addMethod(tokenStub, 'increasePendingActivations');
      await mockGTC.setStubProjectCount(3);
    })

    describe('when there is not enough weiRaised to cover the project', async () => {
      let initialDeveloperWei;
      let beforeWeiRaised;
      before(async () => {
        await mockGTC.setMockWeiRaised(500);
        await projStub1.setStubOpenStatus(true);
        await mockGTC.setMockConfirmedLeaderStatus(true);
        initialDeveloperWei = await weiBalanceOf(accounts[1]);
        beforeWeiRaised = await parseMethod(getWeiRaised);
        await mockGTC.attemptProjectActivation_();
      })

      it('does not activate the project', async () => {
        let { called } = await stubUtil.callHistory(projStub1, 'activate');
        assert.equal(called, false, 'project should not be activated');
      })

      it('does not forward funds to the developer', async () => {
        let finalDeveloperWei = await weiBalanceOf(accounts[1]);
        assert.equal(finalDeveloperWei, initialDeveloperWei, 'funds should not be forwarded to the developer');
      })

      it('does not affect weiRaised', async () => {
        let afterWei = await parseMethod(getWeiRaised);
        assert.equal(afterWei, beforeWeiRaised, 'weiRaised not reduced by capitalRequired');
      })

      it('does not affect inactiveProjectCount', async () => {
        let afterInactiveProjectCount = await await mockGTC.inactiveProjectCount();
        assert.equal(afterInactiveProjectCount, 3, 'inactiveProjectCount should not change');
      })

      it('does not affect pending token activations', async () => {
        let { called } = await stubUtil.callHistory(tokenStub, 'increasePendingActivations');
        assert.equal(called, false, 'pending token activations should not change');
      })
    })

    describe('when the tentative leader has not been confirmed', async () => {
      let initialDeveloperWei;
      let beforeWeiRaised;
      before(async () => {
        await mockGTC.setMockWeiRaised(8000000);
        await projStub1.setStubOpenStatus(true);
        await mockGTC.setMockConfirmedLeaderStatus(false);
        initialDeveloperWei = await weiBalanceOf(accounts[1]);
        beforeWeiRaised = await parseMethod(getWeiRaised);
        await mockGTC.attemptProjectActivation_();
      })

      it('does not activate the project', async () => {
        let { called } = await stubUtil.callHistory(projStub1, 'activate');
        assert.equal(called, false, 'project should not be activated');
      })

      it('does not forward funds to the developer', async () => {
        let finalDeveloperWei = await weiBalanceOf(accounts[1]);
        assert.equal(finalDeveloperWei, initialDeveloperWei, 'funds should not be forwarded to the developer');
      })

      it('does not affect weiRaised', async () => {
        let afterWei = await parseMethod(getWeiRaised);
        assert.equal(afterWei, beforeWeiRaised, 'weiRaised not reduced by capitalRequired');
      })

      it('does not affect inactiveProjectCount', async () => {
        let afterInactiveProjectCount = await await mockGTC.inactiveProjectCount();
        assert.equal(afterInactiveProjectCount, 3, 'inactiveProjectCount should not change');
      })

      it('does not affect pending token activations', async () => {
        let { called } = await stubUtil.callHistory(tokenStub, 'increasePendingActivations');
        assert.equal(called, false, 'pending token activations should not change');
      })
    })

    describe('when the tentative leader has closed', async () => {
      let initialDeveloperWei;
      let beforeWeiRaised;
      before(async () => {
        await mockGTC.setMockWeiRaised(8000000);
        await projStub1.setStubOpenStatus(false);
        await mockGTC.setMockConfirmedLeaderStatus(true);
        initialDeveloperWei = await weiBalanceOf(accounts[1]);
        beforeWeiRaised = await parseMethod(getWeiRaised);
        await mockGTC.attemptProjectActivation_();
      })

      it('does not activate the project', async () => {
        let { called } = await stubUtil.callHistory(projStub1, 'activate');
        assert.equal(called, false, 'project should not be activated');
      })

      it('does not forward funds to the developer', async () => {
        let finalDeveloperWei = await weiBalanceOf(accounts[1]);
        assert.equal(finalDeveloperWei, initialDeveloperWei, 'funds should not be forwarded to the developer');
      })

      it('does not affect weiRaised', async () => {
        let afterWei = await parseMethod(getWeiRaised);
        assert.equal(afterWei, beforeWeiRaised, 'weiRaised not reduced by capitalRequired');
      })

      it('does not affect inactiveProjectCount', async () => {
        let afterInactiveProjectCount = await await mockGTC.inactiveProjectCount();
        assert.equal(afterInactiveProjectCount, 3, 'inactiveProjectCount should not change');
      })

      it('does not affect pending token activations', async () => {
        let { called } = await stubUtil.callHistory(tokenStub, 'increasePendingActivations');
        assert.equal(called, false, 'pending token activations should not change');
      })
    })

    describe('when a project can be activated', async () => {
      let initialDeveloperWei;
      let beforeWeiRaised;
      before(async () => {
        await mockGTC.receiveMockWei({value: 8000000, from: accounts[2]});
        await mockGTC.setMockWeiRaised(8000000);
        await projStub1.setStubOpenStatus(true);
        await mockGTC.setMockConfirmedLeaderStatus(true);
        developerWei = await weiBalanceOf(accounts[1]);
        initialDeveloperWei = new BigNumber(developerWei.toString());
        beforeWeiRaised = await parseMethod(getWeiRaised);
        await mockGTC.attemptProjectActivation_();
      })

      after(async () => {
        await stubUtil.resetMethod(projStub1, 'activate');
        await stubUtil.resetMethod(tokenStub, 'increasePendingActivations');
        await mockGTC.setStubProjectCount(3);
      })

      it('activates the project', async () => {
        let { called } = await stubUtil.callHistory(projStub1, 'activate');
        assert.equal(called, true, 'project should be activated');
      })

      it('forwards capital required to the developer', async () => {
        let developerWei = await weiBalanceOf(accounts[1]);
        let finalDeveloperWei = new BigNumber(developerWei.toString());
        let expected = initialDeveloperWei.plus('7000000').decimalPlaces(0);
        assert(finalDeveloperWei.isEqualTo(expected), 'capital required should be forwarded to the developer');
      })

      it('decreases weiRaised by the capital required', async () => {
        let afterWei = await parseMethod(getWeiRaised);
          assert.equal(afterWei, beforeWeiRaised - 7000000, 'weiRaised not reduced by capitalRequired');
      })

      it('decreases the inactiveProjectCount by one', async () => {
        let afterInactiveProjectCount = await await mockGTC.inactiveProjectCount();
        assert.equal(afterInactiveProjectCount, 2, 'inactiveProjectCount should decrease by one');
      })

      it('increases pending token activations by the amount of tokens associated with the project', async () => {
        let { firstUint, called } = await stubUtil.callHistory(tokenStub, 'increasePendingActivations');
        assert.equal(called, true, 'pending token activations should be increased');
        assert.equal(firstUint, 20000000, 'pending activations should be increases by the number of tokens associated with the activated project');
      })
    })
  })

  describe('reimburseFunds', async () => {
    describe('when the crowdsale is still open', async () => {
      it('reverts', async () => {
        await exceptions.catchRevert(mockGTC.reimburseFunds());
      })
    })

    describe('when the crowdsale has closed', async () => {
      before(async () => {
        await mockGTC.setMockDoomsDay(defaultDoomsDay / 2);
        await mockGTC.setMockWeiRaised(1200000);
        await tokenStub.setStubTotalPendingActivations(30000000);
        await mockGTC.reimburseFunds();
      })

      after(async () => {
        await mockGTC.setMockDoomsDay(defaultDoomsDay);
      })

      it('sets inactiveTokensAtClosing to totalInactiveSupply - totalPendingActivations', async () => {
        let inactiveTokensAtClosing = await mockGTC.inactiveTokensAtClosing();
        assert.equal(inactiveTokensAtClosing, 60000000, 'should set inactiveTokensAtClosing to totalInactiveSupply - totalPendingActivations');
      })

      it('sets weiToReimburse to weiRaised', async () => {
        let weiToReimburse = await mockGTC.weiToReimburse();
        assert.equal(weiToReimburse, 1200000, 'should set weiToReimburse to weiRaised');
      })
    })
  })

  describe('claimReimbursement', async () => {
    let initialAccountWei;
    let initialContractWei;
    before(async () => {
      await mockGTC.receiveMockWei({value: 1200000, from: accounts[3]});
      await tokenStub.init(accounts[1], accounts[2], accounts[3]);
      await mockGTC.setMockWeiToReimburse(1200000);
      await mockGTC.setMockInactiveTokensAtClosing(60000000);
      await tokenStub.setStubPendingActivations(accounts[1], 4000000);

      let contractBalance = await web3.eth.getBalance(mockGTC.address);
      initialContractWei = new BigNumber(contractBalance.toString());
      let accountBalance = await web3.eth.getBalance(accounts[1]);
      initialAccountWei = await BigNumber(accountBalance.toString());

      await mockGTC.claimReimbursement(accounts[1]);
    })

    it('adds wei to the account as a function of (acount inactive - account pending) * weiToReimburse / inactiveTokensAtClosing', async () => {
      let accountBalance = await web3.eth.getBalance(accounts[1]);
      let finalAccountWei = await BigNumber(accountBalance.toString());
      let expected = initialAccountWei.plus('160000').decimalPlaces(0);
      assert(finalAccountWei.isEqualTo(expected), `expected ${expected} but got ${finalAccountWei}`);
    })

    it('removes the same wei amount from the contract', async () => {
      let contractBalance = await web3.eth.getBalance(mockGTC.address);
      let finalContractWei = await BigNumber(contractBalance.toString());
      let expected = initialContractWei.minus('160000').decimalPlaces(0);
      assert(finalContractWei.isEqualTo(expected), `expected ${expected} but got ${finalContractWei}`);
    })
  })
})

const setUp = async () => {
  await initIL();
  await initToken();
  await initMock();
}

const initMock = async () => {
  defaultOpeningTime = await getLatestBlockTime();
  defaultDoomsDay = defaultOpeningTime + 86400 * 240;
  mockGTC = await GNITokenCrowdsaleMock.new(defaultOpeningTime, defaultDoomsDay, 50, accounts[1], accounts[2], tokenStub.address, iLStub.address);
}

const initIL = async () => {
  iLStub = await InvestorListStub.new();
}

const initToken = async () => {
  tokenStub = await TokenStub.new(iLStub.address);
}

const initProjectStubs = async () => {
  projStub1 = await ProjectStub.new(
    0, 'project1', accounts[1], accounts[2],
    4000000, 2000000, 200000000,
    100000000, '340', '340', 75000000
  )

  await mockGTC.addMockProject(projStub1.address);

  projStub2 = await ProjectStub.new(
    1, 'project2', accounts[1], accounts[2],
    3000000, 1000000, 150000000,
    50000000, '340', '340', 50000000
  )

  await mockGTC.addMockProject(projStub2.address);

  projStub3 = await ProjectStub.new(
    0, 'project3', accounts[1], accounts[2],
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
