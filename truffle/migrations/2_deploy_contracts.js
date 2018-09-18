const MyStringStore = artifacts.require("MyStringStore");
const GNIToken = artifacts.require("GNIToken");
const GNITokenCrowdsale = artifacts.require("GNITokenCrowdsale");

module.exports = function (deployer, network, accounts) {
    const rate = new web3.BigNumber(1);
    const wallet = accounts[0];

    return deployer
        .then(() => { // deploy token
            return deployer.deploy(GNIToken);
        })
        .then(()=>{
            return deployer.deploy(MyStringStore);
        })
        .then(() => { // establish start time variable
            return new Promise((resolve, reject) => {
                web3.eth.getBlock('latest', (err, time) => {
                    if (err) reject();
                    const openingTime = time.timestamp + 200;
                    resolve(openingTime);
                })
            })
        })
        .then((openingTime) => { // deploy the crowdsale (token functionality)
            const closingTime = openingTime + 86400 * 240; // 240 days
            return deployer.deploy(
                GNITokenCrowdsale,
                openingTime,
                closingTime,
                rate,
                wallet,
                GNIToken.address
            );
        })
        .then(() => { // giving the crowdsale ownership over the token
            return GNITokenCrowdsale.deployed().then(crowdsale => {
                crowdsale.token().then(tokenAddress => {
                    const GNITokenInstance = GNIToken.at(tokenAddress);
                    GNITokenInstance.transferOwnership(crowdsale.address).then(output => {
                    })
                })
            }).catch(err => {
                console.log(err);
            })
        });
};
