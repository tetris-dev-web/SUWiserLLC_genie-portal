const InvestorListMock = artifacts.require("InvestorListMock");

let accounts;
let inst;

contract('InvestorList', async (_accounts) => {
  accounts = _accounts;

  before(async () => {
    await setUp();
  })

  describe('investorCount', async () => {

    it('returns the length of the list', async () => {
      let count = await inst.investorCount();
      assert.equal(count, 1, 'wrong length returned');
    });
  })

  describe('addrById', async () => {

    it('finds and investor address by their id', async () => {
      let address = await inst.addrById(1);
      assert.equal(address, accounts[1], 'address not found');
    })
  })

  describe('addInvestor', async () => {
    it('does not duplicate an investor that is already on the list', async () => {
      let initialInvestorCountBN = await inst.investorCount();
      let initialInvestorCount = initialInvestorCountBN.toNumber();
      await inst.addInvestor(accounts[1]);
      let finalInvestorCountBN = await inst.investorCount();
      let finalInvestorCount = finalInvestorCountBN.toNumber();

      assert.equal(initialInvestorCount, finalInvestorCount, 'investor list length should not change');
    });

    it('adds new investors to the list', async () => {
      let initialInvestorCountBN = await inst.investorCount();
      let initialInvestorCount = initialInvestorCountBN.toNumber();

      await inst.addInvestor(accounts[2]);

      let finalInvestorCountBN = await inst.investorCount();
      let finalInvestorCount = finalInvestorCountBN.toNumber();
      let investorAddress = await inst.addrById(2);

      assert.equal(finalInvestorCount, initialInvestorCount + 1, 'investor list length not incremented');
      assert.equal(investorAddress, accounts[2], 'investor addresses or id not added');
    });
  })

  describe('addVoteCredit', async () => {
    it('adds votes to the investors voteCredit', async () => {
      await inst.addVoteCredit(accounts[1], 2000);
      let voteCredit = await inst.getVoteCredit(accounts[1]);
      assert.equal(voteCredit, 7000, 'vote credit not added properly');
    })
  })

  describe('removeVoteCredit', async () => {
    it('adds votes to the investors voteCredit', async () => {
      await inst.removeVoteCredit(accounts[1], 2000);
      let voteCredit = await inst.getVoteCredit(accounts[1]);
      assert.equal(voteCredit, 5000, 'vote credit not removed properly');
    })
  })
})

const setUp = async () => {
  inst = await InvestorListMock.new();
  await inst.addTestInvestor(accounts[1], 5000);
}
