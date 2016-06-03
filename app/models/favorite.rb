class Favorite < ActiveRecord::Base
  belongs_to :user
  belongs_to :activity

  def favorite_name
    "#{self.activity.name}"
  end
end
