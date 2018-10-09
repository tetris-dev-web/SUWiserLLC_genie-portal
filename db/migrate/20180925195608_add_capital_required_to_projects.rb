class AddCapitalRequiredToProjects < ActiveRecord::Migration[5.1]
  def change
    add_column :projects, :capital_required, :float
  end
end
