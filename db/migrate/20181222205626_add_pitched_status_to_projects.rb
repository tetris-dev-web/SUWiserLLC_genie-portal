class AddPitchedStatusToProjects < ActiveRecord::Migration[5.2]
  def change
    add_column :projects, :pitched_status, :boolean, null: false, default: false
  end
end
