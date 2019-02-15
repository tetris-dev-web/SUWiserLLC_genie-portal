const CooperativeMock = artifacts.require("CooperativeMock");
const AmendmentPollStub = artifacts.require("AmendmentPollStub");
const ProposalsStub = artifacts.require("ProposalsStub");
const ActiveTokenStub = artifacts.require("ActiveTokenStub");
const VotingTokenStub = artifacts.require("VotingTokenStub");

let accounts;

let aP;

let p;

let cooperative;

contract("Cooperative", async (_accounts) => {
  accounts = _accounts;

  before(async () => {
    await setUp();
  });

  describe("initNewProposals", async () => {
    describe("when the sender is the developer", async () => {
      before(async () => {
        
      })
    })
  })
});

const setUp = async () => {
  const votingToken = await initVotingToken();
  const activeToken = await initActiveToken(votingToken);
  await initAmendmentPoll(activeToken);
  await initNewProposals();
  await initCooperative();
};

const initVotingToken = async () => {
  return await VotingTokenStub.new();
};

const initActiveToken = async (votingToken) => {
  return await ActiveTokenStub.new(votingToken.address);
};

const initAmendmentPoll = async (activeToken) => {
  aP = await AmendmentPollStub.new(activeToken.address);
};

const initNewProposals = async () => {
  p = await ProposalsStub.new();
};

const initCooperative = async () => {
  cooperative = await CooperativeMock.new(accounts[0], aP.address);
};
