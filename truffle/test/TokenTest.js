const TokenMock = artifacts.require("TokenMock");
const InvestorListStub = artifacts.require("InvestorListStub");
import './exceptions';
let iL;

contract('Token', async (accounts) => {
  describe('totalSupply', async () => {
    it('returns the total supply of tokens', async () => {
      let mT = await mockT(accounts);
      let bigNumber = await mT.totalSupply();
      let supply = parseBN(bigNumber);
      assert.equal(supply, 17000, 'incorrect total supply');
    })
  })

  describe('totalActiveSupply', async () => {
    it('returns the total active supply of tokens', async () => {
      let mT = await mockT(accounts);
      let bigNumber = await mT.totalActiveSupply();
      let activeSupply = parseBN(bigNumber);
      assert.equal(activeSupply, 7000, 'incorrect active supply');
    })
  })

  describe('totalInactiveSupply', async () => {
    it('returns the total inactive supply of tokens', async () => {
      let mT = await mockT(accounts);
      let bigNumber = await mT.totalInactiveSupply();
      let inactiveSupply = parseBN(bigNumber);
      assert.equal(inactiveSupply, 10000, 'incorrect inactive supply');
    })
  })

  describe('balanceOf', async () => {
    it('returns the balance of the passed address', async () => {
      let mT = await mockT(accounts);
      let balance1 = await mT.balanceOf(accounts[1]);
      let balance2 = await mT.balanceOf(accounts[2]);
      assert.equal(balance1, 7000, 'incorrect balance for account[1]');
      assert.equal(balance2, 10000, 'incorrect balance for account[2]');
    })
  })

  describe('activeBalanceOf', async () => {
    it('returns the active balance of the passed address', async () => {
      let mT = await mockT(accounts);
      let activeBalance1 = await mT.activeBalanceOf(accounts[1]);
      let activeBalance2 = await mT.activeBalanceOf(accounts[2]);
      assert.equal(activeBalance1, 4000, 'incorrect active balance for account[1]');
      assert.equal(activeBalance2, 3000, 'incorrect active balance for account[2]');
    })
  })

  describe('inactiveBalanceOf', async () => {
    it('returns the inactive balance of the passed address', async () => {
      let mT = await mockT(accounts);
      let inactiveBalance1 = await mT.inactiveBalanceOf(accounts[1]);
      let inactiveBalance2 = await mT.inactiveBalanceOf(accounts[2]);
      assert.equal(inactiveBalance1, 3000, 'incorrect active balance for account[1]');
      assert.equal(inactiveBalance2, 7000, 'incorrect active balance for account[2]');
    })
  })

  describe('activate', async () => {
    it('increases the investors active balance by the amount', async () => {
      let {initialB1, initialB2, finalB1, finalB2} = await testAndRecordBalances(accounts, activateTest, getActiveBalance);
      assert.equal(finalB1, initialB1 + 1000, 'account[1] active balance not increased by the correct amount');
      assert.equal(finalB2, initialB2 + 2000, 'account[2] active balance not increased by the correct amount');
    })

    it('decreases the investors inactive balance by the amount', async () => {
      let {initialB1, initialB2, finalB1, finalB2} = await testAndRecordBalances(accounts, activateTest, getInactiveBalance);
      assert.equal(finalB1, initialB1 - 1000, 'account[1] inactive balance not decreased by the correct amount');
      assert.equal(finalB2, initialB2 - 2000, 'account[2] inactive balance not decreased by the correct amount');
    })

    it('does not change the investors total balance', async () => {
      let {initialB1, initialB2, finalB1, finalB2} = await testAndRecordBalances(accounts, activateTest, getTotalBalance);
      assert.equal(finalB1, initialB1, 'overall balance should not change');
      assert.equal(finalB2, initialB2, 'overall balance should not change');
    })

    //handle the revert case
  })

  describe('transfer', async () => {
    it('removes the token value from the senders total balance', async () => {
      let {initialB1, finalB1,} = await testAndRecordBalances(accounts, transferTest, getTotalBalance);
      assert.equal(finalB1, initialB1 - 3000, 'sender total balance should decrease by the value');
    })

    it('removes the token value from the senders active balance', async () => {
      let {initialB1, finalB1,} = await testAndRecordBalances(accounts, transferTest, getActiveBalance);
      assert.equal(finalB1, initialB1 - 3000, 'sender active balance should decrease by the value');
    })

    it('does not change the senders inactive balance', async () => {
      let {initialB1, finalB1,} = await testAndRecordBalances(accounts, transferTest, getInactiveBalance);
      assert.equal(finalB1, initialB1, 'sender inactive balance should not change');
    })

    it('adds the token value to the recipients total balance', async () => {
      let {initialB2, finalB2,} = await testAndRecordBalances(accounts, transferTest, getTotalBalance);
      assert.equal(finalB2, initialB2 + 3000, 'recipient total balance should increase by the value');
    })

    it('adds the token value to the recipients active balance', async () => {
      let {initialB2, finalB2} = await testAndRecordBalances(accounts, transferTest, getActiveBalance);
      assert.equal(finalB2, initialB2 + 3000, 'recipient active balance should increase by the value');
    })

    it('does not change the recipients inactive balance', async () => {
      let {initialB2, finalB2,} = await testAndRecordBalances(accounts, transferTest, getInactiveBalance);
      assert.equal(finalB2, initialB2, 'recipient inactive balance should not change');
    })

    it('calls removeVoteCredit with the sender and the value', async () => {
      let mT = await mockT(accounts);
      let { voter, votes } = await testStub(mT, 'removeVoteCredit', accounts);
      assert.equal(voter, accounts[1], 'vote credit should be removed from the sender');
      assert.equal(votes, 3000, 'votes should reflect the token value');
    })

    it('calls addVoteCredit with the receiver and the value', async () => {
      let mT = await mockT(accounts);
      let { voter, votes } = await testStub(mT, 'addVoteCredit', accounts);
      assert.equal(voter, accounts[2], 'vote credit sent to the receiver');
      assert.equal(votes, 3000, 'votes should reflect the token value');
    })

    //handle the revert case
  })

  describe('transferInactive', async () => {
    it('removes the token value from the senders total balance', async () => {
      let {initialB1, finalB1,} = await testAndRecordBalances(accounts, transferInactiveTest, getTotalBalance);
      assert.equal(finalB1, initialB1 - 3000, 'sender total balance should decrease by the value');
    })

    it('removes the token value from the senders inactive balance', async () => {
      let {initialB1, finalB1,} = await testAndRecordBalances(accounts, transferInactiveTest, getInactiveBalance);
      assert.equal(finalB1, initialB1 - 3000, 'sender inactive balance should decrease by the value');
    })

    it('does not change the senders active balance', async () => {
      let {initialB1, finalB1,} = await testAndRecordBalances(accounts, transferInactiveTest, getActiveBalance);
      assert.equal(finalB1, initialB1, 'sender active balance should not change');
    })

    it('adds the token value to the recipients total balance', async () => {
      let {initialB2, finalB2,} = await testAndRecordBalances(accounts, transferInactiveTest, getTotalBalance);
      assert.equal(finalB2, initialB2 + 3000, 'recipient total balance should increase by the value');
    })

    it('adds the token value to the recipients inactive balance', async () => {
      let {initialB2, finalB2} = await testAndRecordBalances(accounts, transferInactiveTest, getInactiveBalance);
      assert.equal(finalB2, initialB2 + 3000, 'recipient inactive balance should increase by the value');
    })

    it('does not change the recipients active balance', async () => {
      let {initialB2, finalB2,} = await testAndRecordBalances(accounts, transferInactiveTest, getActiveBalance);
      assert.equal(finalB2, initialB2, 'recipient active balance should not change');
    })

    //handle revert case
  })
})

