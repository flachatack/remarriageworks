class CreateContents < ActiveRecord::Migration
  def change
    create_table :contents do |t|
      t.string :title
      t.text :subtitle
      t.text :body
      t.string :type

      t.timestamps
    end
  end
end
