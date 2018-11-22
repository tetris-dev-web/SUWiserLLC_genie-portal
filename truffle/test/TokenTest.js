const TokenMock = artifacts.require("TokenMock");
const InvestorListStub = artifacts.require("InvestorListStub");

const exceptions = require('./exceptions');
const stubUtil = require('./stubUtil');
const { parseBN, parseMethod, parseWithArg } = require('./parseUtil');

let accounts;
let mT;
let iL;

let totalSupplyT1;
let totalActiveSupplyT1;
let totalInactiveSupplyT1;

let senderTotalBalanceT1;
let senderActiveBalanceT1;
let senderInactiveBalanceT1;

let receiverTotalBalanceT1;
let receiverActiveBalanceT1;
let receiverInactiveBalanceT1;

contract('Token', async (_accounts) => {
  accounts = _accounts;

  before(async () => {
    await setUp();
  })

  describe('totalSupply', async () => {
    it('returns the total supply of tokens', async () => {
      let bigNumber = await mT.totalSupply();
      let supply = parseBN(bigNumber);
      assert.equal(supply, 17000, 'incorrect total supply');
    })
  })

  describe('totalActiveSupply', async () => {
    it('returns the total active supply of tokens', async () => {
      let bigNumber = await mT.totalActiveSupply();
      let activeSupply = parseBN(bigNumber);
      assert.equal(activeSupply, 7000, 'incorrect active supply');
    })
  })

  describe('totalInactiveSupply', async () => {
    it('returns the total inactive supply of tokens', async () => {
      let bigNumber = await mT.totalInactiveSupply();
      let inactiveSupply = parseBN(bigNumber);
      assert.equal(inactiveSupply, 10000, 'incorrect inactive supply');
    })
  })

  describe('balanceOf', async () => {
    it('returns the balance of the passed address', async () => {
      let balance1 = await mT.balanceOf(accounts[1]);
      let balance2 = await mT.balanceOf(accounts[2]);
      assert.equal(balance1, 7000, 'incorrect balance for account[1]');
      assert.equal(balance2, 10000, 'incorrect balance for account[2]');
    })
  })

  describe('activeBalanceOf', async () => {
    it('returns the active balance of the passed address', async () => {
      let activeBalance1 = await mT.activeBalanceOf(accounts[1]);
      let activeBalance2 = await mT.activeBalanceOf(accounts[2]);
      assert.equal(activeBalance1, 4000, 'incorrect active balance for account[1]');
      assert.equal(activeBalance2, 3000, 'incorrect active balance for account[2]');
    })
  })

  describe('inactiveBalanceOf', async () => {
    it('returns the inactive balance of the passed address', async () => {
      let inactiveBalance1 = await mT.inactiveBalanceOf(accounts[1]);
      let inactiveBalance2 = await mT.inactiveBalanceOf(accounts[2]);
      assert.equal(inactiveBalance1, 3000, 'incorrect active balance for account[1]');
      assert.equal(inactiveBalance2, 7000, 'incorrect active balance for account[2]');
    })
  })

  describe('activate', async () => {
    describe('when the sender has enough tokens to activate', async () => {
      before(async () => {
        await mT.activate(accounts[1], 1000);
      })

      after(async () => {
        await resetBalances();
      })

      it('increases the senders active balance by the amount', async () => {
        let senderActiveBalanceT2 = await parseWithArg(getActiveBalance, accounts[1]);
        assert.equal(senderActiveBalanceT2, senderActiveBalanceT1 + 1000, 'active balance not increased by the correct amount');
      })

      it('decreases the senders inactive balance by the amount', async () => {
        let senderInactiveBalanceT2 = await parseWithArg(getInactiveBalance, accounts[1]);
        assert.equal(senderInactiveBalanceT2, senderInactiveBalanceT1 - 1000, 'inactive balance not decreased by the correct amount');
      })

      it('does not change the senders total balance', async () => {
        let senderTotalBalanceT2 = await parseWithArg(getTotalBalance, accounts[1]);
        assert.equal(senderTotalBalanceT2, senderTotalBalanceT1, 'overall balance should not change');
      })

      it('increases the totalActiveSupply by the amount', async () => {
        let totalActiveSupplyT2 = await parseMethod(getTotalActiveSupply);
        assert.equal(totalActiveSupplyT2, totalActiveSupplyT1 + 1000, 'totalActiveSupply should increase by the amount');
      })

      it('decreases the totalInactiveSupply by the amount', async () => {
        let totalInactiveSupplyT2 = await parseMethod(getTotalInactiveSupply);
        assert.equal(totalInactiveSupplyT2, totalInactiveSupplyT1 - 1000, 'totalInactiveSupply should decrease by the amount');
      })

      it('does not change totalSupply', async () => {
        let totalSupplyT2 = await parseMethod(getTotalSupply);
        assert.equal(totalSupplyT2, totalSupplyT1, 'totalSupply should not change');
      })
    })

    describe('when the sender does not have enough tokens to activate', async () => {
      it('reverts', async () => {
        await exceptions.catchRevert(mT.activate(accounts[1], 5000));
      })
    })
  })

  describe('transfer', async () => {
    describe('when the sender can cover the value', async () => {
      before(async () => {
        await stubUtil.addMethod(iL, 'removeVoteCredit');
        await stubUtil.addMethod(iL, 'addVoteCredit');
        await mT.transfer(accounts[2], 3000, {from: accounts[1]});
      })

      after(async () => {
        await resetBalances();
      })

      it('removes the token value from the senders total balance', async () => {
        let senderTotalBalanceT2 = await parseWithArg(getTotalBalance, accounts[1]);
        assert.equal(senderTotalBalanceT2, senderTotalBalanceT1 - 3000, 'sender total balance should decrease by the value');
      })

      it('removes the token value from the senders active balance', async () => {
        let senderActiveBalanceT2 = await parseWithArg(getActiveBalance, accounts[1]);
        assert.equal(senderActiveBalanceT2, senderActiveBalanceT1 - 3000, 'sender active balance should decrease by the value');
      })

      it('does not change the senders inactive balance', async () => {
        let senderInactiveBalanceT2 = await parseWithArg(getInactiveBalance, accounts[1]);
        assert.equal(senderInactiveBalanceT2, senderInactiveBalanceT1, 'sender inactive balance should not change');
      })

      it('adds the token value to the recipients total balance', async () => {
        let receiverTotalBalanceT2 = await parseWithArg(getTotalBalance, accounts[2]);
        assert.equal(receiverTotalBalanceT2, receiverTotalBalanceT1 + 3000, 'recipient total balance should increase by the value');
      })

      it('adds the token value to the recipients active balance', async () => {
        let receiverActiveBalanceT2 = await parseWithArg(getActiveBalance, accounts[2]);
        assert.equal(receiverActiveBalanceT2, receiverActiveBalanceT1 + 3000, 'recipient active balance should increase by the value');
      })

      it('does not change the recipients inactive balance', async () => {
        let receiverInactiveBalanceT2 = await parseWithArg(getInactiveBalance, accounts[2]);
        assert.equal(receiverInactiveBalanceT2, receiverInactiveBalanceT1, 'recipient inactive balance should not change');
      })

      it('does not change totalSupply', async () => {
        let totalSupplyT2 = await parseMethod(getTotalSupply);
        assert.equal(totalSupplyT2, totalSupplyT1, 'totalSupply should not change');
      })

      it('does not change totalActiveSupply', async () => {
        let totalActiveSupplyT2 = await parseMethod(getTotalActiveSupply);
        assert.equal(totalActiveSupplyT2, totalActiveSupplyT1, 'totalActiveSupply should not change');
      })

      it('does not change totalInactiveSupply', async () => {
        let totalInactiveSupplyT2 = await parseMethod(getTotalInactiveSupply);
        assert.equal(totalInactiveSupplyT2, totalInactiveSupplyT1, 'totalInactiveSupply should not change');
      })

      it('removes vote credit for the sender', async () => {
        let { firstAddress, firstUint } = await stubUtil.callHistory(iL, 'removeVoteCredit');
        assert.equal(firstAddress, accounts[1], 'vote credit should be removed from the sender');
        assert.equal(firstUint, 3000, 'vote credit removed should reflect the token value');
      })

      it('calls addVoteCredit with the receiver and the value', async () => {
        let { firstAddress, firstUint } = await stubUtil.callHistory(iL, 'addVoteCredit');
        assert.equal(firstAddress, accounts[2], 'vote credit not sent to the receiver');
        assert.equal(firstUint, 3000, 'votes credit added should reflect the token value');
      })
    })


    describe('when sender cannot cover the value', async () => {
      after(async () => {
        await resetBalances();
      })

      it('reverts', async () => {
        await exceptions.catchRevert(mT.transfer(accounts[2], 5000, {from: accounts[1]}));
      })
    })
  })

  describe('transferInactive', async () => {
    describe('when the sender can cover the value', async () => {

      before(async () => {
        await mT.transferInactive(accounts[2], 3000, {from: accounts[1]});
      })

      after(async () => {
        await resetBalances();
      })

      it('removes the token value from the senders total balance', async () => {
        let senderTotalBalanceT2 = await parseWithArg(getTotalBalance, accounts[1]);
        assert.equal(senderTotalBalanceT2, senderTotalBalanceT1 - 3000, 'sender total balance should decrease by the value');
      })

      it('removes the token value from the senders inactive balance', async () => {
        let senderInactiveBalanceT2 = await parseWithArg(getInactiveBalance, accounts[1]);
        assert.equal(senderInactiveBalanceT2, senderInactiveBalanceT1 - 3000, 'sender inactive balance should decrease by the value');
      })

      it('does not change the senders active balance', async () => {
        let senderActiveBalanceT2 = await parseWithArg(getActiveBalance, accounts[1]);
        assert.equal(senderActiveBalanceT2, senderActiveBalanceT1, 'sender active balance should not change');
      })

      it('adds the token value to the recipients total balance', async () => {
        let receiverTotalBalanceT2 = await parseWithArg(getTotalBalance, accounts[2]);
        assert.equal(receiverTotalBalanceT2, receiverTotalBalanceT1 + 3000, 'recipient total balance should increase by the value');
      })

      it('adds the token value to the recipients inactive balance', async () => {
        let receiverInactiveBalanceT2 = await parseWithArg(getInactiveBalance, accounts[2]);
        assert.equal(receiverInactiveBalanceT2, receiverInactiveBalanceT1 + 3000, 'recipient inactive balance should increase by the value');
      })

      it('does not change the recipients active balance', async () => {
        let receiverActiveBalanceT2 = await parseWithArg(getActiveBalance, accounts[2]);
        assert.equal(receiverActiveBalanceT2, receiverActiveBalanceT1, 'recipient active balance should not change');
      })

      it('does not change totalSupply', async () => {
        let totalSupplyT2 = await parseMethod(getTotalSupply);
        assert.equal(totalSupplyT2, totalSupplyT1, 'totalSupply should not change');
      })

      it('does not change totalActiveSupply', async () => {
        let totalActiveSupplyT2 = await parseMethod(getTotalActiveSupply);
        assert.equal(totalActiveSupplyT2, totalActiveSupplyT1, 'totalActiveSupply should not change');
      })

      it('does not change totalInactiveSupply', async () => {
        let totalInactiveSupplyT2 = await parseMethod(getTotalInactiveSupply);
        assert.equal(totalInactiveSupplyT2, totalInactiveSupplyT1, 'totalInactiveSupply should not change');
      })
    })

    describe('when sender cannot cover the value', async () => {
      after(async () => {
        await resetBalances();
      })

      it('reverts', async () => {
        await exceptions.catchRevert(mT.transferInactive(accounts[2], 5000, {from: accounts[1]}));
      })
    })
  })

  describe('mint', async () => {
    before(async () => {
       await mT.mint(accounts[2], 3000);
    })

    it('increases the totalSupply by the amount', async () => {
      let totalSupplyT2 = await parseMethod(getTotalSupply);
      assert.equal(totalSupplyT2, totalSupplyT1 + 3000, 'totalSupply should increase by the amount');
    })

    it('increases the totalInactiveSupply by the amount', async () => {
      let totalInactiveSupplyT2 = await parseMethod(getTotalInactiveSupply);
      assert.equal(totalInactiveSupplyT2, totalInactiveSupplyT1 + 3000, 'totalInactiveSupply should increase by the amount');
    })

    it('does not change the totalActiveSupply', async () => {
      let totalActiveSupplyT2 = await parseMethod(getTotalActiveSupply);
      assert.equal(totalActiveSupplyT2, totalActiveSupplyT1, 'totalActiveSupply should not change');
    })

    it('increases the receivers total balance by the amount', async () => {
      let receiverTotalBalanceT2 = await parseWithArg(getTotalBalance, accounts[2]);
      assert.equal(receiverTotalBalanceT2, receiverTotalBalanceT1 + 3000, 'receiver balance should increase by the amount');
    })


    it('increases the receivers inactive balance by the amount', async () => {
      let receiverInactiveBalanceT2 = await parseWithArg(getInactiveBalance, accounts[2]);
      assert.equal(receiverInactiveBalanceT2, receiverInactiveBalanceT1 + 3000, 'receiver inactive balance should increase by the amount');
    })

    it('does not change the receivers active balanace', async () => {
      let receiverActiveBalanceT2 = await parseWithArg(getActiveBalance, accounts[2]);
      assert.equal(receiverActiveBalanceT2, receiverActiveBalanceT1, 'receiver active balance should not change');
    })
  })
})