const mockT = async (accounts) => {
  iL = await InvestorListStub.new();
  const inst = await TokenMock.new(iL.address);

  await inst.initMockBalance(accounts[1], 4000, 3000);
  await inst.initMockBalance(accounts[2], 3000, 7000);

  return inst;
}

const testAndRecordBalances = async (accounts, test, getBalance) => {
  let mT = await mockT(accounts);

  let initialB1 = await parseBalance(mT, getBalance, accounts[1]);
  let initialB2 = await parseBalance(mT, getBalance, accounts[2]);

  await test(mT, accounts);

  let finalB1 = await parseBalance(mT, getBalance, accounts[1]);
  let finalB2 = await parseBalance(mT, getBalance, accounts[2]);

  return {
    initialB1,
    initialB2,
    finalB1,
    finalB2
  }
}

const testStub = async (mT, methodName, accounts) => {
  await addStubMethod(methodName);
  await transferTest(mT, accounts);
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

const activateTest = async (mT, accounts) => {
  await mT.activate(accounts[1], 1000);
  await mT.activate(accounts[2], 2000);
}

const transferTest = async (mT, accounts) => {
  await mT.transfer(accounts[2], 3000, {from: accounts[1]})
}

const transferInactiveTest = async (mT, accounts) => {
  await mT.transferInactive(accounts[2], 3000, {from: accounts[1]})
}

const parseBN = (bigNumber) => {
  return bigNumber.toNumber();
}

const parseBalance = async (mT, method, account) => {
  let balance = await method(mT, account);
  return parseBN(balance);
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
