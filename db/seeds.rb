# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Project.destroy_all

# users
user1 = User.create(
  email: "johnjrudell@gmail.com",
  password: "password",
  bylaw_agreement: true
)

user2 = User.create(
  email: "matsteele@gmail.com",
  password: "password",
  bylaw_agreement: true
)

# projects
project1 = Project.create(
  title: "Corgi Hostel",
  valuation: 1000000,
  video: "https://www.youtube.com/watch?v=zGP6zk7jcrQ",
  plan_pdf: "http://johnrudell.com/pdfs/johnrudell-formatted.pdf",
  icon: "https://image.freepik.com/free-icon/picture-frame-with-mountain-image_318-40293.jpg",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  creator_id: user1.id
)
