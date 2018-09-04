class ChangerevenueToRevenue < ActiveRecord::Migration[5.1]
  def change
    rename_column :projects, :revenue, :revenue
  end
end
