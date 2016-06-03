class AddCountableToActivities < ActiveRecord::Migration
  def change
  	add_column :activities, :countable, :boolean
  end
end
