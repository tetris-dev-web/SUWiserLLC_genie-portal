require 'BlockChain'

class Api::BlockChainController < ApplicationController
  def update
    private_key = BlockChainAccount.first.private_key
    BlockChain.new.distribute_votes(private_key, vote_params)
    render {}
  end

  private
  def vote_params
    params.require(:vote_data).permit(
      vote_additions: [:project_address, :voter_address, :votes, :type, :signed_message],
      vote_removals: [:project_address, :voter_address, :votes, :type, :signed_message]
    )
  end
end
