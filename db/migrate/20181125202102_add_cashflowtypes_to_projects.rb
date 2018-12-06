class AddCashflowtypesToProjects < ActiveRecord::Migration[5.1]
  def change
    add_column :projects, :actual_cashflow, :jsonb
    add_column :projects, :accum_actual_cashflow, :jsonb
    add_column :projects, :projected_cashflow, :jsonb
    add_column :projects, :accum_projected_cashflow, :jsonb
  end
end
