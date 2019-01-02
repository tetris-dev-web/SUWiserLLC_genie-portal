class BlockChainAccount < ApplicationRecord
  validates :private_key, :address, presence: true
end
