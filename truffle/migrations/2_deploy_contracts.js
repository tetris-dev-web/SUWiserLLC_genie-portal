const ActiveToken = artifacts.require("ActiveToken");
const GNITokenCrowdsale = artifacts.require("GNITokenCrowdsale");
const MyStringStore = artifacts.require("MyStringStore");
const Dividend = artifacts.require("Dividend");

module.exports = function (deployer, network, accounts) {
    const rate = new web3.BigNumber(50);
    const developer = accounts[1];

    return deployer
        .then(() => {
          return deployer.deploy(ActiveToken);
        })
        .then(() => {
          return deployer.deploy(MyStringStore);
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
                ActiveToken.address
            );
        })
        // .then(() => { // giving the crowdsale ownership over the token
        //     return GNITokenCrowdsale.deployed().then(crowdsale => {
        //         crowdsale.token().then(tokenAddress => {
        //             const GNITokenInstance = GNIToken.at(tokenAddress);
        //             GNITokenInstance.transferOwnership(crowdsale.address).then(output => {
        //             })
        //         })
        //     }).catch(err => {
        //         console.log(err);
        //     })
        // });
        .then(() => {
          return deployer.deploy(
            Dividend,
            ActiveToken.address,
            GNITokenCrowdsale.address,
            developer
          );
        })
};
