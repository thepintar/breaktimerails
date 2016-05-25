class User < ActiveRecord::Base

	has_many :timeboxes
	has_many :calendars
	has_many :friendships
	has_many :friends, :through => :friendships

  has_secure_password

end
