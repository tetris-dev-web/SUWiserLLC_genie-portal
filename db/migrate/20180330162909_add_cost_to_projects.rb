class AddrevenueToProjects < ActiveRecord::Migration[5.1]
  def change
    add_column :projects, :revenue, :decimal
  end
end
