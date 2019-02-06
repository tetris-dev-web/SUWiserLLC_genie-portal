const Token = artifacts.require("Token");
// const InvestorList = artifacts.require("InvestorList");
const GNITokenCrowdsale = artifacts.require("GNITokenCrowdsale");
const SeedableCrowdsale = artifacts.require("SeedableCrowdsale");
const GNITokenCrowdsaleMock = artifacts.require("GNITokenCrowdsaleMock");
const Dividends = artifacts.require("Dividends");
const Reimbursements = artifacts.require("Reimbursements");
const ProjectLeaderTracker = artifacts.require("ProjectLeaderTracker");
const ECRecovery = artifacts.require("ECRecovery");
const Voting = artifacts.require("Voting");
const SeedableVoting = artifacts.require("SeedableVoting");
const { seed } = require('../seeds');

let tokenInstance;
let votingInstance;
let crowdsaleInstance;

module.exports = function (deployer, network, accounts) {
  console.log("NETWORK", network)
    const rate = 1000; //changed this to 1 from 10000 (subject to change still)
    const developer = accounts[0];  //will need to make this variable and import from the interface on first deployment of a developer's site (Progeny)

    return deployer
        .then(() => {
          return deployer.deploy(Token);
        })
        .then(() => {
          return deployer.deploy(
            Dividends,
            Token.address,
            developer
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
            ProjectLeaderTracker
          )
        })
        .then(() => {
          return deployer.deploy(ECRecovery);
        })
        .then(() => {
          if (network === 'ropsten') {
            return deployer.link(ECRecovery, SeedableVoting)
          }
          return deployer.link(ECRecovery, Voting)
        })
        .then(() => {
          if(network === 'ropsten') {
            return deployer.deploy(SeedableVoting, Token.address, ProjectLeaderTracker.address);
          }
          return deployer.deploy(Voting, Token.address, ProjectLeaderTracker.address);
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
        .then((openingTime) => {
          const doomsDay = openingTime + 86400 * 240; // 240 days
          const votingAddr = network === 'ropsten' ? SeedableVoting.address : Voting.address
          if (network === 'ropsten') {
            return deployer.deploy(
                SeedableCrowdsale,
                openingTime,
                doomsDay,
                rate,
                developer,
                Dividends.address,
                Token.address,
                ProjectLeaderTracker.address,
                Reimbursements.address,
                votingAddr
            );
          }
            return deployer.deploy(
                GNITokenCrowdsale,
                openingTime,
                doomsDay,
                rate,
                developer,
                Dividends.address,
                Token.address,
                ProjectLeaderTracker.address,
                Reimbursements.address,
                votingAddr
            );
        }) //organize around seeding, ownership designation and contract instanciation / contract references
        .then(() => {
          return network === 'ropsten' ?  SeedableCrowdsale.at(SeedableCrowdsale.address) : GNITokenCrowdsale.at(GNITokenCrowdsale.address);
        })
        .then(_crowdsaleInstance => {
          crowdsaleInstance = _crowdsaleInstance
        })
        .then(() => {
          return Token.at(Token.address);
        })
        .then(_tokenInstance => {
          tokenInstance = _tokenInstance;
          return tokenInstance.initializeDividendWallet(Dividends.address);
        })
        .then(() => {
          return network === 'ropsten' ? SeedableVoting.at(SeedableVoting.address) : Voting.at(Voting.address);
        })
        .then(_votingInstance => {
          votingInstance = _votingInstance;
          return votingInstance.transferOwnership(crowdsaleInstance.address);
        })
        .then(() => {
          return ProjectLeaderTracker.at(ProjectLeaderTracker.address);
        })
        .then(_projectLeaderTrackerInst => {
          const projectLeaderTrackerInst = _projectLeaderTrackerInst;
          return projectLeaderTrackerInst.transferOwnership(crowdsaleInstance.address);
        })
        .then(() => {
          return tokenInstance.transferOwnership(crowdsaleInstance.address);
        })
        .then(() => {
          return tokenInstance.transferPrimary(votingInstance.address);
        })
        .then(() => {
          return Reimbursements.at(Reimbursements.address);
        })
        .then(reimbursementsInst => {
          return reimbursementsInst.transferOwnership(crowdsaleInstance.address);
        })
        .then(() => {
          if (network === 'ropsten') {
            // console.log("voting", votingInstance)
            return seed(crowdsaleInstance, tokenInstance, votingInstance, developer, accounts[1], accounts[2]);
          }
        })

};
// .then(() => {
//   investorListInst = InvestorList.at(InvestorList.address);
//   return investorListInst.transferOwnership(GNITokenCrowdsale.address);
// })
// .then(() => {
//   return investorListInst.transferPrimary(Token.address);
// })
// console.log('DEVELOPER', developer);
// console.log('OPENING TIME', openingTime);
// console.log('DOOMS DAY', doomsDay);
// console.log('RATE', rate);
// console.log('DIVIDENDS', Dividends.address);
// console.log("TOKEN", Token.address);
// console.log("INVESTOR LIST", InvestorList.address);
