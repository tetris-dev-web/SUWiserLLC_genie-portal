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

let tokenInstance;

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
        // .then(() => {
        //   return deployer.deploy(ProjectQueue);
        // })
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
            );
        })
        .then(() => {
          tokenInstance = Token.at(Token.address);
          return tokenInstance.initializeDividendWallet(Dividends.address);
        })
        .then(() => {
          const investorListInst = InvestorList.at(InvestorList.address);
          return investorListInst.transferOwnership(GNITokenCrowdsale.address);
        })
        // .then(() => {
        //   const pQInst = ProjectQueue.at(ProjectQueue.address);
        //   return pQInst.transferOwnership(GNITokenCrowdsale.address);
        // })
        .then(() => {
          tokenInstance.transferOwnership(GNITokenCrowdsale.address);
        })
};
