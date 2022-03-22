const {getData, setData} = require("../db_util/profile");

const getProfileDataByEmail = async (email) => {
  return await getData({email: email});
};

const getProfileDataByAddress = async (address) => {
  return await getData({address: address});
};

const saveProfileData = async (profile) => {
  return await setData(profile, {email: profile.email});
};

module.exports = {
  getProfileDataByEmail,
  getProfileDataByAddress,
  saveProfileData,
};
