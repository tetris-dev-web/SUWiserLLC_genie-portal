// describe('considerTentativeLeaderShip', async () => {
//   before(async () => {
//     await stubUtil.addMethod(mockGTC, 'updateTentativeLeader');
//     await stubUtil.addMethod(mockGTC, 'recordCheck');
//     await projStub1.setMockVotes(4000000);
//     await projStub1.setStubCapRequired(10000000);
//   });
//
//   describe('when there is no tentativeLeaderAddr', async () => {
//     describe('when there is only one project', async () => {
//       let initialCheckedCount;
//       before(async () => {
//         await mockGTC.resetMockTentativeProject();
//         initialCheckedCount = await parseMethod(mockGTC.totalChecked);
//         await mockGTC.setStubProjectCount(1);
//         await mockGTC.considerTentativeLeaderShip_(0);
//       })
//
//       after(async () => {
//         await mockGTC.resetMockTentativeProject();
//       })
//
//       it('sets the project as the new tentative leader', async () => {
//         let tlAddr = await mockGTC.tentativeLeaderAddr();
//         let tlCapRequired = await parseMethod(mockGTC.tentativeLeaderCapRequired);
//
//         assert.equal(tlAddr, projStub1.address, 'tentativeLeaderAddr not assigned properly');
//         assert.equal(tlCapRequired, 10000000, 'tentativeLeaderCapRequired not assigned properly');
//       })
//
//       it('sets tentativeLeaderConfirmed to true', async () => {
//         let tlConfirmed = await mockGTC.tentativeLeaderConfirmed();
//         assert.equal(tlConfirmed, true, 'tentative leader should be confirmed');
//       })
//
//       it('increments the total number of projects checked by 1', async () => {
//         let finalCheckedCount = await parseMethod(mockGTC.totalChecked);
//         assert.equal(finalCheckedCount, initialCheckedCount + 1, 'total projects checked not incremented by 1');
//       })
//
//       it('sets the projects checked status to true', async () => {
//         let checkedStatus = await mockGTC.checkedStatusOf(projStub1.address);
//         assert.equal(checkedStatus, true, 'checked status of project notset to true');
//       })
//     })
//
//     describe('when there are multiple projects', async () => {
//       let initialCheckedCount;
//       before(async () => {
//         initialCheckedCount = await parseMethod(mockGTC.totalChecked);
//         await mockGTC.setStubProjectCount(2);
//         await mockGTC.considerTentativeLeaderShip_(0);
//       })
//
//       after(async () => {
//         await mockGTC.resetMockTentativeProject();
//       })
//
//       it('sets the project as the new tentative leader', async () => {
//         let tlAddr = await mockGTC.tentativeLeaderAddr();
//         let tlCapRequired = await parseMethod(mockGTC.tentativeLeaderCapRequired);
//
//         assert.equal(tlAddr, projStub1.address, 'tentativeLeaderAddr not assigned properly');
//         assert.equal(tlCapRequired, 10000000, 'tentativeLeaderCapRequired not assigned properly');
//       })
//
//       it('sets tentativeLeaderConfirmed to false', async () => {
//         let tlConfirmed = await mockGTC.tentativeLeaderConfirmed();
//         assert.equal(tlConfirmed, false, 'tentative leader should not be confirmed');
//       })
//
//       it('increments the total number of projects checked by 1', async () => {
//         let finalCheckedCount = await parseMethod(mockGTC.totalChecked);
//         assert.equal(finalCheckedCount, initialCheckedCount + 1, 'total projects checked not incremented by 1');
//       })
//
//       it('sets the projects checked status to true', async () => {
//         let checkedStatus = await mockGTC.checkedStatusOf(projStub1.address);
//         assert.equal(checkedStatus, true, 'checked status of project notset to true');
//       })
//     })
//   })
//
//   describe('when the project has more votes than the tentative leader', async () => {
//     before(async () => {
//       await projStub2.setMockVotes(5000000);
//       await projStub2.setStubCapRequired(10000000);
//     })
//     describe('when it is the final project to be checked', async () => {
//       let initialCheckedCount;
//       before(async () => {
//         await mockGTC.setMockTentativeLeader(projStub1.address, 7000000);
//         await projStub1.setStubOpenStatus(true);
//         await mockGTC.setStubProjectCount(2);
//         await mockGTC.setMockTotalChecked(1);
//         initialCheckedCount = await parseMethod(mockGTC.totalChecked);
//         await mockGTC.considerTentativeLeaderShip_(1);
//       })
//       after(async () => {
//         await mockGTC.resetMockTentativeProject();
//       })
//
//       it('sets the project as the new tentative leader', async () => {
//         let tlAddr = await mockGTC.tentativeLeaderAddr();
//         let tlCapRequired = await parseMethod(mockGTC.tentativeLeaderCapRequired);
//
//         assert.equal(tlAddr, projStub2.address, 'tentativeLeaderAddr not assigned properly');
//         assert.equal(tlCapRequired, 10000000, 'tentativeLeaderCapRequired not assigned properly');
//       })
//
//       it('sets tentativeLeaderConfirmed to true', async () => {
//         let tlConfirmed = await mockGTC.tentativeLeaderConfirmed();
//         assert.equal(tlConfirmed, true, 'tentative leader should be confirmed');
//       })
//
//       it('increments the total number of projects checked by 1', async () => {
//         let finalCheckedCount = await parseMethod(mockGTC.totalChecked);
//         assert.equal(finalCheckedCount, initialCheckedCount + 1, 'total projects checked not incremented by 1');
//       })
//
//       it('sets the projects checked status to true', async () => {
//         let checkedStatus = await mockGTC.checkedStatusOf(projStub2.address);
//         assert.equal(checkedStatus, true, 'checked status of project notset to true');
//       })
//     })
//
//     describe('when there are more projects to be checked', async () => {
//       //we need for when the leader has been confirmed in addition to when it has not been
//       let initialCheckedCount;
//       before(async () => {
//         await mockGTC.setMockTentativeLeader(projStub1.address, 7000000);
//         await projStub1.setStubOpenStatus(true);
//         await mockGTC.setStubProjectCount(3);
//         await mockGTC.setMockTotalChecked(1);
//         initialCheckedCount = await parseMethod(mockGTC.totalChecked);
//         await mockGTC.considerTentativeLeaderShip_(1);
//       })
//
//       after(async () => {
//         await stubUtil.resetMethod(mockGTC, 'updateTentativeLeader');
//         await stubUtil.resetMethod(mockGTC, 'recordCheck');
//         await mockGTC.resetMockTentativeProject();
//       })
//
//       it('sets the project as the new tentative leader', async () => {
//         let tlAddr = await mockGTC.tentativeLeaderAddr();
//         let tlCapRequired = await parseMethod(mockGTC.tentativeLeaderCapRequired);
//
//         assert.equal(tlAddr, projStub2.address, 'tentativeLeaderAddr not assigned properly');
//         assert.equal(tlCapRequired, 10000000, 'tentativeLeaderCapRequired not assigned properly');
//       })
//
//       it('sets tentativeLeaderConfirmed to false', async () => {
//         let tlConfirmed = await mockGTC.tentativeLeaderConfirmed();
//         assert.equal(tlConfirmed, false, 'tentative leader should not be confirmed');
//       })
//
//       it('increments the total number of projects checked by 1', async () => {
//         let finalCheckedCount = await parseMethod(mockGTC.totalChecked);
//         assert.equal(finalCheckedCount, initialCheckedCount + 1, 'total projects checked not incremented by 1');
//       })
//
//       it('sets the projects checked status to true', async () => {
//         let checkedStatus = await mockGTC.checkedStatusOf(projStub2.address);
//         assert.equal(checkedStatus, true, 'checked status of project notset to true');
//       })
//     })
//   })
//
//   describe('when the tentative leader has closed', async () => {
//     before(async () => {
//       await mockGTC.setMockTentativeLeader(projStub1.address, 7000000);
//       await projStub1.setStubOpenStatus(false);
//       await mockGTC.setStubProjectCount(3);
//       await projStub3.setMockVotes(2000000);
//       await projStub3.setStubCapRequired(8000000);
//       await mockGTC.considerTentativeLeaderShip_(2);
//     })
//
//     after(async () => {
//       await mockGTC.resetMockTentativeProject();
//     })
//
//     it('sets the project as the new tentative leader', async () => {
//       let tlAddr = await mockGTC.tentativeLeaderAddr();
//       let tlCapRequired = await parseMethod(mockGTC.tentativeLeaderCapRequired);
//
//       assert.equal(tlAddr, projStub3.address, 'tentativeLeaderAddr not assigned properly');
//       assert.equal(tlCapRequired, 8000000, 'tentativeLeaderCapRequired not assigned properly');
//     })
//
//     it('sets tentativeLeaderConfirmed to false', async () => {
//       let tlConfirmed = await mockGTC.tentativeLeaderConfirmed();
//       assert.equal(tlConfirmed, false, 'tentative leader should not be confirmed');
//     })
//
//     it('sets the projects checked status to true', async () => {
//       let checkedStatus = await mockGTC.checkedStatusOf(projStub3.address);
//       assert.equal(checkedStatus, true, 'checked status of project notset to true');
//     })
//
//     it('sets the total number of projects checked to 1', async () => {
//       let finalCheckedCount = await parseMethod(mockGTC.totalChecked);
//       assert.equal(finalCheckedCount, 1, 'total projects checked should be 2');
//     })
//
//     it('decrements the inactiveProjectCount by one', async () => {
//       let finalInactiveProjectCount = await mockGTC.inactiveProjectCount();
//       assert.equal(finalInactiveProjectCount, 2, 'inactiveProjectCount should decrement by one');
//     })
//   })
//
//   describe('when the tentative leader cannot be updated', async () => {
//     before(async () => {
//       await projStub1.setStubOpenStatus(true);
//     })
//
//     describe('when it is the final project to be checked', async () => {
//       before(async () => {
//         await mockGTC.setMockTentativeLeader(projStub1.address, 7000000);
//         await mockGTC.setStubProjectCount(3);
//         await mockGTC.setMockTotalChecked(2);
//         await mockGTC.considerTentativeLeaderShip_(2);
//       })
//
//       after(async () => {
//         await mockGTC.resetMockTentativeProject();
//       })
//
//       it('sets the projects checked status to true', async () => {
//         let checkedStatus = await mockGTC.checkedStatusOf(projStub3.address);
//         assert.equal(checkedStatus, true, 'checked status of project notset to true');
//       })
//
//       it('increments the total number of projects checked by 1', async () => {
//         let finalCheckedCount = await parseMethod(mockGTC.totalChecked);
//         assert.equal(finalCheckedCount, 3, 'total projects checked not incremented by 1');
//       })
//
//       it('sets tentativeLeaderConfirmed to true', async () => {
//         let tlConfirmed = await mockGTC.tentativeLeaderConfirmed();
//         assert.equal(tlConfirmed, true, 'tentative leader should be confirmed');
//       })
//     })
//
//     describe('when there are more projects to be checked', async () => {
//       before(async () => {
//         await mockGTC.setMockTentativeLeader(projStub1.address, 7000000);
//         await mockGTC.setStubProjectCount(3);
//         await mockGTC.setMockTotalChecked(1);
//         await mockGTC.considerTentativeLeaderShip_(2);
//       })
//
//       after(async () => {
//         await mockGTC.resetMockTentativeProject();
//       })
//
//       it('sets the projects checked status to true', async () => {
//         let checkedStatus = await mockGTC.checkedStatusOf(projStub3.address);
//         assert.equal(checkedStatus, true, 'checked status of project notset to true');
//       })
//
//       it('increments the total number of projects checked by 1', async () => {
//         let finalCheckedCount = await parseMethod(mockGTC.totalChecked);
//         assert.equal(finalCheckedCount, 2, 'total projects checked not incremented by 1');
//       })
//
//       it('sets tentativeLeaderConfirmed to false', async () => {
//         let tlConfirmed = await mockGTC.tentativeLeaderConfirmed();
//         assert.equal(tlConfirmed, false, 'tentative leader should not be confirmed');
//       })
//     })
//   })
// })
//
// describe('attemptProjectActivation', async () => {
//   before(async () => {
//     await mockGTC.setMockTentativeLeader(projStub1.address, 7000000);
//
//     await stubUtil.addMethod(projStub1, 'activate');
//     await stubUtil.addMethod(tokenStub, 'increasePendingActivations');
//     await mockGTC.setStubProjectCount(3);
//   })
//
//   describe('when there is not enough weiRaised to cover the project', async () => {
//     let initialDeveloperWei;
//     let beforeWeiRaised;
//     before(async () => {
//       await mockGTC.setMockWeiRaised(500);
//       await projStub1.setStubOpenStatus(true);
//       await mockGTC.setMockConfirmedLeaderStatus(true);
//       initialDeveloperWei = await weiBalanceOf(accounts[1]);
//       beforeWeiRaised = await parseMethod(getWeiRaised);
//       await mockGTC.attemptProjectActivation_();
//     })
//
//     it('does not activate the project', async () => {
//       let { called } = await stubUtil.callHistory(projStub1, 'activate');
//       assert.equal(called, false, 'project should not be activated');
//     })
//
//     it('does not forward funds to the developer', async () => {
//       let finalDeveloperWei = await weiBalanceOf(accounts[1]);
//       assert.equal(finalDeveloperWei, initialDeveloperWei, 'funds should not be forwarded to the developer');
//     })
//
//     it('does not affect weiRaised', async () => {
//       let afterWei = await parseMethod(getWeiRaised);
//       assert.equal(afterWei, beforeWeiRaised, 'weiRaised not reduced by capitalRequired');
//     })
//
//     it('does not affect inactiveProjectCount', async () => {
//       let afterInactiveProjectCount = await await mockGTC.inactiveProjectCount();
//       assert.equal(afterInactiveProjectCount, 3, 'inactiveProjectCount should not change');
//     })
//
//     it('does not affect pending token activations', async () => {
//       let { called } = await stubUtil.callHistory(tokenStub, 'increasePendingActivations');
//       assert.equal(called, false, 'pending token activations should not change');
//     })
//   })
//
//   describe('when the tentative leader has not been confirmed', async () => {
//     let initialDeveloperWei;
//     let beforeWeiRaised;
//     before(async () => {
//       await mockGTC.setMockWeiRaised(8000000);
//       await projStub1.setStubOpenStatus(true);
//       await mockGTC.setMockConfirmedLeaderStatus(false);
//       initialDeveloperWei = await weiBalanceOf(accounts[1]);
//       beforeWeiRaised = await parseMethod(getWeiRaised);
//       await mockGTC.attemptProjectActivation_();
//     })
//
//     it('does not activate the project', async () => {
//       let { called } = await stubUtil.callHistory(projStub1, 'activate');
//       assert.equal(called, false, 'project should not be activated');
//     })
//
//     it('does not forward funds to the developer', async () => {
//       let finalDeveloperWei = await weiBalanceOf(accounts[1]);
//       assert.equal(finalDeveloperWei, initialDeveloperWei, 'funds should not be forwarded to the developer');
//     })
//
//     it('does not affect weiRaised', async () => {
//       let afterWei = await parseMethod(getWeiRaised);
//       assert.equal(afterWei, beforeWeiRaised, 'weiRaised not reduced by capitalRequired');
//     })
//
//     it('does not affect inactiveProjectCount', async () => {
//       let afterInactiveProjectCount = await await mockGTC.inactiveProjectCount();
//       assert.equal(afterInactiveProjectCount, 3, 'inactiveProjectCount should not change');
//     })
//
//     it('does not affect pending token activations', async () => {
//       let { called } = await stubUtil.callHistory(tokenStub, 'increasePendingActivations');
//       assert.equal(called, false, 'pending token activations should not change');
//     })
//   })
//
//   describe('when the tentative leader has closed', async () => {
//     let initialDeveloperWei;
//     let beforeWeiRaised;
//     before(async () => {
//       await mockGTC.setMockWeiRaised(8000000);
//       await projStub1.setStubOpenStatus(false);
//       await mockGTC.setMockConfirmedLeaderStatus(true);
//       initialDeveloperWei = await weiBalanceOf(accounts[1]);
//       beforeWeiRaised = await parseMethod(getWeiRaised);
//       await mockGTC.attemptProjectActivation_();
//     })
//
//     it('does not activate the project', async () => {
//       let { called } = await stubUtil.callHistory(projStub1, 'activate');
//       assert.equal(called, false, 'project should not be activated');
//     })
//
//     it('does not forward funds to the developer', async () => {
//       let finalDeveloperWei = await weiBalanceOf(accounts[1]);
//       assert.equal(finalDeveloperWei, initialDeveloperWei, 'funds should not be forwarded to the developer');
//     })
//
//     it('does not affect weiRaised', async () => {
//       let afterWei = await parseMethod(getWeiRaised);
//       assert.equal(afterWei, beforeWeiRaised, 'weiRaised not reduced by capitalRequired');
//     })
//
//     it('does not affect inactiveProjectCount', async () => {
//       let afterInactiveProjectCount = await await mockGTC.inactiveProjectCount();
//       assert.equal(afterInactiveProjectCount, 3, 'inactiveProjectCount should not change');
//     })
//
//     it('does not affect pending token activations', async () => {
//       let { called } = await stubUtil.callHistory(tokenStub, 'increasePendingActivations');
//       assert.equal(called, false, 'pending token activations should not change');
//     })
//   })
//
//   describe('when a project can be activated', async () => {
//     let initialDeveloperWei;
//     let beforeWeiRaised;
//     before(async () => {
//       await mockGTC.receiveMockWei({value: 8000000, from: accounts[2]});
//       await mockGTC.setMockWeiRaised(8000000);
//       await projStub1.setStubOpenStatus(true);
//       await mockGTC.setMockConfirmedLeaderStatus(true);
//       developerWei = await weiBalanceOf(accounts[1]);
//       initialDeveloperWei = new BigNumber(developerWei.toString());
//       beforeWeiRaised = await parseMethod(getWeiRaised);
//       await mockGTC.attemptProjectActivation_();
//     })
//
//     after(async () => {
//       await stubUtil.resetMethod(projStub1, 'activate');
//       await stubUtil.resetMethod(tokenStub, 'increasePendingActivations');
//       await mockGTC.setStubProjectCount(3);
//     })
//
//     it('activates the project', async () => {
//       let { called } = await stubUtil.callHistory(projStub1, 'activate');
//       assert.equal(called, true, 'project should be activated');
//     })
//
//     it('forwards capital required to the developer', async () => {
//       let developerWei = await weiBalanceOf(accounts[1]);
//       let finalDeveloperWei = new BigNumber(developerWei.toString());
//       let expected = initialDeveloperWei.plus('7000000').decimalPlaces(0);
//       assert(finalDeveloperWei.isEqualTo(expected), 'capital required should be forwarded to the developer');
//     })
//
//     it('decreases weiRaised by the capital required', async () => {
//       let afterWei = await parseMethod(getWeiRaised);
//         assert.equal(afterWei, beforeWeiRaised - 7000000, 'weiRaised not reduced by capitalRequired');
//     })
//
//     it('decreases the inactiveProjectCount by one', async () => {
//       let afterInactiveProjectCount = await await mockGTC.inactiveProjectCount();
//       assert.equal(afterInactiveProjectCount, 2, 'inactiveProjectCount should decrease by one');
//     })
//
//     it('increases pending token activations by the amount of tokens associated with the project', async () => {
//       let { firstUint, called } = await stubUtil.callHistory(tokenStub, 'increasePendingActivations');
//       assert.equal(called, true, 'pending token activations should be increased');
//       assert.equal(firstUint, 20000000, 'pending activations should be increases by the number of tokens associated with the activated project');
//     })
//   })
// })
