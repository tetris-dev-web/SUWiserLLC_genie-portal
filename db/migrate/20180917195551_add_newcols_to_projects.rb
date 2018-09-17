class AddNewcolsToProjects < ActiveRecord::Migration[5.1]
  def change
    add_column :projects, :bus_plan_link, :string
    add_column :projects, :sketch_link, :string
    add_column :projects, :cashflow, :jsonb
    add_column :projects, :start_date, :date
  end
end
