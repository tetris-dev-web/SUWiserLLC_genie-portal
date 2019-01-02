require 'eth'
require 'ethereum'
require 'concurrent'

class BlockChain
  def initialize
    @client = Ethereum::HttpClient.new("https://ropsten.infura.io/v3/aa56d8693c7f4fc8852b4ece901a4719")
    @crowdsaleInstance = Ethereum::Contract.create(name: "GNITokenCrowdsale", truffle: { paths: [ 'truffle' ] }, client: @client)
  end

  def distribute_votes (private_key, vote_data)
    set_key(private_key)
    all_transactions = vote_data.vote_additions.concat(vote_data.vote_removals)

    process_votes(key, all_transactions) do |transaction|
      process_transaction(transaction)
    end

    unset_key
  end

  private

  def set_key(private_key)
    key = Eth::Key.new(priv: private_key)
    @crowdsaleInstance.key = key.private_hex
  end

  def unset_key
    @crowdsaleInstance.key = nil
  end

  def process_votes (key, voter_address, all_transactions)
    promise = nil

    all_transactions.each do |transaction|
      if promise.nil?
        promise = Concurrent::Promise.new do
          yield(transaction)
        end
      else
        promise = promise.then do
          yield(transaction)
      end
    end

    promise.execute if promise
  end

  def process_transaction (transaction)
    args = [transaction.project_address, voter_address, transaction.votes, transaction.signed_message]

    if transaction.type == 'addition'
      @crowdsaleInstance.transact_and_wait.voteForProject(*args)
    else
      @crowdsaleInstance.transact_and_wait.removeVotesFromProject(*args)
    end
  end
end
