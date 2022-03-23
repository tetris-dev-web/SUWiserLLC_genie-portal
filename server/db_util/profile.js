const ProfileModel = require('./models/profile_model');

const getData = async (condition) => {
  let newProfileInstance;
  await ProfileModel.findOne(condition, function (err, profile_instance) {
    if (err) return console.log(err);
    newProfileInstance = profile_instance;
  });

  return newProfileInstance != null ? newProfileInstance : {};
}

const setData = async (data) => {
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
