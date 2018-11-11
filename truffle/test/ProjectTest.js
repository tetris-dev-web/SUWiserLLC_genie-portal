const ProjectMock = artifacts.require("ProjectMock");
const exceptions = require('./exceptions');
let accounts;
let mP;

contract('Project', async (_accounts) => {
  accounts = _accounts;

  beforeEach(async () => {
    await basicSetup();
  })

  describe('votesOf', async () => {
    it('returns the voters votes', async () => {
      let votes = await mP.votesOf(accounts[1]);
      assert.equal(votes, 2000000, 'vote count of the voter not returned');
    })
  })

  describe('open', async () => {
    it('returns true when open', async () => {
      let open = await mP.open();
      assert.equal(open, true, 'should return true when the project is open');
    })

    it('returns true when closed', async () => {
      await mP.changeClosingTime(0);
      let open = await mP.open();
      assert.equal(open, false, 'should return false when the project is closed');
    })
  })

  describe('totalVotes_', async () => {
    it('returns the total number of votes for the project', async () => {
      await addMockVoter(accounts[2], 1000000);
      let votes = await mP.totalVotes_();
      assert.equal(votes, 3000000, 'total number of votes not returned');
    })
  })

  describe('closingTime_', async () => {
    it('returns the projects closing time', async () => {
      await mP.changeClosingTime(2000);
      let closingTime = await mP.closingTime_();
      assert.equal(closingTime, 2000, 'closing time not returned');
    })
  })

  describe('developerTokens', async () => {
    it('returns the number of developer tokens for the project', async () => {
      let dTokens = await mP.developerTokens_();
      assert.equal(dTokens, 40000000, 'projects developer token amount not returned');
    })
  })

  describe('investorTokens', async () => {
    it('returns the number of investor tokens for the project', async () => {
      let iTokens = await mP.investorTokens_();
      assert.equal(iTokens, 10000000, 'projects investor token amount not returned');
    })
  })

  describe('capitalRequired_', async () => {
    it('returns the capital required for the project', async () => {
      let capital = await mP.capitalRequired_();
      assert.equal(capital, 1000000, 'capital required for the project not returned');
    })
  })

  describe('addManager', async () => {
    it('adds the address as a manager when the sender is the developer or a manager', async () => {
      let before = await mP.checkManagerStatus(accounts[2]);
      await mP.addManager(accounts[2], {from: accounts[0]});
      let after = await mP.checkManagerStatus(accounts[2]);
      assert.equal(before, false, 'address should not be a manager before it is added');
      assert.equal(after, true, 'developer should be able to add a manager');

      before = await mP.checkManagerStatus(accounts[3]);
      await mP.addManager(accounts[3], {from: accounts[2]});
      after = await mP.checkManagerStatus(accounts[3]);
      assert.equal(before, false, 'address should not be a manager before it is added');
      assert.equal(after, true, 'manager should be able to add a manager');
    })

    it('reverts when the sender is not the developer or a manager', async () => {
      await exceptions.catchRevert(mP.addManager(accounts[1], {from: accounts[1]}));
    })
  })

  describe('setDividendWallet', async () => {
    it('sets the dividend wallet to the address when the sender is the developer', async () => {
      await mP.setDividendWallet(accounts[2], {from: accounts[0]});
      let wallet = await mP.checkDividendWallet();
      assert.equal(wallet, accounts[2], 'dividend wallet not set properly');
    })

    it('works when the sender is a manager', async () => {
      await mP.addManager(accounts[2]);
      await mP.setDividendWallet(accounts[3], {from: accounts[2]});
      let wallet = await mP.checkDividendWallet();
      assert.equal(wallet, accounts[3], 'manager should be able to set divident wallet');
    })

    it('reverts when the sender is not a manager or the developer', async () => {
      await exceptions.catchRevert(mP.setDividendWallet(accounts[2], {from: accounts[1]}));
    })
  })

  describe('deposit', async () => {
    it('adds the wei value to the dividend wallet', async () => {
      await mP.setDividendWallet(accounts[2], {from: accounts[0]});
      let s1 = await web3.eth.getBalance(accounts[2]);
      let before = Number(s1);
      await mP.deposit({value: 3000, from: accounts[1]});
      let s2 = await web3.eth.getBalance(accounts[2]);
      let after = Number(s2);
      assert.equal(after, before + 3000, 'wei not deposited to dividend wallet');
    })
  })

  describe('vote', async () => {
    it('adds the voters votes by the vote amount', async () => {
      let bN1 = await mP.checkVoteAmount(accounts[1]);
      let before = parseBN(bN1);
      await mP.vote(accounts[1], 1000000);
      let bN2 = await mP.checkVoteAmount(accounts[1]);
      let after = parseBN(bN2);
      assert.equal(after, before + 1000000, 'votes not added to the voter');
    })

    it('adds the totalVotes by the vote amount', async () => {
      let bN1 = await mP.totalVotes_();
      let before = parseBN(bN1);
      await mP.vote(accounts[1], 1000000);
      let bN2 = await mP.totalVotes_();
      let after = parseBN(bN2);
      assert.equal(after, before + 1000000, 'votes not added to totalVotes');
    })

    it('extends the closing time by 43200', async () => {
      let bN1 = await mP.closingTime_();
      let before = parseBN(bN1);
      await mP.vote(accounts[1], 1000000);
      let bN2 = await mP.closingTime_();
      let after = parseBN(bN2);
      assert.equal(after, before + 43200, 'closingTime not extended');
    })
  })

  describe('removeVotes', async () => {
    it('decreases the voters votes by the vote amount', async () => {
      let bN1 = await mP.checkVoteAmount(accounts[1]);
      let before = parseBN(bN1);
      await mP.removeVotes(accounts[1], 1000000);
      let bN2 = await mP.checkVoteAmount(accounts[1]);
      let after = parseBN(bN2);
      assert.equal(after, before - 1000000, 'votes not removed from the voter');
    })

    it('decreases the totalVotes by the vote amount', async () => {
      let bN1 = await mP.totalVotes_();
      let before = parseBN(bN1);
      await mP.removeVotes(accounts[1], 1000000);
      let bN2 = await mP.totalVotes_();
      let after = parseBN(bN2);
      assert.equal(after, before - 1000000, 'votes not removed from totalVotes');
    })

    it('diminishes the closing time by 43200', async () => {
      let bN1 = await mP.closingTime_();
      let before = parseBN(bN1);
      await mP.removeVotes(accounts[1], 1000000);
      let bN2 = await mP.closingTime_();
      let after = parseBN(bN2);
      assert.equal(after, before - 43200, 'closingTime not diminished');
    })

    it('reverts if the voteAmount is greater than the totalVotes', async () => {
      await addMockVoter(accounts[2], 3000000);
      await exceptions.catchRevert(mP.removeVotes(accounts[1], 6000000));
    })

    it('reverts if the voteAmount is greater than the voters votes', async () => {
      await addMockVoter(accounts[2], 3000000);
      await exceptions.catchRevert(mP.removeVotes(accounts[1], 3000000));
    })
  })

  describe('activate', async () => {
    it('activates the project', async () => {
      let before = await mP.active_();
      await mP.activate();
      let after = await mP.active_();
      assert.equal(before, false, 'project should not be active before activation');
      assert.equal(after, true, 'project was not activated');
    })
  })

  describe('beats', async () => {
    it('returns false is the project is active', async () => {
      await mP.activate();
      let result = await mP.beats(accounts[2]);
      assert.equal(result, false, 'an active project should not be able to win');
    })

    it('returns false if the project has not been voted for yet', async () => {
      mP = await mockP({
        id: 0, name: 'project2', developer: accounts[0],
        valuation: 5000000, capitalRequired: 1000000, developerTokens: 40000000,
        investorTokens: 10000000, lat: '340', lng: '340'
      })
      let result = await mP.beats(accounts[2]);
      assert.equal(result, false, 'a project should not be able to win without any votes');
    })

    it('returns false if the project has less votes than its competitor', async () => {
      let competitor = await mockP({
        id: 0, name: 'project2', developer: accounts[0],
        valuation: 5000000, capitalRequired: 1000000, developerTokens: 40000000,
        investorTokens: 10000000, lat: '340', lng: '340'
      })
      await competitor.initMockVoter(accounts[2], 3000000);
      let result = await mP.beats(competitor.address);
      assert.equal(result, false, 'project should not win when its competitor has more votes');
    })

    it('returns true otherwise', async () => {
      let competitor = await mockP({
        id: 0, name: 'project2', developer: accounts[0],
        valuation: 5000000, capitalRequired: 1000000, developerTokens: 40000000,
        investorTokens: 10000000, lat: '340', lng: '340'
      });
      await competitor.initMockVoter(accounts[2], 1000000);
      let result = await mP.beats(competitor.address);
      assert.equal(result, true, 'project should beat its competitor when the conditions are met');
    })
  })
})

const basicSetup = async () => {
  mP = await mockP({
    id: 0, name: 'project1', developer: accounts[0],
    valuation: 5000000, capitalRequired: 1000000, developerTokens: 40000000,
    investorTokens: 10000000, lat: '340', lng: '340'
  });
  await addMockVoter(accounts[1], 2000000);
}

const mockP = async (params) => {
  let {
    id, name, developer,
    valuation, capitalRequired, developerTokens,
    investorTokens, lat, lng
  } = params;

  return await ProjectMock.new(
    id, name, developer,
    valuation, capitalRequired, developerTokens,
    investorTokens, lat, lng
  );
}

const addMockVoter = async (account, votes) => {
  await mP.initMockVoter(account, votes);
}

const parseBN = (bigNumber) => {
  return bigNumber.toNumber();
}
