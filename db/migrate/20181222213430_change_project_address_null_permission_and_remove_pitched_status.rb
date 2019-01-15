class ChangeProjectAddressNullPermissionAndRemovePitchedStatus < ActiveRecord::Migration[5.2]
  def change
    remove_column :projects, :pitched_status
    change_column :projects, :address, :string, null: true
  end
end
