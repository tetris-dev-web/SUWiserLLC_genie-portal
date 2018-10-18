class ChangeTypeToAccountType < ActiveRecord::Migration[5.1]
  def change
    rename_column :account_types, :type, :account_type
  end
end
