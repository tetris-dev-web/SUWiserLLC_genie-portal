class ReAddAddressToProjects < ActiveRecord::Migration[5.1]
  def change
    add_column :projects, :address, :string
  end
end
