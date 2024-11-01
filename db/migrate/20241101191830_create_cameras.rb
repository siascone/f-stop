class CreateCameras < ActiveRecord::Migration[7.0]
  def change
    create_table :cameras do |t|
      t.string :brand, null: false
      t.string :model, null: false
      t.integer :year, null: false
      t.string :version
      t.string :camera_type, null: false
      t.float :price, null: false
      t.integer :sku, null: false
      t.boolean :sold, null: false
      t.string :format, null: false
      t.timestamps
    end

    add_index :cameras, :brand
    add_index :cameras, :model
    add_index :cameras, :version
    add_index :cameras, :sku, unique: true
    #Ex:- add_index("admin_users", "username")
  end
end
