require 'eth'
require 'ethereum'

class BlockChain
  def initialize
    @client = Ethereum::HttpClient.new("https://ropsten.infura.io/v3/aa56d8693c7f4fc8852b4ece901a4719")
    @crowdsaleInstance = Ethereum::Contract.create(name: "GNITokenCrowdsale", truffle: { paths: [ 'truffle' ] }, client: @client)
  end

  def process_votes (private_key, vote_transactions)
    set_key(private_key)

    vote_transactions.each do |transaction|
      args = [transaction["project_address"], transaction["voter_address"], transaction["votes"], transaction["signed_message"]]
      transaction["type"] = "addition" ? @crowdsaleInstance.transact_and_wait.vote_for_project(*args) : @crowdsaleInstance.transact_and_wait.remove_votes_from_project(*args)
    end

    unset_key
  end

  private

  def set_key(private_key)
    @crowdsaleInstance.key = Eth::Key.new(priv: private_key)
  end

  def unset_key
    @crowdsaleInstance.key = nil
  end
end
