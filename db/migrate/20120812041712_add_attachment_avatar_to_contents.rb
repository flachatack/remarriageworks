class AddAttachmentAvatarToContents < ActiveRecord::Migration
  def self.up
    change_table :contents do |t|
      t.has_attached_file :avatar
    end
  end

  def self.down
    drop_attached_file :contents, :avatar
  end
end
