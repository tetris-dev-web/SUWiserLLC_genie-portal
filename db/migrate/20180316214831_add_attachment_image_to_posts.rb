class AddAttachmentImageToPosts < ActiveRecord::Migration[5.1]
  def self.up
    change_table :projects do |t|
      t.attachment :file
    end
  end

  def self.down
    remove_attachment :projects, :file
  end
end
