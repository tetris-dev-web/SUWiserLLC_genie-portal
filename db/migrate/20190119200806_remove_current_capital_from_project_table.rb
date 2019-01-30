class RemoveCurrentCapitalFromProjectTable < ActiveRecord::Migration[5.2]
  def change
    remove_column :projects, :current_capital
  end
end
