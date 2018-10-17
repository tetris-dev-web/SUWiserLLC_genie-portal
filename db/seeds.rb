



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
Genesis_end_date = '09/01/2019'
Genesis_votes = '{
  "03/01/2019":5000,
  "04/01/2019":1000,
  "05/01/2019":1000,
  "06/01/2019":1000,
  "07/01/2019":1000,
  "08/01/2019":1000,
  "08/10/2019":5000
}'
Genesis_cap_required = 150000
Genesis_current_cap = 15000
Genesis_lat = 40.836678
Genesis_lng = -73.943083
Genesis_sketch_link = 'https://drive.google.com/open?id=1o15Si2ON0X1Cb0QApl7LH6WXeY6JQ9CE'
Genesis_bus_link = 'https://drive.google.com/open?id=1tuqRBAYHB_26JzoFy2xMzgePI1qTrpwL'

Genesis_cashflow= '{
    "ExpectedNet":{
    "1": -35673,
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
    "Actual":{
    "1": -36974,
    "2": -40018,
    "3": -16857,
    "4": -2915,
    "5": -20325,
    "6": 7864,
    "7": 25360,
    "8": 28107,
    "9": 28942,
    "10": 28696,
    "11": 29356,
    "12": 28854,
    "13": 28588,
    "14": 30781,
    "15": 29081,
    "16": 31887
  },
    "ExpectedAccumulatedGainorLoss":{
    "1": -77678,
    "2": -183498,
    "3": -250476,
    "4": -261938,
    "5": -266505,
    "6": -187214,
    "7": -19324,
    "8": 207228,
    "9": 487017,
    "10": 808317,
    "11": 1137949,
    "12": 1473943,
    "13": 1492367,
    "14": 1511022,
    "15": 1529910,
    "16": 1549033,
    "17": 1568396,
    "18": 1588001,
    "19": 1607851,
    "20": 1627949,
    "21": 1648299,
    "22": 1668903,
    "23": 1689764,
    "24": 1710886,
    "25": 1732272,
    "26": 1753925,
    "27": 1775849,
    "28": 1798048
  },
    "ActualAccumulatedGainorLoss":{
    "1": -38839,
    "2": -91749,
    "3": -125238,
    "4": -130969,
    "5": -133252,
    "6": -93607,
    "7": -9662,
    "8": 103614,
    "9": 243508,
    "10": 404158,
    "11": 568974,
    "12": 736971,
    "13": 746183,
    "14": 755511,
    "15": 764955,
    "16": 774516
  }
}'

Genesis_summary = "Genesis is a boutique gym, similar in structure to a CrossFit, but differentiated by a Co-op
business structure, a holistic* approach to fitness, and the aesthetics of the space itself. Genesis
evolved from a group of fitness enthusiasts, techies and finance professionals in Upper Manhat-
tan working out and training together regularly. Our aspiration has been to start our own hub
for fitness and health for the area by taking a space on 146th to host workouts focused on high
intensity interval training and calisthenics. The space also hosts a cafe and multiple backrooms."


HamInn_start_date = '01/01/2017'
HamInn_end_date = '09/01/2019'
HamInn_cap_required = 40000
HamInn_current_cap = 40000
HamInn_votes = '{
  "03/01/2017":2000,
  "04/01/2017":1000,
  "05/01/2017":1000,
  "06/01/2017":1000,
  "07/01/2018":1000,
  "08/01/2018":1000,
  "11/11/2018":20000,
  "09/09/2018":10000,
  "08/10/2018":3000
}'
HamInn_lat = 40.836370
HamInn_lng = -73.944585
HamInn_sketch_link = 'https://drive.google.com/open?id=0B4qHw8trLI_qQ3VkX0RtRndqVTA'
HamInn_bus_link = 'https://drive.google.com/open?id=1zxY4cZcdaAMpinQpdZmTb8Zy2i9dh2iZ'
HamInn_cashflow = '{
   "ExpectedNet": {
      "1": -35673,
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
   "AccumulatedGainorLoss" : {
     "1": -77678,
     "2": -183498,
     "3": -250476,
     "4": -261938,
     "5": -266505,
     "6": -187214,
     "7": -19324,
     "8": 207228,
     "9": 487017,
     "10": 808317,
     "11": 1137949,
     "12": 1473943,
     "13": 1492367,
     "14": 1511022,
     "15": 1529910,
     "16": 1549033,
     "17": 1568396,
     "18": 1588001,
     "19": 1607851,
     "20": 1627949,
     "21": 1648299,
     "22": 1668903,
     "23": 1689764,
     "24": 1710886,
     "25": 1732272,
     "26": 1753925,
     "27": 1775849,
     "28": 1798048
   }
}'
HamInn_summary = "We work hard to set accurate expectations in our listings of our unique experience, and we
work hard to meet or exceed those expectations. However, we have no control over such
things as our location and the level of street noise around us, and we urge you to consider
the implications of reflecting these sorts of things in the number of stars you award us.
Ideally you would have understood and accepted these factors before booking. Feel free
to inform guests of these sorts of things in your text review, but none of them will see the
number of stars you give us, so we hope you will instead treat stars as only a reflection of
our performance as hosts."


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
  model_id: "7syizSLPN60",
  icon: "https://image.freepik.com/free-icon/picture-frame-with-mountain-image_318-40293.jpg",
  description: "BNB/ Business Incubator",
  creator_id: user2.id,
  created_at: "14/03/2018",
  status: "deployed",
  cashflow: Genesis_cashflow,
  votes:Genesis_votes,
  sketch_link: Genesis_sketch_link,
  bus_plan_link: Genesis_bus_link,
  start_date: Genesis_start_date,
  close_date: Genesis_end_date,
  latitude:HamInn_lat,
  longitude:HamInn_lng,
  summary:Genesis_summary,
  capital_required:Genesis_cap_required,
  current_capital:Genesis_current_cap
)

project2 = Project.create(
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

project3 = Project.create(
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

project4 = Project.create(
  title: "HamInn",
  revenue: 8000,
  valuation: 57000,
  city: "New York",
  country: "USA",
  continent: "North America",
  model_id: "7syizSLPN60",
  icon: "https://image.freepik.com/free-icon/picture-frame-with-mountain-image_318-40293.jpg",
  description: "BNB/ Business Incubator",
  creator_id: user2.id,
  created_at: "14/03/2018",
  status: "deployed",
  cashflow: HamInn_cashflow,
  sketch_link: HamInn_sketch_link,
  bus_plan_link: HamInn_bus_link,
  start_date: HamInn_start_date,
  close_date: HamInn_end_date,
  latitude:HamInn_lat,
  votes:HamInn_votes,
  longitude:HamInn_lng,
  summary:HamInn_summary,
  capital_required:HamInn_cap_required,
  current_capital:HamInn_current_cap
)
project5 = Project.create(
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
project6 = Project.create(
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
project6 = Project.create(
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
