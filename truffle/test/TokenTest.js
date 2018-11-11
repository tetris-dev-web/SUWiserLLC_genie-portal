const TokenMock = artifacts.require("TokenMock");
const InvestorListStub = artifacts.require("InvestorListStub");
const exceptions = require('./exceptions');
let accounts;
let iL;

contract('Token', async (_accounts) => {
  accounts = _accounts;

  describe('totalSupply', async () => {
    it('returns the total supply of tokens', async () => {
      let mT = await mockT();
      let bigNumber = await mT.totalSupply();
      let supply = parseBN(bigNumber);
      assert.equal(supply, 17000, 'incorrect total supply');
    })
  })

  describe('totalActiveSupply', async () => {
    it('returns the total active supply of tokens', async () => {
      let mT = await mockT();
      let bigNumber = await mT.totalActiveSupply();
      let activeSupply = parseBN(bigNumber);
      assert.equal(activeSupply, 7000, 'incorrect active supply');
    })
  })

  describe('totalInactiveSupply', async () => {
    it('returns the total inactive supply of tokens', async () => {
      let mT = await mockT();
      let bigNumber = await mT.totalInactiveSupply();
      let inactiveSupply = parseBN(bigNumber);
      assert.equal(inactiveSupply, 10000, 'incorrect inactive supply');
    })
  })

  describe('balanceOf', async () => {
    it('returns the balance of the passed address', async () => {
      let mT = await mockT();
      let balance1 = await mT.balanceOf(accounts[1]);
      let balance2 = await mT.balanceOf(accounts[2]);
      assert.equal(balance1, 7000, 'incorrect balance for account[1]');
      assert.equal(balance2, 10000, 'incorrect balance for account[2]');
    })
  })

  describe('activeBalanceOf', async () => {
    it('returns the active balance of the passed address', async () => {
      let mT = await mockT();
      let activeBalance1 = await mT.activeBalanceOf(accounts[1]);
      let activeBalance2 = await mT.activeBalanceOf(accounts[2]);
      assert.equal(activeBalance1, 4000, 'incorrect active balance for account[1]');
      assert.equal(activeBalance2, 3000, 'incorrect active balance for account[2]');
    })
  })

  describe('inactiveBalanceOf', async () => {
    it('returns the inactive balance of the passed address', async () => {
      let mT = await mockT();
      let inactiveBalance1 = await mT.inactiveBalanceOf(accounts[1]);
      let inactiveBalance2 = await mT.inactiveBalanceOf(accounts[2]);
      assert.equal(inactiveBalance1, 3000, 'incorrect active balance for account[1]');
      assert.equal(inactiveBalance2, 7000, 'incorrect active balance for account[2]');
    })
  })

  describe('activate', async () => {
    it('increases the investors active balance by the amount', async () => {
      let {before, after} = await testAndRecordVariables(activateTest, getBalance, {amount: 1000, getBalance: getActiveBalance, account: accounts[1]});
      assert.equal(after, before + 1000, 'account[1] active balance not increased by the correct amount');
    })

    it('decreases the investors inactive balance by the amount', async () => {
      let {before, after} = await testAndRecordVariables(activateTest, getBalance, {amount: 1000, getBalance: getInactiveBalance, account: accounts[1]});
      assert.equal(after, before - 1000, 'account[1] inactive balance not decreased by the correct amount');

    })

    it('does not change the investors total balance', async () => {
      let {before, after} = await testAndRecordVariables(activateTest, getBalance, {amount: 1000, getBalance: getTotalBalance, account: accounts[1]});
      assert.equal(after, before, 'overall balance should not change');
    })

    it('increases the totalActiveSupply by the amount', async () => {
      let {before, after} = await testAndRecordVariables(activateTest, getSupply, {amount: 1000, getSupply: getTotalActiveSupply, account: accounts[1]});
      assert.equal(after, before + 1000, 'totalActiveSupply should increase by the amount');
    })

    it('decreases the totalInactiveSupply by the amount', async () => {
      let {before, after} = await testAndRecordVariables(activateTest, getSupply, {amount: 1000, getSupply: getTotalInactiveSupply, account: accounts[1]});
      assert.equal(after, before - 1000, 'totalInactiveSupply should decrease by the amount');
    })

    it('does not change totalSupply', async () => {
      let {before, after} = await testAndRecordVariables(activateTest, getSupply, {amount: 1000, getSupply: getTotalSupply, account: accounts[1]});
      assert.equal(after, before, 'totalSupply should not change');
    })

    it('reverts if the value is greater than the investors inactive balance', async () => {
        let mT = await mockT();
        await exceptions.catchRevert(activateTest(mT, {amount: 5000, account: accounts[1]}));
    })
  })

  describe('transfer', async () => {
    it('removes the token value from the senders total balance', async () => {
      let {before, after} = await testAndRecordVariables(transferTest, getBalances, {value: 3000, getBalance: getTotalBalance});
      assert.equal(after.b1, before.b1 - 3000, 'sender total balance should decrease by the value');
    })

    it('removes the token value from the senders active balance', async () => {
      let {before, after} = await testAndRecordVariables(transferTest, getBalances, {value: 3000, getBalance: getActiveBalance});
      assert.equal(after.b1, before.b1 - 3000, 'sender active balance should decrease by the value');
    })

    it('does not change the senders inactive balance', async () => {
      let {before, after} = await testAndRecordVariables(transferTest, getBalances, {value: 3000, getBalance: getInactiveBalance});
      assert.equal(after.b1, before.b1, 'sender inactive balance should not change');
    })

    it('adds the token value to the recipients total balance', async () => {
      let {before, after} = await testAndRecordVariables(transferTest, getBalances, {value: 3000, getBalance: getTotalBalance});
      assert.equal(after.b2, before.b2 + 3000, 'recipient total balance should increase by the value');
    })

    it('adds the token value to the recipients active balance', async () => {
      let {before, after} = await testAndRecordVariables(transferTest, getBalances, {value: 3000, getBalance: getActiveBalance});
      assert.equal(after.b2, before.b2 + 3000, 'recipient active balance should increase by the value');
    })

    it('does not change the recipients inactive balance', async () => {
      let {before, after} = await testAndRecordVariables(transferTest, getBalances, {value: 3000, getBalance: getInactiveBalance});
      assert.equal(after.b2, before.b2, 'recipient inactive balance should not change');
    })

    it('does not change totalSupply', async () => {
      let {before, after} = await testAndRecordVariables(transferTest, getSupply, {value: 3000, getSupply: getTotalSupply});
      assert.equal(after, before, 'totalSupply should not change');
    })

    it('does not change totalActiveSupply', async () => {
      let {before, after} = await testAndRecordVariables(transferTest, getSupply, {value: 3000, getSupply: getTotalActiveSupply});
      assert.equal(after, before, 'totalActiveSupply should not change');
    })

    it('does not change totalInactiveSupply', async () => {
      let {before, after} = await testAndRecordVariables(transferTest, getSupply, {value: 3000, getSupply: getTotalInactiveSupply});
      assert.equal(after, before, 'totalInactiveSupply should not change');
    })

    it('calls removeVoteCredit with the sender and the value', async () => {
      let mT = await mockT();
      let { voter, votes } = await testStub(mT, 'removeVoteCredit', {value: 3000});
      assert.equal(voter, accounts[1], 'vote credit should be removed from the sender');
      assert.equal(votes, 3000, 'votes should reflect the token value');
    })

    it('calls addVoteCredit with the receiver and the value', async () => {
      let mT = await mockT();
      let { voter, votes } = await testStub(mT, 'addVoteCredit', {value: 3000});
      assert.equal(voter, accounts[2], 'vote credit sent to the receiver');
      assert.equal(votes, 3000, 'votes should reflect the token value');
    })

    it('reverts if the value is greater than the active balance of the sender', async () => {
      let mT = await mockT();
      await exceptions.catchRevert(transferTest(mT, {value: 5000}));
    })
  })

  describe('transferInactive', async () => {
    it('removes the token value from the senders total balance', async () => {
      let {before, after} = await testAndRecordVariables(transferInactiveTest, getBalances, {value: 3000, getBalance: getTotalBalance});
      assert.equal(after.b1, before.b1 - 3000, 'sender total balance should decrease by the value');
    })

    it('removes the token value from the senders inactive balance', async () => {
      let {before, after} = await testAndRecordVariables(transferInactiveTest, getBalances, {value: 3000, getBalance: getInactiveBalance});
      assert.equal(after.b1, before.b1 - 3000, 'sender inactive balance should decrease by the value');
    })

    it('does not change the senders active balance', async () => {
      let {before, after} = await testAndRecordVariables(transferInactiveTest, getBalances, {value: 3000, getBalance: getActiveBalance});
      assert.equal(after.b1, before.b1, 'sender active balance should not change');
    })

    it('adds the token value to the recipients total balance', async () => {
      let {before, after} = await testAndRecordVariables(transferInactiveTest, getBalances, {value: 3000, getBalance: getTotalBalance});
      assert.equal(after.b2, before.b2 + 3000, 'recipient total balance should increase by the value');
    })

    it('adds the token value to the recipients inactive balance', async () => {
      let {before, after} = await testAndRecordVariables(transferInactiveTest, getBalances, {value: 3000, getBalance: getInactiveBalance});
      assert.equal(after.b2, before.b2 + 3000, 'recipient inactive balance should increase by the value');
    })

    it('does not change the recipients active balance', async () => {
      let {before, after} = await testAndRecordVariables(transferInactiveTest, getBalances, {value: 3000, getBalance: getActiveBalance});
      assert.equal(after.b2, before.b2, 'recipient active balance should not change');
    })

    it('does not change totalSupply', async () => {
      let {before, after} = await testAndRecordVariables(transferInactiveTest, getSupply, {value: 3000, getSupply: getTotalSupply});
      assert.equal(after, before, 'totalSupply should not change');
    })

    it('does not change totalActiveSupply', async () => {
      let {before, after} = await testAndRecordVariables(transferInactiveTest, getSupply, {value: 3000, getSupply: getTotalActiveSupply});
      assert.equal(after, before, 'totalActiveSupply should not change');
    })

    it('does not change totalInactiveSupply', async () => {
      let {before, after} = await testAndRecordVariables(transferInactiveTest, getSupply, {value: 3000, getSupply: getTotalInactiveSupply});
      assert.equal(after, before, 'totalInactiveSupply should not change');
    })

    it('reverts if the value is greater than the inactive balance of the sender', async () => {
      let mT = await mockT();
      await exceptions.catchRevert(transferInactiveTest(mT, {value: 5000}));
    })
  })

  describe('mint', async () => {
    it('increases the totalSupply by the amount', async () => {
      let {before, after} = await testAndRecordVariables(mintTest, getSupply, {amount: 3000, getSupply: getTotalSupply});
      assert.equal(after, before + 3000, 'totalSupply should increase by the amount');
    })

    it('increases the totalInactiveSupply by the amount', async () => {
      let {before, after} = await testAndRecordVariables(mintTest, getSupply, {amount: 3000, getSupply: getTotalInactiveSupply});
      assert.equal(after, before + 3000, 'totalInactiveSupply should increase by the amount');
    })

    it('does not change the totalActiveSupply', async () => {
      let {before, after} = await testAndRecordVariables(mintTest, getSupply, {amount: 3000, getSupply: getTotalActiveSupply});
      assert.equal(after, before, 'totalActiveSupply should not change');
    })

    it('increases the receivers total balance by the amount', async () => {
      let {before, after} = await testAndRecordVariables(mintTest, getBalance, {amount: 3000, account: accounts[2], getBalance: getTotalBalance});
      assert.equal(after, before + 3000, 'account balance should increase by the amount');
    })

    it('increases the receivers inactive balance by the amount', async () => {
      let {before, after} = await testAndRecordVariables(mintTest, getBalance, {amount: 3000, account: accounts[2], getBalance: getInactiveBalance});
      assert.equal(after, before + 3000, 'account balance should increase by the amount');
    })

    it('does not change the receivers active balanace', async () => {
      let {before, after} = await testAndRecordVariables(mintTest, getBalance, {amount: 3000, account: accounts[2], getBalance: getActiveBalance});
      assert.equal(after, before, 'account balance should increase by the amount');
    })
  })
})

