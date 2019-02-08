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
const HDWalletProvider = require("truffle-hdwallet-provider");
require('dotenv').config();
//
// var HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!

  compilers: {
    solc: {
      version: "0.4.25"
    }
  },
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*", // Match any network id
      gasLimit: 10000000
    },
    // rinkeby: {
    //   provider: () => new HDWalletProvider(process.env.MNEMONIC, "https://ropsten.infura.io/v3/" + process.env.INFURA_API_KEY),
    //   network_id: 4,
    //   gas: 7000000,
    //   gasPrice: 10000000000
    // },
    ropsten: {
         provider: () => new HDWalletProvider(process.env.MNEMONIC, "https://ropsten.infura.io/v3/" + process.env.INFURA_API_KEY),
         network_id: 3,
         gas: 4500000,
         gasPrice: 10000000000
      },
      solc: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
  }
};
