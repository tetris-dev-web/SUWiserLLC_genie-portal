# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create!([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create!(name: 'Luke', movie: movies.first)

User.destroy_all
Project.destroy_all
UserAccount.destroy_all
AccountType.destroy_all

genesis_start_date = '01/01/2019'
genesis_end_date = '09/01/2019'
genesis_votes = {
  "03/01/2019":5000,
  "04/01/2019":1000,
  "05/01/2019":1000,
  "06/01/2019":1000,
  "07/01/2019":1000,
  "08/01/2019":1000,
  "08/10/2019":5000
}
genesis_cap_required = 150000
genesis_current_cap = 15000
genesis_lat = 40.836678
genesis_lng = -73.943083
genesis_sketch_link = 'https://drive.google.com/open?id=1o15Si2ON0X1Cb0QApl7LH6WXeY6JQ9CE'
genesis_bus_link = 'https://drive.google.com/open?id=1tuqRBAYHB_26JzoFy2xMzgePI1qTrpwL'

genesis_cashflow = {
  "1": {
    "cashFlow": -36974,
    "isActuals": true
  },
  "2": {
    "cashFlow": -40018,
    "isActuals": true
  },
  "3": {
    "cashFlow": -16857,
    "isActuals": true
  },
  "4": {
    "cashFlow": -2915,
    "isActuals": true
  },
  "5": {
    "cashFlow": -20325,
    "isActuals": true
  },
  "6": {
    "cashFlow": 7864,
    "isActuals": true
  },
  "7": {
    "cashFlow": 25360,
    "isActuals": true
  },
  "8": {
    "cashFlow": 28107,
    "isActuals": true
  },
  "9": {
    "cashFlow": 28942,
    "isActuals": false
  },
  "10": {
    "cashFlow": 28696,
    "isActuals": false
  },
  "11": {
    "cashFlow": 29356,
    "isActuals": false
  },
  "12": {
    "cashFlow": 28854,
    "isActuals": false
  },
  "13": {
    "cashFlow": 28588,
    "isActuals": false
  },
  "14": {
    "cashFlow": 30781,
    "isActuals": false
  },
  "15": {
    "cashFlow": 29081,
    "isActuals": false
  },
  "16": {
    "cashFlow": 31887,
    "isActuals": false
  },
  "17": {
    "cashFlow": 51887,
    "isActuals": false
  },
  "18": {
    "cashFlow": 71887,
    "isActuals": false
  },
  "19": {
    "cashFlow": 30339,
    "isActuals": false
  },
  "20": {
    "cashFlow": 30718,
    "isActuals": false
  },
  "21": {
    "cashFlow": 31102,
    "isActuals": false
  },
  "22": {
    "cashFlow": 31491,
    "isActuals": false
  },
  "23": {
    "cashFlow": 31885,
    "isActuals": false
  },
  "24": {
    "cashFlow": 32283,
    "isActuals": false
  },
  "25": {
    "cashFlow": 32687,
    "isActuals": false
  },
  "26": {
    "cashFlow": 33096,
    "isActuals": false
  },
  "27": {
    "cashFlow": 33509,
    "isActuals": false
  },
  "28": {
    "cashFlow": 33928,
    "isActuals": false
  }
}


genesis_Act_Cashflow = {}
genesis_Act_Acc_Cashflow = {}

genesis_Proj_Cashflow = {}
genesis_Proj_Acc_Cashflow = {}


accCashFlow = 0

genesis_cashflow.each do |key, value|
  puts "The hash key is #{key} and the cashFlow is #{value}."

  accCashFlow += value[:"cashFlow"]

  puts(accCashFlow)
  puts(value[:"cashFlow"])

  if value[:"isActuals"] == true
    genesis_Act_Cashflow[key] = value[:"cashFlow"]
    genesis_Act_Acc_Cashflow[key] = accCashFlow

    genesis_Proj_Cashflow[key] = 0
    genesis_Proj_Acc_Cashflow[key] = 0

  else
    genesis_Act_Cashflow[key] = 0
    genesis_Act_Acc_Cashflow[key] = 0

    genesis_Proj_Cashflow[key] =  value[:"cashFlow"]
    genesis_Proj_Acc_Cashflow[key] = accCashFlow
  end

end


