class AddAddressToProjects < ActiveRecord::Migration[5.1]
  def change
    add_column :projects, :account, :string
  end
end
