class RenameTypeColumnToContenttype < ActiveRecord::Migration
  def up
	rename_column :contents, :type, :content_type 
  end

  def down
	rename_column :contents, :content_type, :type  
end
end