const mockT = async () => {
  iL = await InvestorListStub.new();
  const inst = await TokenMock.new(iL.address);

  await inst.initMockBalance(accounts[1], 4000, 3000);
  await inst.initMockBalance(accounts[2], 3000, 7000);

  return inst;
}

const testAndRecordVariables = async (method, testVariables, args) => {
  let mT = await mockT();

  let before = { before: await testVariables(mT, args) };
  await method(mT, args);
  let after = { after: await testVariables(mT, args) };

  return Object.assign(before, after);
}

const testStub = async (mT, methodName, args) => {
  await addStubMethod(methodName);
  await transferTest(mT, args);
  return await stubCallHistory(methodName);
}

const addStubMethod = async (methodName) => {
  await iL.addMethod(methodName);
}

const stubCallHistory = async (methodName) => {
  let data = await iL.callHistory(methodName);
  let votes = parseBN(data[0]);
  let voter = data[6];

  return {
    voter,
    votes
  }
}

const activateTest = async (mT, args) => {
  await mT.activate(args.account, args.amount);
}

const mintTest = async (mT, args) => {
  await mT.mint(accounts[2], args.amount);
}

const transferTest = async (mT, args) => {
  await mT.transfer(accounts[2], args.value, {from: accounts[1]})
}

const transferInactiveTest = async (mT, args) => {
  await mT.transferInactive(accounts[2], args.value, {from: accounts[1]})
}

