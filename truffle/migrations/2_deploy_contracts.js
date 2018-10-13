const Escrow = artifacts.require("Escrow");
const Token = artifacts.require("Token");
const GNITokenCrowdsale = artifacts.require("GNITokenCrowdsale");

module.exports = function (deployer, network, accounts) {
    const rate = new web3.BigNumber(50);
    const wallet = accounts[1];
    const cap = 100;  //dollars

    return deployer
        .then(() => { // deploy token
            return deployer.deploy(Token);
        })
        .then(()=>{
          return deployer.deploy(Escrow, Token.address);
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
            const closingTime = openingTime + 86400 * 240; // 240 days
            return deployer.deploy(
                GNITokenCrowdsale,
                openingTime,
                closingTime,
                rate,
                wallet,
                Token.address
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
};
