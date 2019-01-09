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

module.exports = {
  initProjectStubs
}
