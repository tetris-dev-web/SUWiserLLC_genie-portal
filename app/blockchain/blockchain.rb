require 'eth'
require 'ethereum'

class BlockChain
  def initialize
    @client = Ethereum::HttpClient.new("https://ropsten.infura.io/v3/aa56d8693c7f4fc8852b4ece901a4719")
    @crowdsaleInstance = Ethereum::Contract.create(name: "GNITokenCrowdsale", truffle: { paths: [ 'truffle' ] }, client: @client)
  end

  def self.new_key(private_key)
    key = Eth::Key.new(priv: private_key)
    return key.address.downcase, key.private_hex, key.public_hex
  end

  def distribute_votes (key, vote_data)
    voter_address = vote_data.voter_address

    vote_data.vote_additions.each do |transaction|
      @crowdsaleInstance.transact_and_wait.removeVotesFromProject(transaction.project_address, voter_address, transaction.votes, transaction.signed_message)
    end

    vote_data.vote_removals.each do |transaction|
      @crowdsaleInstance.transact_and_wait.voteForProject(transaction.project_address, voter_address, transaction.votes, transaction.signed_message)
    end
  end
end
