class RenameModelLinkToModelId < ActiveRecord::Migration[5.1]
  def change
    rename_column :projects, :model_link, :model_id
  end
end
