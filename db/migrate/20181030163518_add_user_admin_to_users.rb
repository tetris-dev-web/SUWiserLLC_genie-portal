class AddUserAdminToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :user_admin, :boolean, :default => false
  end
end
