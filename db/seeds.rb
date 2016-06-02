# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

20.times do
	User.create(name: Faker::Name.name, email: Faker::Internet.email, password:'password')
end

User.create(name: "user", email: "user@user.com", password: "password")
User.create(name: "Guest", email: "guest@breaktimerails.com", password: "password")

# 30.times do
# 	Activity.create(name: Faker::Hipster.word, description: Faker::Hipster.sentence(8))
# end

activities = ["Coffee Break", "Browse Internet", "Walk", "Call Mom", "Stretch"]

activities.each do |activity|
  Activity.create(name: activity, description: Faker::Hipster.sentence(2))
end