class RemoveProjectColumns < ActiveRecord::Migration[5.2]
  def change
    remove_column :projects, :valuation
    remove_column :projects, :model_id
    remove_column :projects, :updated_at
    remove_column :projects, :revenue
    remove_column :projects, :status
    remove_column :projects, :latitude
    remove_column :projects, :longitude
    remove_column :projects, :capital_required
    remove_column :projects, :close_date
    remove_column :projects, :votes
    remove_column :projects, :address
  end
end