genesis_summary = "Genesis is a boutique gym, similar in structure to a CrossFit, but differentiated by a Co-op
business structure, a holistic* approach to fitness, and the aesthetics of the space itself. genesis
evolved from a group of fitness enthusiasts, techies and finance professionals in Upper Manhat-
tan working out and training together regularly. Our aspiration has been to start our own hub
for fitness and health for the area by taking a space on 146th to host workouts focused on high
intensity interval training and calisthenics. The space also hosts a cafe and multiple backrooms."


hamInn_start_date = '01/01/2017'
hamInn_end_date = '09/01/2019'
hamInn_cap_required = 40000
hamInn_current_cap = 40000
hamInn_votes = {
  "03/01/2017":2000,
  "04/01/2017":1000,
  "05/01/2017":1000,
  "06/01/2017":1000,
  "07/01/2018":1000,
  "08/01/2018":1000,
  "11/11/2018":20000,
  "09/09/2018":10000,
  "08/10/2018":3000
}
hamInn_lat = 40.836370
hamInn_lng = -73.944585
hamInn_sketch_link = 'https://drive.google.com/open?id=0B4qHw8trLI_qQ3VkX0RtRndqVTA'
hamInn_bus_link = 'https://drive.google.com/open?id=1zxY4cZcdaAMpinQpdZmTb8Zy2i9dh2iZ'
hamInn_cashflow = {
  "01A": -36974,
  "02A": -40018,
  "03A": -16857,
  "04A": -2915,
  "05A": -20325,
  "06A": 7864,
  "07A": 25360,
  "08A": 28107,
  "09A": 28942,
  "10A": 28696,
  "11A": 29356,
  "12A": 28854,
  "13A": 28588,
  "14A": 30781,
  "15A": 29081,
  "16A": 31887,
  "17A": 51887,
  "18A": 71887,
  "19P": 30339,
  "20P": 30718,
  "21P": 31102,
  "22P": 31491,
  "23P": 31885,
  "24P": 32283,
  "25P": 32687,
  "26P": 33096,
  "27P": 33509,
  "28P": 33928
}
hamInn_summary = "We work hard to set accurate expectations in our listings of our unique experience, and we
work hard to meet or exceed those expectations. However, we have no control over such
things as our location and the level of street noise around us, and we urge you to consider
the implications of reflecting these sorts of things in the number of stars you award us.
Ideally you would have understood and accepted these factors before booking. Feel free
to inform guests of these sorts of things in your text review, but none of them will see the
number of stars you give us, so we hope you will instead treat stars as only a reflection of
our performance as hosts."


# users
user1 = User.create!(
  email: "johnjrudell@gmail.com",
  password: "password",
  bylaw_agreement: true,
  tokens: 20
)

user2 = User.create!(
  email: "matsteele@gmail.com",
  password: "password",
  bylaw_agreement: true,
  tokens: 10
)

#AccountTypes
admin = AccountType.create!(
  account_type:"Admin"
)
developer = AccountType.create!(
  account_type:"Developer"
)

#UserAccounts
user_account1 = UserAccount.create!(
  user_id: user1.id,account_id:admin.id
)
user_account2 = UserAccount.create!(
  user_id: user1.id,account_id:developer.id
)
user_account3 = UserAccount.create!(
  user_id: user2.id,account_id:developer.id
)


# projects

project0 = Project.create!(
  title: "Genesis",
  revenue: 250000,
  valuation: 10000000,
  city: "New York",
  country: "USA",
  continent: "North America",
  model_id: "7syizSLPN60",
  icon: "https://image.freepik.com/free-icon/picture-frame-with-mountain-image_318-40293.jpg",
  description: "BNB/ Business Incubator",
  creator_id: user2.id,
  created_at: "14/03/2018",
  status: "deployed",
  cashflow: genesis_cashflow,
  votes:genesis_votes,
  sketch_link: genesis_sketch_link,
  bus_plan_link: genesis_bus_link,
  start_date: genesis_start_date,
  close_date: genesis_end_date,
  latitude:hamInn_lat,
  longitude:hamInn_lng,
  summary:genesis_summary,
  actual_cashflow: genesis_Act_Cashflow,
  accum_actual_cashflow: genesis_Act_Acc_Cashflow,
  projected_cashflow: genesis_Proj_Cashflow,
  accum_projected_cashflow: genesis_Proj_Acc_Cashflow,
  capital_required:genesis_cap_required,
  current_capital:genesis_current_cap
)

