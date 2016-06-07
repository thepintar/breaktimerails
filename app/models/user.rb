class User < ActiveRecord::Base

	has_many :timeboxes
	has_many :calendars
	has_many :friendships
	has_many :friends, :through => :friendships
	has_many :favorites
	has_many :favorite_activities, through: :favorites, source: :activity

  has_secure_password

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :password, presence: true

end
