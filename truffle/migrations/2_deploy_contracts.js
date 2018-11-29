const Token = artifacts.require("Token");
const TokenMock = artifacts.require("TokenMock");
const ProjectQueue = artifacts.require("ProjectQueue");
const InvestorList = artifacts.require("InvestorList");
const InvestorListMock = artifacts.require("InvestorListMock");
const InvestorListStub = artifacts.require("InvestorListStub");
const GNITokenCrowdsale = artifacts.require("GNITokenCrowdsale");
const MyStringStore = artifacts.require("MyStringStore");
const Dividends = artifacts.require("Dividends");

const GNITokenCrowdsaleMock = artifacts.require("GNITokenCrowdsaleMock");
const TokenStub = artifacts.require("TokenStub");
const ProjectQueueStub = artifacts.require("ProjectQueueStub");

module.exports = function (deployer, network, accounts) {
    const rate = 10000;
    const developer = accounts[1];

    return deployer
        .then(() => {
          return deployer.deploy(InvestorListStub);
        })
        .then(() => {
          return deployer.deploy(TokenMock, InvestorListStub.address);
        })
        .then(() => {
          return deployer.deploy(ProjectQueue);
        })
        .then(() => {
          return deployer.deploy(MyStringStore);
        })
        .then(() => {
          return deployer.deploy(InvestorList);
        })
        .then(() => {
          return deployer.deploy(InvestorListMock);
        })
        .then(() => {
          return deployer.deploy(Token, InvestorList.address);
        })
        .then(() => {
          return deployer.deploy(
            Dividends,
            Token.address,
            developer,
            InvestorList.address
          );
        })
        .then(() => { // establish start time variable
            return new Promise((resolve, reject) => {
                web3.eth.getBlock('latest', (err, time) => {
                    if (err) reject();
                    const openingTime = time.timestamp + 5;
                    resolve(openingTime);
                })
            })
        })
        .then((openingTime) => { // deploy the crowdsale (token functionality)
            const doomsDay = openingTime + 86400 * 240; // 240 days
            return deployer.deploy(
                GNITokenCrowdsale,
                openingTime,
                doomsDay,
                rate,
                developer,
                Dividends.address,
                Token.address,
                InvestorList.address,
                ProjectQueue.address
            );
        })
        .then(() => {
            return GNITokenCrowdsale.deployed().then(crowdsale => {
                crowdsale.token().then(tokenAddr => {
                  const tokenInstance = Token.at(tokenAddr);
                  tokenInstance.transferOwnership(crowdsale.address);
                  return crowdsale;
                })
                .then(crowdsale => {
                  crowdsale.investorList().then(iLAddr => {
                    const investorListInst = InvestorList.at(iLAddr);
                    investorListInst.transferOwnership(crowdsale.address);
                    return crowdsale;
                  })
                  .then(crowdsale => {
                    crowdsale.projectQueue().then(pQAddr => {
                    const pQInst = ProjectQueue.at(pQAddr);
                    pQInst.transferOwnership(crowdsale.address);
                    return crowdsale;
                  })
                })
              })
            })
          .catch(err => {
            console.log(err);
          })
        })
        // .then(() => {
        //   return deployer.deploy(TokenStub, InvestorListStub.address);
        // })
        // .then(() => {
        //   return deployer.deploy(ProjectQueueStub);
        // })
        // .then(() => { // establish start time variable
        //     return new Promise((resolve, reject) => {
        //         web3.eth.getBlock('latest', (err, time) => {
        //             if (err) reject();
        //             const openingTime = time.timestamp + 5;
        //             resolve(openingTime);
        //         })
        //     })
        // })
        // .then((openingTime) => {
        //   const doomsDay = openingTime + 86400 * 240;
        //   return deployer.deploy(
        //     GNITokenCrowdsaleMock,
        //     openingTime,
        //     doomsDay,
        //     rate,
        //     developer,
        //     TokenStub.address,
        //     InvestorListStub.address,
        //     ProjectQueueStub.address);
        // })
};
