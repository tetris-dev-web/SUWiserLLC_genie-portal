const Dividends = artifacts.require("Dividends");
const TokenStub = artifacts.require("TokenStub");
const InvestorListStub = artifacts.require("InvestorListStub");
const exceptions = require('./exceptions');
let accounts;
let mD;

contract('Dividends', async (_accounts) => {
  accounts = _accounts;

  beforeEach(async () => {
    await setUp();
  })

  describe('distributeDividends', async () => {
    it('distributes wei to investors based on their share of active tokens owned', async () => {
      let s1 = await web3.eth.getBalance(accounts[1]);
      let before1 = Number(s1);

      let s2 = await web3.eth.getBalance(accounts[2]);
      let before2 = Number(s2);

      let s3 = await web3.eth.getBalance(accounts[3]);
      let before3 = Number(s3);

      await mD.distributeDividends();

      s1 = await web3.eth.getBalance(accounts[1]);
      let after1 = Number(s1);

      s2 = await web3.eth.getBalance(accounts[2]);
      let after2 = Number(s2);

      s3 = await web3.eth.getBalance(accounts[3]);
      let after3 = Number(s3);

      assert.equal(after1, before1 + 1200000, 'dividends not distributed properly');
      assert.equal(after2, before2 + 4800000, `dividends not distributed properly`);
      assert.equal(after3, before3 + 3000000, `dividends not distributed properly`);
    })
  })
})

const setUp = async () => {
  let iL = await InvestorListStub.new();
  iL.initMockInvestors(accounts[2], accounts[3]);
  let token = await TokenStub.new(iL.address);
  token.init(accounts[1], accounts[2], accounts[3]);
  mD = await Dividends.new(token.address, accounts[1], iL.address);
  await web3.eth.sendTransaction({from: accounts[1], to: mD.address, value: 9000000});
}
