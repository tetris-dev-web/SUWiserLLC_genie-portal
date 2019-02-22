const CooperativeMock = artifacts.require("CooperativeMock");
const AmendmentPollStub = artifacts.require("AmendmentPollStub");
const ProposalsStub = artifacts.require("ProposalsStub");
const Proposals = artifacts.require("Proposals");
const ActiveTokenStub = artifacts.require("ActiveTokenStub");
const VotingTokenStub = artifacts.require("VotingTokenStub");
const AmendmentStub = artifacts.require("AmendmentStub");
const exceptions = require('./exceptions');
const stubUtil = require('./stubUtil');
const { parseBN, parseMethod, weiBalanceOf } = require('./parseUtil');

let accounts;

let aP;

let p;

let cooperative;

let a;

contract("Cooperative", async (_accounts) => {
  accounts = _accounts;

  before(async () => {
    await setUp();
  });

  describe("initNewProposals", async () => {
    describe("when the sender is the developer", async () => {
      describe("when the proposals passed", async () => {
        before(async () => {
          await aP.setProposalsPassed(true);
          await aP.setProposalsFailed(false);
        })

        after(async () => {
          await cooperative.setTotalCompleteAdoptions(0);
        })

        describe("when the adoptions are complete", async () => {
          before(async () => {
            await cooperative.setCurrentProposals(p.address);
            await p.setTotalNewAmendments(2);
            await p.setTotalAmendmentModifications(2);
            await p.setTotalAmendmentRemovals(1);
            await cooperative.setTotalCompleteAdoptions(5);
          })

          describe("when there is no new cooperative", async () => {
            let currentProposalsT1;
            let canInitElectionT1;
            before(async () => {
              currentProposalsT1 = await cooperative.getCurrentProposals();
              canInitElectionT1 = await cooperative.canInitElection();
              await cooperative.initNewProposals({from: accounts[0]});
            })

            after(async () => {
              await cooperative.setCanInitElection(false);
            })

            it("sets currentProposals to a new proposals instance", async () => {
              const currentProposalsT2 = await cooperative.getCurrentProposals.call();
              assert(Proposals.at(currentProposalsT2), "new currentProposals should be created");
              assert(currentProposalsT1 !== currentProposalsT2, "new currentProposals should be different than previous");
            })

            it("sets totalCompleteAdoptions to 0", async () => {
              const totalCompleteAdoptions = await cooperative.totalCompleteAdoptions.call();
              assert.equal(Number(totalCompleteAdoptions), 0, "totalCompleteAdoptions should be 0");
            })

            it("allows a new elections to be initialized", async () => {
              const canInitElectionT2 = await cooperative.canInitElection();
              assert(canInitElectionT2, "new election should be allowed");
              assert(canInitElectionT1 !== canInitElectionT2, "election initialization status should change");
            })
          })
          describe("when there is a new cooperative", async () => {
            before(async () => {
              await cooperative.setNewCooperative(accounts[1]);
            })

            after(async () => {
              await cooperative.clearNewCooperative();
            })

            it("reverts", async () => {
              await exceptions.catchRevert(cooperative.initNewProposals({from: accounts[0]}));
            })
          })
        })

        describe("when the adoptions are not complete", async () => {

          before(async () => {
            await cooperative.setTotalCompleteAdoptions(4);
          })

          it("reverts", async () => {
            await exceptions.catchRevert(cooperative.initNewProposals({from: accounts[0]}));
          })
        })
      })

      describe("when the proposals failed", async () => {
        let currentProposalsT1;
        let canInitElectionT1;
        before(async () => {
          await aP.setProposalsPassed(false);
          await aP.setProposalsFailed(true);
          currentProposalsT1 = await cooperative.getCurrentProposals();
          canInitElectionT1 = await cooperative.canInitElection();
          await cooperative.initNewProposals({from: accounts[0]});
        })

        after(async () => {
          await aP.setProposalsPassed(true);
        })

        it("sets currentProposals to a new proposals instance", async () => {
          const currentProposalsT2 = await cooperative.getCurrentProposals.call();
          assert(Proposals.at(currentProposalsT2), "new currentProposals should be created");
          assert(currentProposalsT1 !== currentProposalsT2, "new currentProposals should be different than previous");
        })

        it("sets totalCompleteAdoptions to 0", async () => {
          const totalCompleteAdoptions = await cooperative.totalCompleteAdoptions.call();
          assert.equal(Number(totalCompleteAdoptions), 0, "totalCompleteAdoptions should be 0");
        })

        it("allows a new elections to be initialized", async () => {
          const canInitElectionT2 = await cooperative.canInitElection();
          assert(canInitElectionT2, "new election should be allowed");
          assert(canInitElectionT1 !== canInitElectionT2, "election initialization status should change");
        })
      })
    })
    describe('when the sender is not the developer', async () => {
      it("reverts", async () => {
        await exceptions.catchRevert(cooperative.initNewProposals({from: accounts[1]}));
      })
    })
  })

  describe("initElection", async () => {
    describe("when the sender is the developer", async () => {
      describe("when an election can be initialized", async () => {
        let canInitElectionT1;
        before(async () => {
          canInitElectionT1 = await cooperative.canInitElection.call();
          await cooperative.setCanInitElection(true);
          await cooperative.setCurrentProposals(p.address);
          await stubUtil.addMethod(p, "closeAddingNewProposals");
          await stubUtil.addMethod(aP, "openPoll");
          await cooperative.initElection({from: accounts[0]});
        })

        after(async () => {
          await stubUtil.resetMethod(p, "closeAddingNewProposals");
          await stubUtil.resetMethod(aP, "openPoll");
        })

        it("closes new proposals", async () => {
          const { firstAddress } = await stubUtil.callHistory(p, "closeAddingNewProposals");
          assert.equal(firstAddress, cooperative.address, 'new proposals should be disabled');
        })

        it("opens the amendment poll", async () => {
          const { firstAddress } = await stubUtil.callHistory(aP, "openPoll");
          assert.equal(firstAddress, cooperative.address, 'amendment poll should open');
        })

        it("does not allow another election to be initialized", async () => {
          const canInitElectionT2 = await cooperative.canInitElection.call();
          assert(!canInitElectionT2, "initializing a new election should be disabled");
          assert(canInitElectionT1 !== canInitElectionT2, "initializing a new election should be disabled");
        })
      })
      describe("when an election cannot be initialized", async () => {
        before(async () => {
          await cooperative.setCanInitElection(false);
        })

        it("reverts", async () => {
          await exceptions.catchRevert(cooperative.initElection({from: accounts[0]}));
        })
      })
    })
    describe("when the sender is not the developer", async () => {
      before(async () => {
        await cooperative.setCanInitElection(true);
      })

      it("reverts", async () => {
        await exceptions.catchRevert(cooperative.initElection({from: accounts[1]}));
      })
    })
  })

  describe("adoptAmendmentModification", async () => {
    describe("when the proposals have passed", async () => {
      describe("when the propsal exists", async () => {
        describe("when it is the final modification for the proposal", async () => {
          before(async () => {
            await aP.setProposalsPassed(true);
            await aP.setProposalsFailed(false);
            await cooperative.addAmendment(1, a.address);
            await cooperative.setTotalCompleteAdoptions(5);
            await cooperative.setCurrentProposals(p.address);
            await p.setProposalExists(accounts[0]);
            await stubUtil.addMethod(p, 'recordModificationAdoption');
            await stubUtil.addMethod(a, 'modifyAmendment');
            await cooperative.adoptAmendmentModification(1, 4, accounts[2], true, {from: accounts[0]});
          })

          after(async () => {
            await stubUtil.resetMethod(p, 'recordModificationAdoption');
            await stubUtil.resetMethod(a, 'modifyAmendment');
          })

          it("correctly modifies the amendment", async () => {
            const { firstAddress, firstUint } = await stubUtil.callHistory(a, 'modifyAmendment');
            assert.equal(firstUint, 4, "should pass the correct amendment to update id");
            assert.equal(firstAddress, accounts[2], "should pass the new reference amendment");
          })

          it("records the modification proposal adoption", async () => {
            const { firstAddress } = await stubUtil.callHistory(p, 'recordModificationAdoption');
            assert.equal(firstAddress, accounts[0], "should record that the propsal was adopted");
          })

          it("increments totalCompleteAdoptions by 1", async () => {
            const totalCompleteAdoptionsT2 = await cooperative.totalCompleteAdoptions.call();
            assert.equal(Number(totalCompleteAdoptionsT2), 6, "totalCompleteAdoptions should increase by 1");
          })
        })
        describe("when it is not the final modification for the proposal", async () => {
          // let totalCompleteAdoptionsT1;
          before(async () => {
            // totalCompleteAdoptionsT1 = await cooperative.totalCompleteAdoptions.call();
            await aP.setProposalsPassed(true);
            await aP.setProposalsFailed(false);
            await cooperative.addAmendment(1, a.address);
            await cooperative.setTotalCompleteAdoptions(5);
            await cooperative.setCurrentProposals(p.address);
            await p.setProposalExists(accounts[0]);
            await cooperative.adoptAmendmentModification(1, 4, accounts[2], false, {from: accounts[0]});
          })

          it("correctly modifies the amendment", async () => {
            const { firstAddress, firstUint } = await stubUtil.callHistory(a, 'modifyAmendment');
            assert.equal(firstUint, 4, "should pass the correct amendment to update id");
            assert.equal(firstAddress, accounts[2], "should pass the new reference amendment");
          })

          it("does not record the modification proposal adoption", async () => {
            const { called } = await stubUtil.callHistory(p, 'recordModificationAdoption');
            assert.equal(called, false, "should not record that the propsal was adopted");
          })

          it("maintinas totalCompleteAdoptions count", async () => {
            const totalCompleteAdoptionsT2 = await cooperative.totalCompleteAdoptions.call();
            assert.equal(Number(totalCompleteAdoptionsT2), 5, "totalCompleteAdoptions should not change");
          })
        })
      })
      describe("when the proposal does not exist", async () => {
        it("reverts", async () => {
          await exceptions.catchRevert(cooperative.adoptAmendmentModification(1, 4, accounts[2], false, {from: accounts[1]}));
        })
      })
    })
    describe("when the proposals have not passed", async () => {
      before(async () => {
        await aP.setProposalsPassed(false);
      })
      it("reverts", async () => {
        await exceptions.catchRevert(cooperative.adoptAmendmentModification(1, 4, accounts[2], false, {from: accounts[0]}));
      })
    })
  })

  describe("adoptNewAmendment", async () => {
    describe("when the proposals have passed", async () => {
      before(async () => {
        await aP.setProposalsPassed(true);
        await aP.setProposalsFailed(false);
      })
      describe("when the proposal exists", async () => {
        before(async () => {
          await cooperative.setTotalCompleteAdoptions(5);
          await cooperative.setCurrentProposals(p.address);
          await p.setProposalExists(a.address);
          await stubUtil.addMethod(p, 'recordNewAdoption');
          await cooperative.adoptNewAmendment(a.address, {from: accounts[0]});
        })

        it("records the new adoption", async () => {
          const { firstAddress } = await stubUtil.callHistory(p, 'recordNewAdoption');
          assert.equal(firstAddress, accounts[0], "should record that the propsal was adopted");

          const amendment = await cooperative._amendmentById.call(1);
          assert.equal(amendment, a.address, "should store the new amendment");
        })

        it("increments totalCompleteAdoptions by 1", async () => {
          const totalCompleteAdoptionsT2 = await cooperative.totalCompleteAdoptions.call();
          assert.equal(Number(totalCompleteAdoptionsT2), 6, "totalCompleteAdoptions should increase by 1");
        })
      })
      describe("when the proposal does not exist", async () => {
        it("reverts", async () => {
          await p.setProposalExists(accounts[0]);
          await exceptions.catchRevert(cooperative.adoptNewAmendment(a.address, {from: accounts[1]}));
        })
      })
    })
    describe("when the proposals have not passed", async () => {
      before(async () => {
        await aP.setProposalsPassed(false);
        await p.setProposalExists(a.address);
      })

      it("reverts", async () => {
        await exceptions.catchRevert(cooperative.adoptNewAmendment(a.address, {from: accounts[0]}));
      })
    })
  })

  describe("adoptAmendmentRemoval", async () => {
    describe("when the proposals have passed", async () => {
      before(async () => {
        await aP.setProposalsPassed(true);
        await aP.setProposalsFailed(false);
      })
      describe("when the proposal exists", async () => {
        before(async () => {
          await cooperative.setTotalCompleteAdoptions(5);
          await cooperative.addAmendment(1, a.address);
          await cooperative.setCurrentProposals(p.address);
          await p.setProposalExists(accounts[0]);
          await stubUtil.addMethod(p, 'recordRemovalAdoption');
          await stubUtil.addMethod(a, 'closeFunctionality');
          await cooperative.adoptAmendmentRemoval(1, {from: accounts[0]});
        })

        it("closes the functionality of the amendment", async () => {
          const { called } = await stubUtil.callHistory(a, 'closeFunctionality');
          assert(called, "functionality of removed amendment should be disabled");
        })

        it("records the removal adoption", async () => {
          const { firstAddress } = await stubUtil.callHistory(p, 'recordRemovalAdoption');
          assert.equal(firstAddress, accounts[0], "should record that the removal was adopted");
        })

        it("increments totalCompleteAdoptions by 1", async () => {
          const totalCompleteAdoptionsT2 = await cooperative.totalCompleteAdoptions.call();
          assert.equal(Number(totalCompleteAdoptionsT2), 6, "totalCompleteAdoptions should increase by 1");
        })
      })
      describe("when the proposal does not exist", async () => {
        it("reverts", async () => {
          await exceptions.catchRevert(cooperative.adoptAmendmentRemoval(1, {from: accounts[1]}));
        })
      })
    })
    describe("when the proposals have not passed", async () => {
      before(async () => {
        await aP.setProposalsPassed(false);
        await p.setProposalExists(accounts[0]);
      })
      it("reverts", async () => {
        await exceptions.catchRevert(cooperative.adoptAmendmentRemoval(1, {from: accounts[0]}));
      })
    })
  })
});

const setUp = async () => {
  const votingToken = await initVotingToken();
  const activeToken = await initActiveToken(votingToken);
  await initAmendmentPoll(activeToken);
  await initNewProposals();
  await initCooperative();
  await initAmendmentStub(true);
};

const initVotingToken = async () => {
  return await VotingTokenStub.new();
};

const initActiveToken = async (votingToken) => {
  return await ActiveTokenStub.new(votingToken.address);
};

const initAmendmentPoll = async (activeToken) => {
  aP = await AmendmentPollStub.new(activeToken.address);
};

const initNewProposals = async () => {
  p = await ProposalsStub.new(accounts[0], aP.address);
};

const initCooperative = async () => {
  cooperative = await CooperativeMock.new(accounts[0], aP.address);
};

const initAmendmentStub = async (replacable) => {
  a = await AmendmentStub.new(replacable);
}
