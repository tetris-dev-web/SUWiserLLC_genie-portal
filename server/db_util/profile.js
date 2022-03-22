const _database = 'genie-portal-nft';
const _collection = 'profiles';
const mongoose = require('mongoose');
const { getProfileDataByEmail } = require('../controllers/profile_controller');
const ProfileModel = require('./models/profile_model');

const _connectMongoClusterClient = () => {
  const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER_NAME}.srdd2.mongodb.net/${_database}?retryWrites=true&w=majority`;
  mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
      .then(() => console.log('MongoDB Database Connected'))
      .catch(err => console.log(err)) 
}

const getData = async (condition) => {
  await _connectMongoClusterClient();

  let newProfileInstance;
  await ProfileModel.findOne(condition, function (err, profile_instance) {
    if (err) return console.log(err);
    newProfileInstance = profile_instance;
  });

  return newProfileInstance != null ? newProfileInstance : {};
}

const setData = async (data) => {
  await _connectMongoClusterClient();

  var profile_instance = {
    first_name: data.firstName,
    middle_name: data.middleName,
    last_name: data.lastName,
    alias: data.alias,
    mobile_number: data.mobileNumber,
    nationality: data.nationality,
    kyc: data.kyc,
    address: data.address,
    email: data.email,
    updated_at: Date.now()
  };

  // Check the data is exist
  ProfileModel.findOneAndUpdate({email : data.email}, profile_instance, {upsert : true}, (err, doc) => {
    if (err) return console.log(err);
  });

  return profile_instance;
}

module.exports = {
  getData,
  setData,
};