project2 = Project.create!(
  title: "Fitness Complex",
  revenue: 250,
  valuation: 400000,
  city: "Rio",
  country: "Brazil",
  continent: "South America",
  model_id: "7syizSLPN60",
  icon: "https://image.freepik.com/free-icon/picture-frame-with-mountain-image_318-40293.jpg",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  creator_id: user2.id,
  created_at: "12/02/2018",
  status: "inDevelopment"
)

project3 = Project.create!(
  title: "Sleepless Nights",
  revenue: 5060,
  valuation: 4788800,
  city: "Seattle",
  country: "USA",
  continent: "North America",
  model_id: "7syizSLPN60",
  icon: "https://image.freepik.com/free-icon/picture-frame-with-mountain-image_318-40293.jpg",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  creator_id: user1.id,
  created_at: "14/03/2018",
  status: "pitched"
)

project4 = Project.create!(
  title: "HamInn",
  revenue: 8000,
  valuation: 57000,
  city: "New York",
  country: "USA",
  continent: "North America",
  model_id: "51be9e3e-f32e-4825-a011-eac8a9132a00",
  icon: "https://image.freepik.com/free-icon/picture-frame-with-mountain-image_318-40293.jpg",
  description: "BNB/ Business Incubator",
  creator_id: user2.id,
  created_at: "14/03/2018",
  status: "deployed",
  cashflow: genesis_cashflow,
  sketch_link: hamInn_sketch_link,
  bus_plan_link: hamInn_bus_link,
  start_date: hamInn_start_date,
  close_date: hamInn_end_date,
  latitude:hamInn_lat,
  votes:hamInn_votes,
  longitude:hamInn_lng,
  summary:hamInn_summary,
  capital_required:hamInn_cap_required,
  current_capital:hamInn_current_cap
)
project5 = Project.create!(
  title: "Penn Generator",
  revenue: 6000,
  valuation: 72000,
  city: "Philidelphia",
  country: "USA",
  continent: "North America",
  model_id: "7syizSLPN60",
  icon: "https://image.freepik.com/free-icon/picture-frame-with-mountain-image_318-40293.jpg",
  description: "BNB/ Business Incubator",
  creator_id: user2.id,
  created_at: "14/03/2018",
  status: "deployed"
)
project6 = Project.create!(
  title: "BeefInn",
  revenue: 9000,
  valuation: 10000,
  city: "Bogota",
  country: "Columbia",
  continent: "South America",
  model_id: "7syizSLPN60",
  icon: "https://image.freepik.com/free-icon/picture-frame-with-mountain-image_318-40293.jpg",
  description: "BNB/ Business Incubator",
  creator_id: user2.id,
  created_at: "14/03/2018",
  status: "pitched"
)
project6 = Project.create!(
  title: "ChickInn",
  revenue: 27000,
  valuation: 200000,
  city: "Berlin",
  country: "Germany",
  continent: "Europe",
  model_id: "7syizSLPN60",
  icon: "https://image.freepik.com/free-icon/picture-frame-with-mountain-image_318-40293.jpg",
  description: "BNB/ Business Incubator",
  creator_id: user2.id,
  created_at: "14/03/2018",
  status: "pitched"
)

# project7 = Project.create(
#   title: "Genesis Sans 3d",
#   revenue: 27000,
#   valuation: 210000,
#   city: "New York",
#   country: "United States",
#   continent: "North America",
#   model_id: "7syizSLPN60",
#   icon: "https://image.freepik.com/free-icon/picture-frame-with-mountain-image_318-40293.jpg",
#   description: "BNB/ Business Incubator",
#   creator_id: user2.id,
#   created_at: "26/10/18",
#   status: "pitched"
# )

project8 = Project.create(
 title: "Genesis Sans 3d",
 valuation: 210000,
 model_id: nil,
 icon: "https://image.freepik.com/free-icon/picture-frame-with-mountain-image_318-40293.jpg",
 description: "BNB/ Business Incubator",
 creator_id: 4,
 revenue: 27000,
 city: "New York",
 country: "United States",
 continent: "North America",
 status: "pitched",
 cashflow: genesis_cashflow,
 latitude: 0.4083637e2,
 longitude: -0.73944585e2,
 summary: "I am testing this project in order to see if I can get the 3D model rendering only if a model is inputed",
 votes: hamInn_votes
)
