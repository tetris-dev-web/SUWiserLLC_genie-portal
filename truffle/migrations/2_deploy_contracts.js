const Token = artifacts.require("Token");
const TokenMock = artifacts.require("TokenMock");
const InvestorList = artifacts.require("InvestorList");
const InvestorListMock = artifacts.require("InvestorListMock");
const InvestorListStub = artifacts.require("InvestorListStub");
const GNITokenCrowdsale = artifacts.require("GNITokenCrowdsale");
const MyStringStore = artifacts.require("MyStringStore");
const Dividends = artifacts.require("Dividends");

module.exports = function (deployer, network, accounts) {
    const rate = 10000;
    const developer = accounts[1];
    console.log('hellllloooo');

    return deployer
        .then(() => {
          return deployer.deploy(InvestorListStub);
        })
        .then(() => {
          console.log('address:');
          return deployer.deploy(TokenMock, InvestorListStub.address);
        })
        // .then(() => {
        //   return deployer.deploy(MyStringStore);
        // })
        // .then(() => {
        //   return deployer.deploy(InvestorList);
        // })
        // .then(() => {
        //   return deployer.deploy(InvestorListMock);
        // })
        // .then(() => {
        //   return deployer.deploy(Token, InvestorList.address);
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
        // .then((openingTime) => { // deploy the crowdsale (token functionality)
        //   console.log('address1:', InvestorList.address);
        //     const doomsDay = openingTime + 86400 * 240; // 240 days
        //     return deployer.deploy(
        //         GNITokenCrowdsale,
        //         openingTime,
        //         doomsDay,
        //         rate,
        //         developer,
        //         Token.address,
        //         InvestorList.address
        //     );
        // })
        // // .then(() => { // giving the crowdsale ownership over the token
        // //     return GNITokenCrowdsale.deployed().then(crowdsale => {
        // //         crowdsale.inactiveToken_().then(inactiveAddress => {
        // //             const InactiveTokenInstance = GNIToken.at(inactiveAddress);
        // //             InactiveTokenInstance.transferOwnership(crowdsale.address).then(output => {
        // //             })
        // //         })
        // //     }).catch(err => {
        // //         console.log(err);
        // //     })
        // // })
        // // .then(() => { // giving the crowdsale ownership over the token
        // //     return GNITokenCrowdsale.deployed().then(crowdsale => {
        // //         crowdsale.activeToken_().then(activeAddress => {
        // //             const activeTokenInstance = GNIToken.at(activeAddress);
        // //             activeTokenInstance.transferOwnership(crowdsale.address).then(output => {
        // //             })
        // //         })
        // //     }).catch(err => {
        // //         console.log(err);
        // //     })
        // // });
        // .then(() => {
        //   return deployer.deploy(
        //     Dividends,
        //     Token.address,
        //     GNITokenCrowdsale.address,
        //     developer,
        //     InvestorList.address
        //   );
        // })
};
