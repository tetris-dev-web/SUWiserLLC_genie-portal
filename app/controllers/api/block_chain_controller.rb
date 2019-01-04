require 'BlockChain'

class Api::BlockChainController < ApplicationController
  def update
    BlockChain.new.process_votes(BlockChainAccount.first.private_key, vote_transactions)
  end

  private
  def vote_transactions
    vote_data = params.require(:vote_data).permit(
      vote_additions: [:project_address, :voter_address, :votes, :type, :signed_message],
      vote_removals: [:project_address, :voter_address, :votes, :type, :signed_message]
    )

    format_transactions(vote_data)
  end

  def format_transactions(vote_data)
    formatted = []

    vote_data["vote_additions"].each do |k, v|
      formatted << v
    end

    vote_data["vote_removals"].each do |k, v|
      formatted << v
    end

    formatted
  end
end
