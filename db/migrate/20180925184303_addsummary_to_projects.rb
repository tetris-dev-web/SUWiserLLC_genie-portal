class AddsummaryToProjects < ActiveRecord::Migration[5.1]
  def change
    add_column :projects, :summary, :string
  end
end
