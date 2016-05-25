class CreateTimeboxes < ActiveRecord::Migration
  def change
    create_table :timeboxes do |t|
      t.references :user, index: true, foreign_key: true
      t.references :activity, index: true, foreign_key: true
      t.integer :time_worked
      t.integer :time_breaked
      t.integer :total_cycles
      t.integer :work_block_time
      t.integer :break_block_time

      t.timestamps null: false
    end
  end
end
