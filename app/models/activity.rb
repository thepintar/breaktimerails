class Activity < ActiveRecord::Base

	has_many :timeboxes

  validates :name, presence: true

  def activity_name
    "#{name}"
  end
end
