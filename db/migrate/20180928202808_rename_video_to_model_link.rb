class RenameVideoToModelLink < ActiveRecord::Migration[5.1]
  def change
    rename_column :projects, :video, :model_link
  end
end
