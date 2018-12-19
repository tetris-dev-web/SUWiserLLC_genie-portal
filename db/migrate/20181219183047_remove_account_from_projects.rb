class RemoveAccountFromProjects < ActiveRecord::Migration[5.1]
  def change
    remove_column :projects, :account
  end
end
