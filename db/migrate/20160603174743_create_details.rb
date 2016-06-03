class CreateDetails < ActiveRecord::Migration
  def change
    create_table :details do |t|
    	t.references :timebox, index: true, foreign_key: true
    	t.text :notes
    	t.integer :count
    end
  end
end