const mockT = async () => {
  mT = await TokenMock.new(iL.address);
}

const iLStub = async () => {
  iL = await InvestorListStub.new();
}

const setUp = async () => {
  await iLStub();
  await mockT();
  await resetBalances();
  await setValues();

}

const resetBalances = async () => {
  await mT.resetSupply();
  await mT.initMockBalance(accounts[1], 4000, 3000);
  await mT.initMockBalance(accounts[2], 3000, 7000);
}

const setValues = async () => {
  totalSupplyT1 = await parseMethod(getTotalSupply);
  totalActiveSupplyT1 = await parseMethod(getTotalActiveSupply);
  totalInactiveSupplyT1 = await parseMethod(getTotalInactiveSupply);

  senderTotalBalanceT1 = await parseWithArg(getTotalBalance, accounts[1]);
  senderActiveBalanceT1 = await parseWithArg(getActiveBalance, accounts[1]);
  senderInactiveBalanceT1 = await parseWithArg(getInactiveBalance, accounts[1]);

  receiverTotalBalanceT1 = await parseWithArg(getTotalBalance, accounts[2]);
  receiverActiveBalanceT1 = await parseWithArg(getActiveBalance, accounts[2]);
  receiverInactiveBalanceT1 = await parseWithArg(getInactiveBalance, accounts[2]);
}

const getTotalBalance = async (account) => {
  return await mT.balanceOf(account);
}

const getActiveBalance = async (account) => {
  return await mT.activeBalanceOf(account);
}

const getInactiveBalance = async (account) => {
  return await mT.inactiveBalanceOf(account);
}

const getTotalSupply = async () => {
  return await mT.totalSupply();
}

const getTotalActiveSupply = async () => {
  return await mT.totalActiveSupply();
}

const getTotalInactiveSupply = async () => {
  return await mT.totalInactiveSupply();
}
