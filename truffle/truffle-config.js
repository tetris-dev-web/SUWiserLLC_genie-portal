/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() {
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>')
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */
const HDWalletProvider = require('truffle-hdwallet-provider');
require('dotenv').config();
// const privateKeys = [process.env.PRIVATE_KEY, process.env.PRIVATE_KEY1, process.env.PRIVATE_KEY2];
const privateKeys = ['1621fd8e799e9f8491debf014ff28dd3b5c3dc899e220f157441a05f0ed6550c'];
//
// var HDWalletProvider = require("truffle-hdwallet-provider");
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(
          process.env.PRIVATE_KEY,
          "https://ropsten.infura.io/v3/" + "27aa9fbf74164ddca2339562d9b6c1de",
          0,
          1
        );
      },
      network_id: 3, // Ropsten's id
      gas: 4500000, // Ropsten has a lower block limit than mainnet
      gasPrice: 10000000000,      
      skipDryRun: true
    }
  }
};
// module.exports = {
//   // See <http://truffleframework.com/docs/advanced/configuration>
//   // to customize your Truffle configuration!

//   compilers: {
//     solc: {
//       version: '0.4.25',
//     },
//   },
//   networks: {
//     development: {
//       host: 'localhost',
//       port: 8545,
//       network_id: '*', // Match any network id
//       gasLimit: 10000000,
//     },
//     //developer
//     ropsten: {
//       provider: () =>
//         new HDWalletProvider(
//           privateKeys,
//           'https://ropsten.infura.io/v3/' + process.env.INFURA_API_KEY,
//           0,
//         ),
//       network_id: 3,
//       gas: 4500000,
//       gasPrice: 10000000000,
//     },
//     //investors
//     seedInvestor1: {
//       provider: () =>
//         new HDWalletProvider(
//           privateKeys,
//           'https://ropsten.infura.io/v3/' + process.env.INFURA_API_KEY,
//           1,
//         ),
//       network_id: 3,
//       gas: 4500000,
//       gasPrice: 10000000000,
//     },
//     seedInvestor2: {
//       provider: () =>
//         new HDWalletProvider(
//           privateKeys,
//           'https://ropsten.infura.io/v3/' + process.env.INFURA_API_KEY,
//           2,
//         ),
//       network_id: 3,
//       gas: 4500000,
//       gasPrice: 10000000000,
//     },
//     solc: {
//       optimizer: {
//         enabled: true,
//         runs: 200,
//       },
//     },
//   },
// };
