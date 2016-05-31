class Activity < ActiveRecord::Base

	has_many :timeboxes

  def activity_name
    "#{name}"
  end
end
