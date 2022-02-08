const data = {
  "contractName": "GNIToken",
  "abi": [
    {
      "constant": true,
      "inputs": [],
      "name": "mintingFinished",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_spender",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_from",
          "type": "address"
        },
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "INITIAL_SUPPLY",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "mint",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_spender",
          "type": "address"
        },
        {
          "name": "_subtractedValue",
          "type": "uint256"
        }
      ],
      "name": "decreaseApproval",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "finishMinting",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_spender",
          "type": "address"
        },
        {
          "name": "_addedValue",
          "type": "uint256"
        }
      ],
      "name": "increaseApproval",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        },
        {
          "name": "_spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Mint",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [],
      "name": "MintFinished",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "logOwner",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "previousOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipRenounced",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    }
  ],
  "bytecode": "0x60806040526000600360146101000a81548160ff0219169083151502179055506040805190810160405280600381526020017f474e490000000000000000000000000000000000000000000000000000000000815250600490805190602001906200006c9291906200011a565b50601260055560006006553480156200008457600080fd5b5033600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506006546001819055506006546000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550620001c9565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200015d57805160ff19168380011785556200018e565b828001600101855582156200018e579182015b828111156200018d57825182559160200191906001019062000170565b5b5090506200019d9190620001a1565b5090565b620001c691905b80821115620001c2576000816000905550600101620001a8565b5090565b90565b6119aa80620001d96000396000f3006080604052600436106100f1576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806305d2035b146100f6578063095ea7b31461012557806318160ddd1461018a57806323b872dd146101b55780632ff2e9dc1461023a578063313ce5671461026557806340c10f191461029057806366188463146102f557806370a082311461035a578063715018a6146103b15780637d64bcb4146103c85780638da5cb5b146103f757806395d89b411461044e578063a9059cbb146104de578063d73dd62314610543578063dd62ed3e146105a8578063f2fde38b1461061f575b600080fd5b34801561010257600080fd5b5061010b610662565b604051808215151515815260200191505060405180910390f35b34801561013157600080fd5b50610170600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610675565b604051808215151515815260200191505060405180910390f35b34801561019657600080fd5b5061019f610767565b6040518082815260200191505060405180910390f35b3480156101c157600080fd5b50610220600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610771565b604051808215151515815260200191505060405180910390f35b34801561024657600080fd5b5061024f610b2c565b6040518082815260200191505060405180910390f35b34801561027157600080fd5b5061027a610b32565b6040518082815260200191505060405180910390f35b34801561029c57600080fd5b506102db600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610b38565b604051808215151515815260200191505060405180910390f35b34801561030157600080fd5b50610340600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610dd7565b604051808215151515815260200191505060405180910390f35b34801561036657600080fd5b5061039b600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611069565b6040518082815260200191505060405180910390f35b3480156103bd57600080fd5b506103c66110b1565b005b3480156103d457600080fd5b506103dd6111b6565b604051808215151515815260200191505060405180910390f35b34801561040357600080fd5b5061040c61127e565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561045a57600080fd5b506104636112a4565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156104a3578082015181840152602081019050610488565b50505050905090810190601f1680156104d05780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3480156104ea57600080fd5b50610529600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050611342565b604051808215151515815260200191505060405180910390f35b34801561054f57600080fd5b5061058e600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050611562565b604051808215151515815260200191505060405180910390f35b3480156105b457600080fd5b50610609600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061175e565b6040518082815260200191505060405180910390f35b34801561062b57600080fd5b50610660600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506117e5565b005b600360149054906101000a900460ff1681565b600081600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b6000600154905090565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205482111515156107c057600080fd5b600260008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054821115151561084b57600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415151561088757600080fd5b6108d8826000808773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461184d90919063ffffffff16565b6000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555061096b826000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461186690919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610a3c82600260008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461184d90919063ffffffff16565b600260008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190509392505050565b60065481565b60055481565b60007f8208a9d9fd4f0333d9aca5b0f17d56c322d5319c260df033c97a5de25a303990600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1633604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a1600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610c4f57600080fd5b600360149054906101000a900460ff16151515610c6b57600080fd5b610c808260015461186690919063ffffffff16565b600181905550610cd7826000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461186690919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff167f0f6798a560793a54c3bcfe86a93cde1e73087d944c0ea20544137d4121396885836040518082815260200191505060405180910390a28273ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a36001905092915050565b600080600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490508083101515610ee9576000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610f7d565b610efc838261184d90919063ffffffff16565b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505b8373ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546040518082815260200191505060405180910390a3600191505092915050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561110d57600080fd5b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482060405160405180910390a26000600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561121457600080fd5b600360149054906101000a900460ff1615151561123057600080fd5b6001600360146101000a81548160ff0219169083151502179055507fae5184fba832cb2b1f702aca6117b8d265eaf03ad33eb133f19dde0f5920fa0860405160405180910390a16001905090565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60048054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561133a5780601f1061130f5761010080835404028352916020019161133a565b820191906000526020600020905b81548152906001019060200180831161131d57829003601f168201915b505050505081565b60008060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054821115151561139157600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141515156113cd57600080fd5b61141e826000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461184d90919063ffffffff16565b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506114b1826000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461186690919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a36001905092915050565b60006115f382600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461186690919063ffffffff16565b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546040518082815260200191505060405180910390a36001905092915050565b6000600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561184157600080fd5b61184a81611882565b50565b600082821115151561185b57fe5b818303905092915050565b6000818301905082811015151561187957fe5b80905092915050565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141515156118be57600080fd5b8073ffffffffffffffffffffffffffffffffffffffff16600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a380600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505600a165627a7a72305820b9acdf23faae8fee4ef1beadea8a6b78688704b9a4da736b3b9757b9a8626d4e0029",
  "deployedBytecode": "0x6080604052600436106100f1576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806305d2035b146100f6578063095ea7b31461012557806318160ddd1461018a57806323b872dd146101b55780632ff2e9dc1461023a578063313ce5671461026557806340c10f191461029057806366188463146102f557806370a082311461035a578063715018a6146103b15780637d64bcb4146103c85780638da5cb5b146103f757806395d89b411461044e578063a9059cbb146104de578063d73dd62314610543578063dd62ed3e146105a8578063f2fde38b1461061f575b600080fd5b34801561010257600080fd5b5061010b610662565b604051808215151515815260200191505060405180910390f35b34801561013157600080fd5b50610170600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610675565b604051808215151515815260200191505060405180910390f35b34801561019657600080fd5b5061019f610767565b6040518082815260200191505060405180910390f35b3480156101c157600080fd5b50610220600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610771565b604051808215151515815260200191505060405180910390f35b34801561024657600080fd5b5061024f610b2c565b6040518082815260200191505060405180910390f35b34801561027157600080fd5b5061027a610b32565b6040518082815260200191505060405180910390f35b34801561029c57600080fd5b506102db600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610b38565b604051808215151515815260200191505060405180910390f35b34801561030157600080fd5b50610340600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610dd7565b604051808215151515815260200191505060405180910390f35b34801561036657600080fd5b5061039b600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611069565b6040518082815260200191505060405180910390f35b3480156103bd57600080fd5b506103c66110b1565b005b3480156103d457600080fd5b506103dd6111b6565b604051808215151515815260200191505060405180910390f35b34801561040357600080fd5b5061040c61127e565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561045a57600080fd5b506104636112a4565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156104a3578082015181840152602081019050610488565b50505050905090810190601f1680156104d05780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3480156104ea57600080fd5b50610529600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050611342565b604051808215151515815260200191505060405180910390f35b34801561054f57600080fd5b5061058e600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050611562565b604051808215151515815260200191505060405180910390f35b3480156105b457600080fd5b50610609600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061175e565b6040518082815260200191505060405180910390f35b34801561062b57600080fd5b50610660600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506117e5565b005b600360149054906101000a900460ff1681565b600081600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b6000600154905090565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205482111515156107c057600080fd5b600260008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054821115151561084b57600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415151561088757600080fd5b6108d8826000808773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461184d90919063ffffffff16565b6000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555061096b826000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461186690919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610a3c82600260008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461184d90919063ffffffff16565b600260008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190509392505050565b60065481565b60055481565b60007f8208a9d9fd4f0333d9aca5b0f17d56c322d5319c260df033c97a5de25a303990600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1633604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a1600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610c4f57600080fd5b600360149054906101000a900460ff16151515610c6b57600080fd5b610c808260015461186690919063ffffffff16565b600181905550610cd7826000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461186690919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff167f0f6798a560793a54c3bcfe86a93cde1e73087d944c0ea20544137d4121396885836040518082815260200191505060405180910390a28273ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a36001905092915050565b600080600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490508083101515610ee9576000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610f7d565b610efc838261184d90919063ffffffff16565b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505b8373ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546040518082815260200191505060405180910390a3600191505092915050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561110d57600080fd5b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482060405160405180910390a26000600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561121457600080fd5b600360149054906101000a900460ff1615151561123057600080fd5b6001600360146101000a81548160ff0219169083151502179055507fae5184fba832cb2b1f702aca6117b8d265eaf03ad33eb133f19dde0f5920fa0860405160405180910390a16001905090565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60048054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561133a5780601f1061130f5761010080835404028352916020019161133a565b820191906000526020600020905b81548152906001019060200180831161131d57829003601f168201915b505050505081565b60008060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054821115151561139157600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141515156113cd57600080fd5b61141e826000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461184d90919063ffffffff16565b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506114b1826000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461186690919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a36001905092915050565b60006115f382600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461186690919063ffffffff16565b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546040518082815260200191505060405180910390a36001905092915050565b6000600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561184157600080fd5b61184a81611882565b50565b600082821115151561185b57fe5b818303905092915050565b6000818301905082811015151561187957fe5b80905092915050565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141515156118be57600080fd5b8073ffffffffffffffffffffffffffffffffffffffff16600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a380600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505600a165627a7a72305820b9acdf23faae8fee4ef1beadea8a6b78688704b9a4da736b3b9757b9a8626d4e0029",
  "sourceMap": "103:315:19:-;;;464:5:12;434:35;;;;;;;;;;;;;;;;;;;;214:28:19;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;272:2;246:28;;307:1;278:30;;315:100;8:9:-1;5:2;;;30:1;27;20:12;5:2;315:100:19;575:10:21;567:5;;:18;;;;;;;;;;;;;;;;;;355:14:19;;340:12;:29;;;;396:14;;373:8;:20;382:10;373:20;;;;;;;;;;;;;;;:37;;;;103:315;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;",
  "deployedSourceMap": "103:315:19:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;434:35:12;;8:9:-1;5:2;;;30:1;27;20:12;5:2;434:35:12;;;;;;;;;;;;;;;;;;;;;;;;;;;1814:188:16;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1814:188:16;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;392:83:6;;8:9:-1;5:2;;;30:1;27;20:12;5:2;392:83:6;;;;;;;;;;;;;;;;;;;;;;;726:470:16;;8:9:-1;5:2;;;30:1;27;20:12;5:2;726:470:16;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;278:30:19;;8:9:-1;5:2;;;30:1;27;20:12;5:2;278:30:19;;;;;;;;;;;;;;;;;;;;;;;246:28;;8:9:-1;5:2;;;30:1;27;20:12;5:2;246:28:19;;;;;;;;;;;;;;;;;;;;;;;959:312:12;;8:9:-1;5:2;;;30:1;27;20:12;5:2;959:312:12;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;3679:432:16;;8:9:-1;5:2;;;30:1;27;20:12;5:2;3679:432:16;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1152:99:6;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1152:99:6;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1001:111:21;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1001:111:21;;;;;;1385:140:12;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1385:140:12;;;;;;;;;;;;;;;;;;;;;;;;;;;238:20:21;;8:9:-1;5:2;;;30:1;27;20:12;5:2;238:20:21;;;;;;;;;;;;;;;;;;;;;;;;;;;214:28:19;;8:9:-1;5:2;;;30:1;27;20:12;5:2;214:28:19;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;99:1;94:3;90:11;84:18;80:1;75:3;71:11;64:39;52:2;49:1;45:10;40:15;;8:100;;;12:14;214:28:19;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;629:321:6;;8:9:-1;5:2;;;30:1;27;20:12;5:2;629:321:6;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2926:296:16;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2926:296:16;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2321:153;;8:9:-1;5:2;;;30:1;27;20:12;5:2;2321:153:16;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1274:103:21;;8:9:-1;5:2;;;30:1;27;20:12;5:2;1274:103:21;;;;;;;;;;;;;;;;;;;;;;;;;;;;434:35:12;;;;;;;;;;;;;:::o;1814:188:16:-;1881:4;1925:6;1893:7;:19;1901:10;1893:19;;;;;;;;;;;;;;;:29;1913:8;1893:29;;;;;;;;;;;;;;;:38;;;;1963:8;1942:38;;1951:10;1942:38;;;1973:6;1942:38;;;;;;;;;;;;;;;;;;1993:4;1986:11;;1814:188;;;;:::o;392:83:6:-;436:7;458:12;;451:19;;392:83;:::o;726:470:16:-;832:4;864:8;:15;873:5;864:15;;;;;;;;;;;;;;;;854:6;:25;;846:34;;;;;;;;904:7;:14;912:5;904:14;;;;;;;;;;;;;;;:26;919:10;904:26;;;;;;;;;;;;;;;;894:6;:36;;886:45;;;;;;;;960:1;945:17;;:3;:17;;;;937:26;;;;;;;;988:27;1008:6;988:8;:15;997:5;988:15;;;;;;;;;;;;;;;;:19;;:27;;;;:::i;:::-;970:8;:15;979:5;970:15;;;;;;;;;;;;;;;:45;;;;1037:25;1055:6;1037:8;:13;1046:3;1037:13;;;;;;;;;;;;;;;;:17;;:25;;;;:::i;:::-;1021:8;:13;1030:3;1021:13;;;;;;;;;;;;;;;:41;;;;1097:38;1128:6;1097:7;:14;1105:5;1097:14;;;;;;;;;;;;;;;:26;1112:10;1097:26;;;;;;;;;;;;;;;;:30;;:38;;;;:::i;:::-;1068:7;:14;1076:5;1068:14;;;;;;;;;;;;;;;:26;1083:10;1068:26;;;;;;;;;;;;;;;:67;;;;1162:3;1146:28;;1155:5;1146:28;;;1167:6;1146:28;;;;;;;;;;;;;;;;;;1187:4;1180:11;;726:470;;;;;:::o;278:30:19:-;;;;:::o;246:28::-;;;;:::o;959:312:12:-;1073:4;651:26;660:5;;;;;;;;;;;666:10;651:26;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;705:5;;;;;;;;;;;691:19;;:10;:19;;;683:28;;;;;;;;579:15;;;;;;;;;;;578:16;570:25;;;;;;;;1102;1119:7;1102:12;;:16;;:25;;;;:::i;:::-;1087:12;:40;;;;1149:26;1167:7;1149:8;:13;1158:3;1149:13;;;;;;;;;;;;;;;;:17;;:26;;;;:::i;:::-;1133:8;:13;1142:3;1133:13;;;;;;;;;;;;;;;:42;;;;1191:3;1186:18;;;1196:7;1186:18;;;;;;;;;;;;;;;;;;1236:3;1215:34;;1232:1;1215:34;;;1241:7;1215:34;;;;;;;;;;;;;;;;;;1262:4;1255:11;;959:312;;;;:::o;3679:432:16:-;3785:4;3799:16;3818:7;:19;3826:10;3818:19;;;;;;;;;;;;;;;:29;3838:8;3818:29;;;;;;;;;;;;;;;;3799:48;;3877:8;3857:16;:28;;3853:165;;;3927:1;3895:7;:19;3903:10;3895:19;;;;;;;;;;;;;;;:29;3915:8;3895:29;;;;;;;;;;;;;;;:33;;;;3853:165;;;3981:30;3994:16;3981:8;:12;;:30;;;;:::i;:::-;3949:7;:19;3957:10;3949:19;;;;;;;;;;;;;;;:29;3969:8;3949:29;;;;;;;;;;;;;;;:62;;;;3853:165;4049:8;4028:61;;4037:10;4028:61;;;4059:7;:19;4067:10;4059:19;;;;;;;;;;;;;;;:29;4079:8;4059:29;;;;;;;;;;;;;;;;4028:61;;;;;;;;;;;;;;;;;;4102:4;4095:11;;3679:432;;;;;:::o;1152:99:6:-;1208:7;1230:8;:16;1239:6;1230:16;;;;;;;;;;;;;;;;1223:23;;1152:99;;;:::o;1001:111:21:-;719:5;;;;;;;;;;;705:19;;:10;:19;;;697:28;;;;;;;;1077:5;;;;;;;;;;;1058:25;;;;;;;;;;;;1105:1;1089:5;;:18;;;;;;;;;;;;;;;;;;1001:111::o;1385:140:12:-;1444:4;719:5:21;;;;;;;;;;;705:19;;:10;:19;;;697:28;;;;;;;;579:15:12;;;;;;;;;;;578:16;570:25;;;;;;;;1474:4;1456:15;;:22;;;;;;;;;;;;;;;;;;1489:14;;;;;;;;;;1516:4;1509:11;;1385:140;:::o;238:20:21:-;;;;;;;;;;;;;:::o;214:28:19:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;629:321:6:-;692:4;722:8;:20;731:10;722:20;;;;;;;;;;;;;;;;712:6;:30;;704:39;;;;;;;;772:1;757:17;;:3;:17;;;;749:26;;;;;;;;805:32;830:6;805:8;:20;814:10;805:20;;;;;;;;;;;;;;;;:24;;:32;;;;:::i;:::-;782:8;:20;791:10;782:20;;;;;;;;;;;;;;;:55;;;;859:25;877:6;859:8;:13;868:3;859:13;;;;;;;;;;;;;;;;:17;;:25;;;;:::i;:::-;843:8;:13;852:3;843:13;;;;;;;;;;;;;;;:41;;;;916:3;895:33;;904:10;895:33;;;921:6;895:33;;;;;;;;;;;;;;;;;;941:4;934:11;;629:321;;;;:::o;2926:296:16:-;3027:4;3081:46;3115:11;3081:7;:19;3089:10;3081:19;;;;;;;;;;;;;;;:29;3101:8;3081:29;;;;;;;;;;;;;;;;:33;;:46;;;;:::i;:::-;3041:7;:19;3049:10;3041:19;;;;;;;;;;;;;;;:29;3061:8;3041:29;;;;;;;;;;;;;;;:87;;;;3160:8;3139:61;;3148:10;3139:61;;;3170:7;:19;3178:10;3170:19;;;;;;;;;;;;;;;:29;3190:8;3170:29;;;;;;;;;;;;;;;;3139:61;;;;;;;;;;;;;;;;;;3213:4;3206:11;;2926:296;;;;:::o;2321:153::-;2420:7;2444;:15;2452:6;2444:15;;;;;;;;;;;;;;;:25;2460:8;2444:25;;;;;;;;;;;;;;;;2437:32;;2321:153;;;;:::o;1274:103:21:-;719:5;;;;;;;;;;;705:19;;:10;:19;;;697:28;;;;;;;;1343:29;1362:9;1343:18;:29::i;:::-;1274:103;:::o;1060:116:23:-;1120:7;1148:2;1142;:8;;1135:16;;;;;;1169:2;1164;:7;1157:14;;1060:116;;;;:::o;1238:128::-;1298:9;1324:2;1319;:7;1315:11;;1344:2;1339:1;:7;;1332:15;;;;;;1360:1;1353:8;;1238:128;;;;:::o;1512:171:21:-;1603:1;1582:23;;:9;:23;;;;1574:32;;;;;;;;1645:9;1617:38;;1638:5;;;;;;;;;;;1617:38;;;;;;;;;;;;1669:9;1661:5;;:17;;;;;;;;;;;;;;;;;;1512:171;:::o",
  "source": "pragma solidity 0.4.24;\n\nimport '../token/ERC20/MintableToken.sol';\nimport '../utility/SafeMath.sol';\n\ncontract GNIToken is MintableToken {\n  using SafeMath for uint256;\n\n  /* string public name = \"GNIToken\"; */\n  string public symbol = \"GNI\";\n  uint256 public decimals = 18;\n  uint public INITIAL_SUPPLY = 0;\n\n\n\n  constructor() public {\n  totalSupply_ = INITIAL_SUPPLY;\n  balances[msg.sender] = INITIAL_SUPPLY;\n  }\n\n}\n",
  "sourcePath": "/Users/steven/genie-portal/truffle/contracts/token/GNIToken.sol",
  "ast": {
    "absolutePath": "/Users/steven/genie-portal/truffle/contracts/token/GNIToken.sol",
    "exportedSymbols": {
      "GNIToken": [
        1825
      ]
    },
    "id": 1826,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1793,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:23:19"
      },
      {
        "absolutePath": "/Users/steven/genie-portal/truffle/contracts/token/ERC20/MintableToken.sol",
        "file": "../token/ERC20/MintableToken.sol",
        "id": 1794,
        "nodeType": "ImportDirective",
        "scope": 1826,
        "sourceUnit": 990,
        "src": "25:42:19",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/steven/genie-portal/truffle/contracts/utility/SafeMath.sol",
        "file": "../utility/SafeMath.sol",
        "id": 1795,
        "nodeType": "ImportDirective",
        "scope": 1826,
        "sourceUnit": 2082,
        "src": "68:33:19",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 1796,
              "name": "MintableToken",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 989,
              "src": "124:13:19",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_MintableToken_$989",
                "typeString": "contract MintableToken"
              }
            },
            "id": 1797,
            "nodeType": "InheritanceSpecifier",
            "src": "124:13:19"
          }
        ],
        "contractDependencies": [
          642,
          839,
          871,
          989,
          1450,
          1927
        ],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": true,
        "id": 1825,
        "linearizedBaseContracts": [
          1825,
          989,
          1927,
          1450,
          642,
          839,
          871
        ],
        "name": "GNIToken",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 1800,
            "libraryName": {
              "contractScope": null,
              "id": 1798,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 2081,
              "src": "148:8:19",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$2081",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "142:27:19",
            "typeName": {
              "id": 1799,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "161:7:19",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "constant": false,
            "id": 1803,
            "name": "symbol",
            "nodeType": "VariableDeclaration",
            "scope": 1825,
            "src": "214:28:19",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_storage",
              "typeString": "string"
            },
            "typeName": {
              "id": 1801,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "214:6:19",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "474e49",
              "id": 1802,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "237:5:19",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_91caccd601834c4ea4b048fec0c1a0ec815bd2dc3e62a566d327def6412ca854",
                "typeString": "literal_string \"GNI\""
              },
              "value": "GNI"
            },
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 1806,
            "name": "decimals",
            "nodeType": "VariableDeclaration",
            "scope": 1825,
            "src": "246:28:19",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_uint256",
              "typeString": "uint256"
            },
            "typeName": {
              "id": 1804,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "246:7:19",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "3138",
              "id": 1805,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "number",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "272:2:19",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_rational_18_by_1",
                "typeString": "int_const 18"
              },
              "value": "18"
            },
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 1809,
            "name": "INITIAL_SUPPLY",
            "nodeType": "VariableDeclaration",
            "scope": 1825,
            "src": "278:30:19",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_uint256",
              "typeString": "uint256"
            },
            "typeName": {
              "id": 1807,
              "name": "uint",
              "nodeType": "ElementaryTypeName",
              "src": "278:4:19",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "30",
              "id": 1808,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "number",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "307:1:19",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_rational_0_by_1",
                "typeString": "int_const 0"
              },
              "value": "0"
            },
            "visibility": "public"
          },
          {
            "body": {
              "id": 1823,
              "nodeType": "Block",
              "src": "336:79:19",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1814,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 1812,
                      "name": "totalSupply_",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 561,
                      "src": "340:12:19",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 1813,
                      "name": "INITIAL_SUPPLY",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1809,
                      "src": "355:14:19",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "340:29:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 1815,
                  "nodeType": "ExpressionStatement",
                  "src": "340:29:19"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1821,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 1816,
                        "name": "balances",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 559,
                        "src": "373:8:19",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                          "typeString": "mapping(address => uint256)"
                        }
                      },
                      "id": 1819,
                      "indexExpression": {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1817,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2096,
                          "src": "382:3:19",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 1818,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "382:10:19",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "nodeType": "IndexAccess",
                      "src": "373:20:19",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 1820,
                      "name": "INITIAL_SUPPLY",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1809,
                      "src": "396:14:19",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "373:37:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 1822,
                  "nodeType": "ExpressionStatement",
                  "src": "373:37:19"
                }
              ]
            },
            "documentation": null,
            "id": 1824,
            "implemented": true,
            "isConstructor": true,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1810,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "326:2:19"
            },
            "payable": false,
            "returnParameters": {
              "id": 1811,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "336:0:19"
            },
            "scope": 1825,
            "src": "315:100:19",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 1826,
        "src": "103:315:19"
      }
    ],
    "src": "0:419:19"
  },
  "legacyAST": {
    "absolutePath": "/Users/steven/genie-portal/truffle/contracts/token/GNIToken.sol",
    "exportedSymbols": {
      "GNIToken": [
        1825
      ]
    },
    "id": 1826,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1793,
        "literals": [
          "solidity",
          "0.4",
          ".24"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:23:19"
      },
      {
        "absolutePath": "/Users/steven/genie-portal/truffle/contracts/token/ERC20/MintableToken.sol",
        "file": "../token/ERC20/MintableToken.sol",
        "id": 1794,
        "nodeType": "ImportDirective",
        "scope": 1826,
        "sourceUnit": 990,
        "src": "25:42:19",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "absolutePath": "/Users/steven/genie-portal/truffle/contracts/utility/SafeMath.sol",
        "file": "../utility/SafeMath.sol",
        "id": 1795,
        "nodeType": "ImportDirective",
        "scope": 1826,
        "sourceUnit": 2082,
        "src": "68:33:19",
        "symbolAliases": [],
        "unitAlias": ""
      },
      {
        "baseContracts": [
          {
            "arguments": null,
            "baseName": {
              "contractScope": null,
              "id": 1796,
              "name": "MintableToken",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 989,
              "src": "124:13:19",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_MintableToken_$989",
                "typeString": "contract MintableToken"
              }
            },
            "id": 1797,
            "nodeType": "InheritanceSpecifier",
            "src": "124:13:19"
          }
        ],
        "contractDependencies": [
          642,
          839,
          871,
          989,
          1450,
          1927
        ],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": true,
        "id": 1825,
        "linearizedBaseContracts": [
          1825,
          989,
          1927,
          1450,
          642,
          839,
          871
        ],
        "name": "GNIToken",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "id": 1800,
            "libraryName": {
              "contractScope": null,
              "id": 1798,
              "name": "SafeMath",
              "nodeType": "UserDefinedTypeName",
              "referencedDeclaration": 2081,
              "src": "148:8:19",
              "typeDescriptions": {
                "typeIdentifier": "t_contract$_SafeMath_$2081",
                "typeString": "library SafeMath"
              }
            },
            "nodeType": "UsingForDirective",
            "src": "142:27:19",
            "typeName": {
              "id": 1799,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "161:7:19",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            }
          },
          {
            "constant": false,
            "id": 1803,
            "name": "symbol",
            "nodeType": "VariableDeclaration",
            "scope": 1825,
            "src": "214:28:19",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_string_storage",
              "typeString": "string"
            },
            "typeName": {
              "id": 1801,
              "name": "string",
              "nodeType": "ElementaryTypeName",
              "src": "214:6:19",
              "typeDescriptions": {
                "typeIdentifier": "t_string_storage_ptr",
                "typeString": "string"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "474e49",
              "id": 1802,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "string",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "237:5:19",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_stringliteral_91caccd601834c4ea4b048fec0c1a0ec815bd2dc3e62a566d327def6412ca854",
                "typeString": "literal_string \"GNI\""
              },
              "value": "GNI"
            },
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 1806,
            "name": "decimals",
            "nodeType": "VariableDeclaration",
            "scope": 1825,
            "src": "246:28:19",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_uint256",
              "typeString": "uint256"
            },
            "typeName": {
              "id": 1804,
              "name": "uint256",
              "nodeType": "ElementaryTypeName",
              "src": "246:7:19",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "3138",
              "id": 1805,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "number",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "272:2:19",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_rational_18_by_1",
                "typeString": "int_const 18"
              },
              "value": "18"
            },
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 1809,
            "name": "INITIAL_SUPPLY",
            "nodeType": "VariableDeclaration",
            "scope": 1825,
            "src": "278:30:19",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_uint256",
              "typeString": "uint256"
            },
            "typeName": {
              "id": 1807,
              "name": "uint",
              "nodeType": "ElementaryTypeName",
              "src": "278:4:19",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            },
            "value": {
              "argumentTypes": null,
              "hexValue": "30",
              "id": 1808,
              "isConstant": false,
              "isLValue": false,
              "isPure": true,
              "kind": "number",
              "lValueRequested": false,
              "nodeType": "Literal",
              "src": "307:1:19",
              "subdenomination": null,
              "typeDescriptions": {
                "typeIdentifier": "t_rational_0_by_1",
                "typeString": "int_const 0"
              },
              "value": "0"
            },
            "visibility": "public"
          },
          {
            "body": {
              "id": 1823,
              "nodeType": "Block",
              "src": "336:79:19",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1814,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "id": 1812,
                      "name": "totalSupply_",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 561,
                      "src": "340:12:19",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 1813,
                      "name": "INITIAL_SUPPLY",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1809,
                      "src": "355:14:19",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "340:29:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 1815,
                  "nodeType": "ExpressionStatement",
                  "src": "340:29:19"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 1821,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 1816,
                        "name": "balances",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 559,
                        "src": "373:8:19",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_uint256_$",
                          "typeString": "mapping(address => uint256)"
                        }
                      },
                      "id": 1819,
                      "indexExpression": {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 1817,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 2096,
                          "src": "382:3:19",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 1818,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "382:10:19",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "nodeType": "IndexAccess",
                      "src": "373:20:19",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "id": 1820,
                      "name": "INITIAL_SUPPLY",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 1809,
                      "src": "396:14:19",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "src": "373:37:19",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 1822,
                  "nodeType": "ExpressionStatement",
                  "src": "373:37:19"
                }
              ]
            },
            "documentation": null,
            "id": 1824,
            "implemented": true,
            "isConstructor": true,
            "isDeclaredConst": false,
            "modifiers": [],
            "name": "",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 1810,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "326:2:19"
            },
            "payable": false,
            "returnParameters": {
              "id": 1811,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "336:0:19"
            },
            "scope": 1825,
            "src": "315:100:19",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 1826,
        "src": "103:315:19"
      }
    ],
    "src": "0:419:19"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {
    "1537464811457": {
      "events": {},
      "links": {},
      "address": "0xc8caf366895a857cb59d88554ce5b8ddadfe2ab6",
      "transactionHash": "0x3dfbc55f2b7d361ce22b87eff896071c0a7a38b2f0165bf9740fd27062f5e72c"
    },
    "1537480044494": {
      "events": {},
      "links": {},
      "address": "0x285aa4e44df16358fe041b79a6df596d8c74ea7d",
      "transactionHash": "0x3dfbc55f2b7d361ce22b87eff896071c0a7a38b2f0165bf9740fd27062f5e72c"
    },
    "1537480793622": {
      "events": {},
      "links": {},
      "address": "0x419dfb87ed1fd3c206836686e9370c677c394e84",
      "transactionHash": "0x3dfbc55f2b7d361ce22b87eff896071c0a7a38b2f0165bf9740fd27062f5e72c"
    },
    "1537641762470": {
      "events": {},
      "links": {},
      "address": "0xe0c226503d6461738c8dca8ebe75ed450611e22e",
      "transactionHash": "0x201c54f7785d63ab38ef7b43b955c870a3d7de2b44b006def502cca3fbd14a70"
    },
    "1537649686887": {
      "events": {},
      "links": {},
      "address": "0x1ed58342f1f7622eee4127843b4839ec975eae79",
      "transactionHash": "0x98099e307ffa7fb739bf0c2a53728414f4e97e43c4ce7ed8dcc79827ede393ac"
    },
    "1537896721858": {
      "events": {},
      "links": {},
      "address": "0x99b44f03c53fb08cca175aae223014278fd99e30",
      "transactionHash": "0xd10e0e8d970af0cf3c995cfb73a1182062c8ff8871533292bfeffef908d05005"
    },
    "1537992285408": {
      "events": {},
      "links": {},
      "address": "0x7d3ec947565d8c1c7f8ec6285dc20aa0d65a50ec",
      "transactionHash": "0x8a1966d604cf0ce70321b388bbecb30a7c68625f9900c5e93f14cba4b740ba9c"
    }
  },
  "schemaVersion": "2.0.1",
  "updatedAt": "2018-09-26T20:31:25.880Z"
}

export default data;
