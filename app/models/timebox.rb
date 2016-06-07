class Timebox < ActiveRecord::Base
  belongs_to :creator, class_name: "User", foreign_key: :user_id
  belongs_to :activity
  has_one :detail

  validates :activity_id, presence: true
end
 