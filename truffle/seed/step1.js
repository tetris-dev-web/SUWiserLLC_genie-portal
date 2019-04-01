const ProjectFactory = artifacts.require("ProjectFactory");
const { sampleCashflow } = require('./sampleCashflow/sampleCashflow');
// const projectFactory = await ProjectFactory.deployed();

module.exports = async () => {
  const developer = web3.currentProvider.addresses[0];
  const projectFactory = await ProjectFactory.deployed();

  const createProjects = async () => {
    const createProject = async (
          title,
          capitalRequired,
          valuation,
          lat,
          lng,
          id
      ) => {
      const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
      const busLink = 'https://drive.google.com/open?id=1zxY4cZcdaAMpinQpdZmTb8Zy2i9dh2iZ';
      const model_id = "7syizSLPN60";
      const projectInfo = JSON.stringify({
        title,
        description,
        busLink,
        model_id,
        lat,
        lng
      })
      const cashflow = JSON.stringify(sampleCashflow);

      await projectFactory.createProject(
        projectInfo,
        valuation,
        capitalRequired,
        cashflow,
        {
          from: developer
        }
      );

      return await projectFactory.projectById.call(id);
    }

    const projAddr1 = await createProject(
      'HamInn',
      0,
      900,
      '40.7128',
      '-74.0060',
      1
     );
     console.log('p1', projAddr1)
    // console.log(Project.at(projAddr1))
    const projAddr2 = await createProject(
      'Matt\'s Mansion',
      200,
      800,
      '40.7128',
      '-74.0060',
      2
    );
    console.log('p2', projAddr2)
    const projAddr3 = await createProject(
      'Steven\'s Skyscraper',
      400,
      1000,
      '41.9028',
      '12.4964',
      3
    );
    console.log('p3', projAddr3)
    const projAddr4 = await createProject(
      'Liam\'s Lounge',
      600,
      800,
      '31.2304',
      '121.4737',
      4
    );
    console.log('p4', projAddr4)
    const projAddr5 = await createProject(
      'Ryan\'s Rooftop',
      500,
      700,
      '5.6037',
      '-0.1870',
      5
    );
    console.log('p5', projAddr5)
    const projAddr6 = await createProject(
      'Kyle\'s Kale Farm',
      300,
      700,
      '41.9028',
      '12.4964',
      6
    );
    console.log('p6', projAddr6)
  }

  console.log('what')
  await createProjects();
  return null;
}
