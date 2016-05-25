class CreateFriendships < ActiveRecord::Migration
  def change
    create_table :friendships do |t|
      t.integer :friend01_id
      t.integer :friend02_id

      t.timestamps null: false
    end
  end
end
