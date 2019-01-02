require 'BlockChain'

class Api::BlockChainController < ApplicationController
  def update
    @key = BlockChain.new_key(BlockChainAccount.first.private_key)
    BlockChain.new.distribute_votes(@key, vote_params)
    render {}
  end

  private
  def vote_params
    params.require(:vote_data).permit(
      :voter_address,
      vote_additions: [:project_title, :signed_transaction],
      vote_removals: [:project_title, :signed_transaction]
    )
  end
end
