



# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Project.destroy_all

Genesis_start_date = '01/01/2019'
Genesis_sketch_link = 'https://drive.google.com/open?id=1o15Si2ON0X1Cb0QApl7LH6WXeY6JQ9CE'
Genesis_bus_link = 'https://drive.google.com/open?id=1tuqRBAYHB_26JzoFy2xMzgePI1qTrpwL'
Genesis_cashflow = '{
   "ExpectedNet": {
      "1": 114328,
      "2": -39513,
      "3": -16726,
      "4": -2851,
      "5": -20019,
      "6": 7389,
      "7": 23906,
      "8": 26108,
      "9": 27480,
      "10": 28224,
      "11": 28409,
      "12": 27812,
      "13": 28160,
      "14": 28512,
      "15": 28868,
      "16": 29229,
      "17": 29595,
      "18": 29965,
      "19": 30339,
      "20": 30718,
      "21": 31102,
      "22": 31491,
      "23": 31885,
      "24": 32283,
      "25": 32687,
      "26": 33096,
      "27": 33509,
      "28": 33928
   },
   "AccumulatedGainorLoss": {
      "1": 372323,
      "2": 258932,
      "3": 186947,
      "4": 167103,
      "5": 120580,
      "6": 117675,
      "7": 174302,
      "8": 251706,
      "9": 332614,
      "10": 416646,
      "11": 501835,
      "12": 586073,
      "13": 593399,
      "14": 600816,
      "15": 608326,
      "16": 615930,
      "17": 623630,
      "18": 631425,
      "19": 639318,
      "20": 647309,
      "21": 655401,
      "22": 663593,
      "23": 671888,
      "24": 680287,
      "25": 688790,
      "26": 697400,
      "27": 706118,
      "28": 714944
   }
}'

HamInn_start_date = '01/01/2017'
HamInn_sketch_link = 'https://drive.google.com/open?id=0B4qHw8trLI_qQ3VkX0RtRndqVTA'
HamInn_bus_link = 'https://drive.google.com/open?id=1zxY4cZcdaAMpinQpdZmTb8Zy2i9dh2iZ'
HamInn_cashflow = '{
  "ExpectedNet": {
    "1": -28000,
    "2": 7208,
    "3": 9624,
    "4": 9508,
    "5": 2000,
    "6": 9200,
    "7": 13500,
    "8": 14000,
    "9": 2000,
    "10": 9200,
    "11": 13500,
    "12": 14000,
    "13": 2000,
    "14": 9200,
    "15": 13500,
    "16": 14000,
    "17": 2000,
    "18": 9200,
    "19": 13500,
    "20": 14000,
    "21": 2000,
    "22": 9200,
    "23": 13500,
    "24": 14000,
    "25": 2000,
    "26": 9200,
    "27": 13500,
    "28": 14000
  },
  "AccumulatedGainorLoss":{
    "1": -28000,
    "2": -20792,
    "3": -11168,
    "4": -1660,
    "5": 340,
    "6": 9540,
    "7": 23040,
    "8": 37040,
    "9": 39040,
    "10": 48240,
    "11": 61740,
    "12": 75740,
    "13": 77740,
    "14": 86940,
    "15": 100440,
    "16": 114440,
    "17": 116440,
    "18": 125640,
    "19": 139140,
    "20": 153140,
    "21": 155140,
    "22": 164340,
    "23": 177840,
    "24": 191840,
    "25": 193840,
    "26": 203040,
    "27": 216540,
    "28": 230540
  }
}'



# users
user1 = User.create(
  email: "johnjrudell@gmail.com",
  password: "password",
  bylaw_agreement: true,
  tokens: 20
)

user2 = User.create(
  email: "matsteele@gmail.com",
  password: "password",
  bylaw_agreement: true,
  tokens: 10
)

# projects

