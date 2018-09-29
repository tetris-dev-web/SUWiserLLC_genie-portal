class AddCurrentCapitalToProjects < ActiveRecord::Migration[5.1]
  def change
    add_column :projects, :current_capital, :float
  end
end
