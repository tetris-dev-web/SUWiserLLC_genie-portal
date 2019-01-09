const ProjectLeaderTrackerMock = artifacts.require("ProjectLeaderTrackerMock");
const ProjectStub = artifacts.require("ProjectStub");
const exceptions = require('./exceptions');
const { parseBN, parseMethod, weiBalanceOf } = require('./parseUtil');
const { initProjectStubs } = require('./projectStubsInit');

let mPLT;
let projStub1;
let projStub2;
let projStub3;

contract("ProjectLeaderTracker", async () => {

  before(async () => {
    await setUp();
    await initProjectStubs();
  })

  describe('considerTentativeLeaderShip', async () => {
    before(async () => {
      await projStub1.setMockVotes(4000000);
    });

    describe('when there is no tentativeLeaderAddr', async () => {
      describe('when there is only one project', async () => {
        let initialCheckedCount;
        before(async () => {
          await mPLT.resetMockTentativeProject();
          initialCheckedCount = await parseMethod(mPLT.totalChecked);
          await mPLT.setStubCandidatetCount(1);
          await mPLT.considerTentativeLeaderShip_(0);
        })

        after(async () => {
          await mPLT.resetMockTentativeProject();
        })

        it('sets the project as the new tentative leader', async () => {
          let tlAddr = await mPLT.tentativeLeaderAddr();
          let tlCapRequired = await parseMethod(mPLT.tentativeLeaderCapRequired);

          assert.equal(tlAddr, projStub1.address, 'tentativeLeaderAddr not assigned properly');
          assert.equal(tlCapRequired, 10000000, 'tentativeLeaderCapRequired not assigned properly');
        })

        it('sets tentativeLeaderConfirmed to true', async () => {
          let tlConfirmed = await mPLT.tentativeLeaderConfirmed();
          assert.equal(tlConfirmed, true, 'tentative leader should be confirmed');
        })

        it('increments the total number of projects checked by 1', async () => {
          let finalCheckedCount = await parseMethod(mPLT.totalChecked);
          assert.equal(finalCheckedCount, initialCheckedCount + 1, 'total projects checked not incremented by 1');
        })

        it('sets the projects checked status to true', async () => {
          let checkedStatus = await mPLT.checkedStatusOf(projStub1.address);
          assert.equal(checkedStatus, true, 'checked status of project notset to true');
        })

        it('sets the leadingVoteCount to the projects totalVoteCount', async () => {

        })
      })

      describe('when there are multiple projects', async () => {
        let initialCheckedCount;
        before(async () => {
          initialCheckedCount = await parseMethod(mPLT.totalChecked);
          await mPLT.setStubCandidatetCount(2);
          await mPLT.considerTentativeLeaderShip_(0);
        })

        after(async () => {
          await mPLT.resetMockTentativeProject();
        })

        it('sets the project as the new tentative leader', async () => {
          let tlAddr = await mPLT.tentativeLeaderAddr();
          let tlCapRequired = await parseMethod(mPLT.tentativeLeaderCapRequired);

          assert.equal(tlAddr, projStub1.address, 'tentativeLeaderAddr not assigned properly');
          assert.equal(tlCapRequired, 10000000, 'tentativeLeaderCapRequired not assigned properly');
        })

        it('sets tentativeLeaderConfirmed to false', async () => {
          let tlConfirmed = await mPLT.tentativeLeaderConfirmed();
          assert.equal(tlConfirmed, false, 'tentative leader should not be confirmed');
        })

        it('increments the total number of projects checked by 1', async () => {
          let finalCheckedCount = await parseMethod(mPLT.totalChecked);
          assert.equal(finalCheckedCount, initialCheckedCount + 1, 'total projects checked not incremented by 1');
        })

        it('sets the projects checked status to true', async () => {
          let checkedStatus = await mPLT.checkedStatusOf(projStub1.address);
          assert.equal(checkedStatus, true, 'checked status of project notset to true');
        })

        it('sets the leadingVoteCount to the projects totalVoteCount', async () => {

        })
      })
    })

    describe('when the project has more votes than the tentative leader', async () => {
      before(async () => {
        await projStub2.setMockVotes(5000000);
      })
      describe('when it is the final project to be checked', async () => {
        let initialCheckedCount;
        before(async () => {
          await mPLT.setMockTentativeLeader(projStub1.address);
          await projStub1.setStubOpenStatus(true);
          await mPLT.setStubCandidatetCount(2);
          await mPLT.setMockTotalChecked(1);
          initialCheckedCount = await parseMethod(mPLT.totalChecked);
          await mPLT.considerTentativeLeaderShip_(1);
        })
        after(async () => {
          await mPLT.resetMockTentativeProject();
        })

        it('sets the project as the new tentative leader', async () => {
          let tlAddr = await mPLT.tentativeLeaderAddr();
          let tlCapRequired = await parseMethod(mPLT.tentativeLeaderCapRequired);

          assert.equal(tlAddr, projStub2.address, 'tentativeLeaderAddr not assigned properly');
          assert.equal(tlCapRequired, 10000000, 'tentativeLeaderCapRequired not assigned properly');
        })

        it('sets tentativeLeaderConfirmed to true', async () => {
          let tlConfirmed = await mPLT.tentativeLeaderConfirmed();
          assert.equal(tlConfirmed, true, 'tentative leader should be confirmed');
        })

        it('increments the total number of projects checked by 1', async () => {
          let finalCheckedCount = await parseMethod(mPLT.totalChecked);
          assert.equal(finalCheckedCount, initialCheckedCount + 1, 'total projects checked not incremented by 1');
        })

        it('sets the projects checked status to true', async () => {
          let checkedStatus = await mPLT.checkedStatusOf(projStub2.address);
          assert.equal(checkedStatus, true, 'checked status of project notset to true');
        })

        it('sets the leadingVoteCount to the projects totalVoteCount', async () => {

        })
      })

      describe('when there are more projects to be checked', async () => {
        //we need for when the leader has been confirmed in addition to when it has not been
        let initialCheckedCount;
        before(async () => {
          await mPLT.setMockTentativeLeader(projStub1.address);
          await projStub1.setStubOpenStatus(true);
          await mPLT.setStubCandidatetCount(3);
          await mPLT.setMockTotalChecked(1);
          initialCheckedCount = await parseMethod(mPLT.totalChecked);
          await mPLT.considerTentativeLeaderShip_(1);
        })

        after(async () => {
          await mPLT.resetMockTentativeProject();
        })

        it('sets the project as the new tentative leader', async () => {
          let tlAddr = await mPLT.tentativeLeaderAddr();
          let tlCapRequired = await parseMethod(mPLT.tentativeLeaderCapRequired);

          assert.equal(tlAddr, projStub2.address, 'tentativeLeaderAddr not assigned properly');
          // assert.equal(tlCapRequired, 10000000, 'tentativeLeaderCapRequired not assigned properly');
        })

        it('sets tentativeLeaderConfirmed to false', async () => {
          let tlConfirmed = await mPLT.tentativeLeaderConfirmed();
          assert.equal(tlConfirmed, false, 'tentative leader should not be confirmed');
        })

        it('increments the total number of projects checked by 1', async () => {
          let finalCheckedCount = await parseMethod(mPLT.totalChecked);
          assert.equal(finalCheckedCount, initialCheckedCount + 1, 'total projects checked not incremented by 1');
        })

        it('sets the projects checked status to true', async () => {
          let checkedStatus = await mPLT.checkedStatusOf(projStub2.address);
          assert.equal(checkedStatus, true, 'checked status of project notset to true');
        })

        it('sets the leadingVoteCount to the projects totalVoteCount', async () => {

        })
      })
    })

    describe('when the tentative leader has closed', async () => {
      before(async () => {
        await mPLT.setMockTentativeLeader(projStub1.address);
        await projStub1.setStubOpenStatus(false);
        await mPLT.setStubCandidatetCount(3);
        await projStub3.setMockVotes(2000000);
        await mPLT.considerTentativeLeaderShip_(2);
      })

      after(async () => {
        await mPLT.resetMockTentativeProject();
      })

      it('sets the project as the new tentative leader', async () => {
        let tlAddr = await mPLT.tentativeLeaderAddr();
        let tlCapRequired = await parseMethod(mPLT.tentativeLeaderCapRequired);

        assert.equal(tlAddr, projStub3.address, 'tentativeLeaderAddr not assigned properly');
        // assert.equal(tlCapRequired, 8000000, 'tentativeLeaderCapRequired not assigned properly');
      })

      it('sets tentativeLeaderConfirmed to false', async () => {
        let tlConfirmed = await mPLT.tentativeLeaderConfirmed();
        assert.equal(tlConfirmed, false, 'tentative leader should not be confirmed');
      })

      it('sets the projects checked status to true', async () => {
        let checkedStatus = await mPLT.checkedStatusOf(projStub3.address);
        assert.equal(checkedStatus, true, 'checked status of project notset to true');
      })

      it('sets the total number of projects checked to 1', async () => {
        let finalCheckedCount = await parseMethod(mPLT.totalChecked);
        assert.equal(finalCheckedCount, 1, 'total projects checked should be 2');
      })

      it('sets the leadingVoteCount to the projects totalVoteCount', async () => {

      })
    })

    describe('when the project is the tentative leader', async () => {
      describe('when the leader has lost votes', async () => {
        it('maintains the current tentativeLeader', async () => {
          let tlAddr = await mPLT.tentativeLeaderAddr();
          let tlCapRequired = await parseMethod(mPLT.tentativeLeaderCapRequired);

          assert.equal(tlAddr, projStub3.address, 'tentativeLeaderAddr not assigned properly');
          // assert.equal(tlCapRequired, 8000000, 'tentativeLeaderCapRequired not assigned properly');
        })

        it('sets tentativeLeaderConfirmed to false', async () => {
          let tlConfirmed = await mPLT.tentativeLeaderConfirmed();
          assert.equal(tlConfirmed, false, 'tentative leader should not be confirmed');
        })

        it('sets the projects checked status to true', async () => {
          let checkedStatus = await mPLT.checkedStatusOf(projStub3.address);
          assert.equal(checkedStatus, true, 'checked status of project notset to true');
        })

        it('sets the total number of projects checked to 1', async () => {
          let finalCheckedCount = await parseMethod(mPLT.totalChecked);
          assert.equal(finalCheckedCount, 1, 'total projects checked should be 2');
        })

        it('sets the leadingVoteCount to the projects totalVoteCount', async () => {

        })
      })

      describe('when the leader has gained votes', async () => {
        it('updates the leadingVoteCount', async () => {

        })
      })
    })

    describe('when the tentative leader cannot be updated', async () => {
      before(async () => {
        await projStub1.setStubOpenStatus(true);
      })

      describe('when it is the final project to be checked', async () => {
        before(async () => {
          await mPLT.setMockTentativeLeader(projStub1.address);
          await mPLT.setStubCandidatetCount(3);
          await mPLT.setMockTotalChecked(2);
          await mPLT.considerTentativeLeaderShip_(2);
        })

        after(async () => {
          await mPLT.resetMockTentativeProject();
        })

        it('sets the projects checked status to true', async () => {
          let checkedStatus = await mPLT.checkedStatusOf(projStub3.address);
          assert.equal(checkedStatus, true, 'checked status of project notset to true');
        })

        it('increments the total number of projects checked by 1', async () => {
          let finalCheckedCount = await parseMethod(mPLT.totalChecked);
          assert.equal(finalCheckedCount, 3, 'total projects checked not incremented by 1');
        })

        it('sets tentativeLeaderConfirmed to true', async () => {
          let tlConfirmed = await mPLT.tentativeLeaderConfirmed();
          assert.equal(tlConfirmed, true, 'tentative leader should be confirmed');
        })
      })

      describe('when there are more projects to be checked', async () => {
        before(async () => {
          await mPLT.setMockTentativeLeader(projStub1.address);
          await mPLT.setStubCandidatetCount(3);
          await mPLT.setMockTotalChecked(1);
          await mPLT.considerTentativeLeaderShip_(2);
        })

        after(async () => {
          await mPLT.resetMockTentativeProject();
        })

        it('sets the projects checked status to true', async () => {
          let checkedStatus = await mPLT.checkedStatusOf(projStub3.address);
          assert.equal(checkedStatus, true, 'checked status of project notset to true');
        })

        it('increments the total number of projects checked by 1', async () => {
          let finalCheckedCount = await parseMethod(mPLT.totalChecked);
          assert.equal(finalCheckedCount, 2, 'total projects checked not incremented by 1');
        })

        it('sets tentativeLeaderConfirmed to false', async () => {
          let tlConfirmed = await mPLT.tentativeLeaderConfirmed();
          assert.equal(tlConfirmed, false, 'tentative leader should not be confirmed');
        })
      })
    })
  })
})

const setUp = async () => {
  mPLT = await ProjectLeaderTracker.new();
}
