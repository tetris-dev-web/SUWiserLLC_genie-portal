const {getData, setData} = require("../db_util/profile");

const getProfileDataByEmail = async (email) => {
  const profile = await getData({email: email});

  return {
    firstName : profile.first_name,
    middleName : profile.middle_name,
    lastName : profile.last_name,
    alias : profile.alias,
    mobileNumber : profile.mobile_number,
    nationality : profile.nationality,
    kyc : profile.kyc,
    email : profile.email,
    account : profile.address
  };
};

const getProfileDataByAddress = async (address) => {
  const profile = await getData({address: address});

  return {
    firstName : profile.first_name,
    middleName : profile.middle_name,
    lastName : profile.last_name,
    alias : profile.alias,
    mobileNumber : profile.mobile_number,
    nationality : profile.nationality,
    kyc : profile.kyc,
    email : profile.email,
    account : profile.address
  };
};

const saveProfileData = async (profile) => {
  return await setData(profile, {email: profile.email});
};

module.exports = {
  getProfileDataByEmail,
  getProfileDataByAddress,
  saveProfileData,
};
