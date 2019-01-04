const Token = artifacts.require("Token");
const InvestorList = artifacts.require("InvestorList");
const GNITokenCrowdsale = artifacts.require("GNITokenCrowdsale");
const GNITokenCrowdsaleMock = artifacts.require("GNITokenCrowdsaleMock");
const Dividends = artifacts.require("Dividends");
const Reimbursements = artifacts.require("Reimbursements");
const ProjectLeaderBoard = artifacts.require("ProjectLeaderBoard");
const ECRecovery = artifacts.require("ECRecovery");

let tokenInstance;

module.exports = function (deployer, network, accounts) {
    const rate = 10000;
    const developer = accounts[0];

    return deployer
        .then(() => {
          return deployer.deploy(InvestorList);
        })
        .then(() => {
          console.log('INVESTOR LIST', InvestorList.address);
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
        .then(() => {
          return deployer.deploy(
            Reimbursements,
            Token.address
          )
        })
        .then(() => {
          return deployer.deploy(
            ProjectLeaderBoard
          )
        })
        .then(() => {
          return deployer.deploy(ECRecovery);
        })
        .then(() => {
          return deployer.link(ECRecovery, GNITokenCrowdsale);
        })
        .then(() => {
          return deployer.link(ECRecovery, GNITokenCrowdsaleMock);
        })
        .then(() => { // establish start time variable
            return new Promise((resolve, reject) => {
                web3.eth.getBlock('latest', (err, time) => {
                    if (err) reject();
                    const openingTime = time.timestamp + 50;
                    resolve(openingTime);
                })
            })
        })
        .then((openingTime) => { // deploy the crowdsale (token functionality)
            console.log('DEVELOPER', developer);
            console.log('OPENING TIME', openingTime);
            const doomsDay = openingTime + 86400 * 240; // 240 days
            console.log('DOOMS DAY', doomsDay);
            console.log('RATE', rate);
            console.log('DIVIDENDS', Dividends.address);
            console.log("TOKEN", Token.address);
            console.log("INVESTOR LIST", InvestorList.address);
            return deployer.deploy(
                GNITokenCrowdsale,
                openingTime,
                doomsDay,
                rate,
                developer,
                Dividends.address,
                Token.address,
                InvestorList.address,
                ProjectLeaderBoard.address,
                Reimbursements.address
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
        .then(() => {
          const projectLeaderBoardInst = ProjectLeaderBoard.at(ProjectLeaderBoard.address);
          return projectLeaderBoardInst.transferOwnership(GNITokenCrowdsale.address);
        })
        .then(() => {
          return tokenInstance.transferOwnership(GNITokenCrowdsale.address);
        });
};
