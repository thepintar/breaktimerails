class Timebox < ActiveRecord::Base
  belongs_to :creator, class_name: "User", foreign_key: :user_id
  belongs_to :activity
  has_one :detail
  belongs_to :favorite, polymorphic: true

  validates :activity , presence: true
end
