class Activity < ActiveRecord::Base

	has_many :timeboxes
  has_many :favorites

  validates :name, presence: true

  def activity_name
    "#{name}"
  end
  
end
