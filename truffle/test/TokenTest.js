const TokenMock = artifacts.require("TokenMock");
const InvestorListStub = artifacts.require("InvestorListStub");

contract('Token', async (accounts) => {
  describe('totalSupply', async () => {
    it('returns the total supply of tokens', async () => {
      let mT = await mockT(accounts);
      let supply = await mT.totalSupply();
      assert(supply, 17000, 'incorrect total supply');
    })

  })

  describe('totalActiveSupply', async () => {
    it('returns the total active supply of tokens', async () => {
      let mT = await mockT(accounts);
      let activeSupply = await mT.totalActiveSupply();
      assert(activeSupply, 7000, 'incorrect active supply');
    })
  })

  describe('totalInactiveSupply', async () => {
    it('returns the total inactive supply of tokens', async () => {
      let mT = await mockT(accounts);
      let inactiveSupply = await mT.totalInactiveSupply();
      assert(inactiveSupply, 1000, 'incorrect inactive supply');
    })
  })

  describe('balanceOf', async () => {
    it('returns the balance of the passed address', async () => {
      let mT = await mockT(accounts);
      let balance1 = await mT.balanceOf(accounts[1]);
      let balance2 = await mT.balanceOf(accounts[2]);
      assert(balance1, 7000, 'incorrect balance for account[1]');
      assert(balance2, 10000, 'incorrect balance for account[2]');
    })
  })

  describe('activeBalanceOf', async () => {
    it('returns the active balance of the passed address', async () => {
      let mT = await mockT(accounts);
      let activeBalance1 = await mT.activeBalanceOf(accounts[1]);
      let activeBalance2 = await mT.activeBalanceOf(accounts[2]);
      assert(activeBalance1, 3000, 'incorrect active balance for account[1]');
      assert(activeBalance2, 7000, 'incorrect active balance for account[2]');
    })
  })

  describe('inactiveBalanceOf', async () => {
    it('returns the inactive balance of the passed address', async () => {
      let mT = await mockT(accounts);
      let inactiveBalance1 = await mT.inactiveBalanceOf(accounts[1]);
      let inactiveBalance2 = await mT.inactiveBalanceOf(accounts[2]);
      assert(inactiveBalance1, 3000, 'incorrect active balance for account[1]');
      assert(inactiveBalance2, 7000, 'incorrect active balance for account[2]');
    })
  })

  describe('activate', async () => {
    it('increases the investors active balance by the amount', async () => {
      let {initialB1, initialB2, finalB1, finalB2} = await activateTest(accounts, getActiveBalance);
      assert(finalB1, initialB1 + 1000, 'account[1] active balance not increased by the correct amount');
      assert(finalB2, initialB2 + 2000, 'account[2] active balance not increased by the correct amount');
    })

    it('decreases the investors inactive balance by the amount', async () => {
      let {initialB1, initialB2, finalB1, finalB2} = await activateTest(accounts, getInactiveBalance);
      assert(finalB1, initialB1 - 1000, 'account[1] inactive balance not decreased by the correct amount');
      assert(finalB2, initialB2 - 2000, 'account[2] inactive balance not decreased by the correct amount');
    })

    it('does not change the investors total balance', async () => {
      let {initialB1, initialB2, finalB1, finalB2} = await activateTest(accounts, getTotalBalance);
      assert(finalB1, initialB1, 'overall balance should not change');
      assert(finalB2, initialB2, 'overall balance should not change');
    })

    //handle the revert case
  })

  describe('transfer', async () => {

  })
})

const mockT = async (accounts) => {
  const il = await InvestorListStub.new();
  const inst = await TokenMock.new(il.address);

  await inst.initMockBalance(accounts[1], 4000, 3000);
  await inst.initMockBalance(accounts[2], 3000, 7000);

  return inst;
}

const activateTest = async (accounts, getBalance) => {
  let mT = await mockT(accounts);
  let finalAB2 = await mT.activeBalanceOf(accounts[2]);
  let initialB1 = await getBalance(mT, accounts[1]);
  let initialB2 = await getBalance(mT, accounts[1]);
  await mT.activate(accounts[1], 1000);
  await mT.activate(accounts[2], 2000);
  let finalB1 = await getBalance(mT, accounts[1]);
  let finalB2 = await getBalance(mT, accounts[2]);

  return {
    initialB1,
    initialB2,
    finalB1,
    finalB2
  }
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
