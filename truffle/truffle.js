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

var HDWalletProvider = require("truffle-hdwallet-provider");

var infura_apikey = "32d629913620458ea1049490da4906b1";
var mnemonic = "leaf oak make armed infant basic cup music beauty police urban double";


module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!

  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*", // Match any network id
<<<<<<< HEAD
      gas: 4600000
    },
    ropsten: {
         provider: () => new HDWalletProvider(process.env.MNEMONIC, "https://ropsten.infura.io/v3/" + process.env.INFURA_API_KEY),
         network_id: 3,
         gas: 5000000  
      }
  }
};
=======
      gamLimit: 10000000
    }
  }
};


//4f879311fa96bf6cce1ec675c47a53845b1b8e28 - public address
>>>>>>> a369a916a52f4a344302892be936624e2ecfad5f
