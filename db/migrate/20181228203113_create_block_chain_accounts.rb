class CreateBlockChainAccounts < ActiveRecord::Migration[5.2]
  def change
    create_table :block_chain_accounts do |t|
      t.datetime "created_at", null: false
      t.datetime "updated_at", null: false
      t.string "address"
      t.string "private_key"
      t.string "public_key"
    end
  end
end
