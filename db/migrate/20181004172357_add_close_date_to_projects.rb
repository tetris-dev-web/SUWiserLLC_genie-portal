class AddCloseDateToProjects < ActiveRecord::Migration[5.1]
  def change
    add_column :projects, :close_date, :datetime
  end
end
