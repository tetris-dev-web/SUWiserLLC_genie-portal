class AddCostToProjects < ActiveRecord::Migration[5.1]
  def change
    add_column :projects, :cost, :decimal
  end
end