const getBalances = async (mT, args) => {
  let b1 = await getBalance(mT, {getBalance: args.getBalance, account: accounts[1]});
  let b2 = await getBalance(mT, {getBalance: args.getBalance, account: accounts[2]});
  return {b1, b2};
}

const getBalance = async (mT, args) =>  {
  return await parseBalance(mT, args.getBalance, args.account);
}

const getSupply = async (mT, args) => {
  return await parseSupply(mT, args.getSupply);
}

const getTotalBalance = async (mT, account) => {
  return await mT.balanceOf(account);
}

const getActiveBalance = async (mT, account) => {
  return await mT.activeBalanceOf(account);
}

const getInactiveBalance = async (mT, account) => {
  return await mT.inactiveBalanceOf(account);
}

const getTotalSupply = async (mT) => {
  return await mT.totalSupply();
}

const getTotalActiveSupply = async (mT) => {
  return await mT.totalActiveSupply();
}

const getTotalInactiveSupply = async (mT) => {
  return await mT.totalInactiveSupply();
}

const parseBalance = async (mT, method, account) => {
  let balance = await method(mT, account);
  return parseBN(balance);
}

const parseSupply = async (mT, method) => {
  let supply = await method(mT);
  return parseBN(supply);
}

const parseBN = (bigNumber) => {
  return bigNumber.toNumber();
}