project0 = Project.create(
  title: "Genesis",
  revenue: 250000,
  valuation: 10000000,
  city: "New York",
  country: "USA",
  continent: "North America",
  video: "https://www.youtube.com/watch?v=zGP6zk7jcrQ",
  icon: "https://image.freepik.com/free-icon/picture-frame-with-mountain-image_318-40293.jpg",
  description: "BNB/ Business Incubator",
  creator_id: user2.id,
  created_at: "14/03/2018",
  status: "deployed",
  cashflow: Genesis_cashflow,
  sketch_link: Genesis_sketch_link,
  bus_plan_link: Genesis_bus_link,
  start_date: Genesis_start_date
)

# project1 = Project.create(
#   title: "Columbia Generator",
#   revenue: 250000,
#   valuation: 10000000,
#   city: "New York",
#   country: "USA",
#   continent: "North America",
#   video: "https://www.youtube.com/watch?v=zGP6zk7jcrQ",
#   icon: "https://image.freepik.com/free-icon/picture-frame-with-mountain-image_318-40293.jpg",
#   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
#   creator_id: user1.id,
#   created_at: "12/01/2018",
#   status: "inDevelopment"
# )

project2 = Project.create(
  title: "Fitness Complex",
  revenue: 250,
  valuation: 400000,
  city: "Rio",
  country: "Brazil",
  continent: "South America",
  video: "https://www.youtube.com/watch?v=zGP6zk7jcrQ",
  icon: "https://image.freepik.com/free-icon/picture-frame-with-mountain-image_318-40293.jpg",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  creator_id: user2.id,
  created_at: "12/02/2018",
  status: "inDevelopment"
)

project3 = Project.create(
  title: "Sleepless Nights",
  revenue: 5060,
  valuation: 4788800,
  city: "Seattle",
  country: "USA",
  continent: "North America",
  video: "https://www.youtube.com/watch?v=zGP6zk7jcrQ",
  icon: "https://image.freepik.com/free-icon/picture-frame-with-mountain-image_318-40293.jpg",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  creator_id: user1.id,
  created_at: "14/03/2018",
  status: "pitched"
)

project4 = Project.create(
  title: "HamInn",
  revenue: 8000,
  valuation: 57000,
  city: "New York",
  country: "USA",
  continent: "North America",
  video: "https://www.youtube.com/watch?v=zGP6zk7jcrQ",
  icon: "https://image.freepik.com/free-icon/picture-frame-with-mountain-image_318-40293.jpg",
  description: "BNB/ Business Incubator",
  creator_id: user2.id,
  created_at: "14/03/2018",
  status: "deployed",
  cashflow: HamInn_cashflow,
  sketch_link: HamInn_sketch_link,
  bus_plan_link: HamInn_bus_link,
  start_date: HamInn_start_date
)
project5 = Project.create(
  title: "Penn Generator",
  revenue: 6000,
  valuation: 72000,
  city: "Philidelphia",
  country: "USA",
  continent: "North America",
  video: "https://www.youtube.com/watch?v=zGP6zk7jcrQ",
  icon: "https://image.freepik.com/free-icon/picture-frame-with-mountain-image_318-40293.jpg",
  description: "BNB/ Business Incubator",
  creator_id: user2.id,
  created_at: "14/03/2018",
  status: "deployed"
)
project6 = Project.create(
  title: "BeefInn",
  revenue: 9000,
  valuation: 10000,
  city: "Bogota",
  country: "Columbia",
  continent: "South America",
  video: "https://www.youtube.com/watch?v=zGP6zk7jcrQ",
  icon: "https://image.freepik.com/free-icon/picture-frame-with-mountain-image_318-40293.jpg",
  description: "BNB/ Business Incubator",
  creator_id: user2.id,
  created_at: "14/03/2018",
  status: "pitched"
)
project6 = Project.create(
  title: "ChickInn",
  revenue: 27000,
  valuation: 200000,
  city: "Berlin",
  country: "Germany",
  continent: "Europe",
  video: "https://www.youtube.com/watch?v=zGP6zk7jcrQ",
  icon: "https://image.freepik.com/free-icon/picture-frame-with-mountain-image_318-40293.jpg",
  description: "BNB/ Business Incubator",
  creator_id: user2.id,
  created_at: "14/03/2018",
  status: "pitched"
)
