import React, { useState, useEffect } from "react";
import { merge } from "lodash";

import {
  fetchUser,
  updateUser,
} from "../../../../../actions/user_actions";
import { connect } from "react-redux";

const TextInputWithUpdate = (props) => (
  <div className="profile_item">
    <div className={`profile_item_type ${props.error ? 'error' : ''}`}>{props.placeholder}</div>
    <input
      className={`text-input ${props.input}-input`}
      key={props.input}
      type="text"
      placeholder={props.placeholder}
      name={props.input}
      onChange={props.onChange}
      value={props.value}
      disabled={props.disabled ? true : false}
    />
  </div>
);

const ProfileEdit = (props) => {
  const { account } = props;

  const [profile, setProfile] = React.useState({
    firstName: "",
    middleName: "",
    lastName: "",
    alias: "",
    mobileNumber: "",
    nationality: "",
    kyc: "",
    email: ''
  });

  const [profileError, setProfileError] = React.useState({
    firstName: false,
    middleName: false,
    lastName: false,
    alias: false,
    mobileNumber: false,
    nationality: false,
    kyc: false,
    email: false
  });

  const [isInit, setIsInit] = React.useState(true);

  useEffect(() => {
    // setProfile(fetchUser(account, ''));
  }, [account]);

  const updateProfile = (e) => {
    setProfile(merge({}, profile, { [e.target.name]: e.target.value }));
    if (e.target.name == "email") setIsInit(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let isError = false;
    let errorFirstName = false;
    if (profile.firstName == '') {errorFirstName = true; isError = true;}

    let errorLastName = false;
    if (profile.lastName == '') {errorLastName = true; isError = true;}

    let errorAlias = false;
    if (profile.alias == '') {errorAlias = true; isError = true;}

    let errorMobileNumber = false;
    if (profile.mobileNumber == '') {errorMobileNumber = true; isError = true;}

    let errorNationality = false;
    if (profile.nationality == '') {errorNationality = true; isError = true;}

    let errorKyc = false;
    if (profile.kyc == '') {errorKyc = true; isError = true;}

    let errorEmail = false;
    if (profile.email == '') {errorEmail = true; isError = true;}

    setProfileError({
      firstName: errorFirstName,
      middleName: false,
      lastName: errorLastName,
      alias: errorAlias,
      mobileNumber: errorMobileNumber,
      nationality: errorNationality,
      kyc: errorKyc,
      email: errorEmail
    });

    console.log(isError);
    if(!isError) {
      console.log(profile);
      updateUser(profile);
    }
  };

  return (
    <div className="profile_items">
      <form className="p-form-box" onSubmit={handleSubmit}>
        <TextInputWithUpdate input="firstName" placeholder="First Name" value={profile.firstName} error={profileError.firstName} onChange={updateProfile} />
        <TextInputWithUpdate input="middleName" placeholder="Middle Name" value={profile.middleName} error={profileError.middleName} onChange={updateProfile} />
        <TextInputWithUpdate input="lastName" placeholder="Last Name" value={profile.lastName} error={profileError.lastName} onChange={updateProfile} />
        <TextInputWithUpdate input="alias" placeholder="Alias" value={profile.alias} error={profileError.alias} onChange={updateProfile} />
        <TextInputWithUpdate input="mobileNumber" placeholder="Mobile Number" value={profile.mobileNumber} error={profileError.mobileNumber} onChange={updateProfile} />
        <TextInputWithUpdate input="nationality" placeholder="Nationality" value={profile.nationality} error={profileError.nationality} onChange={updateProfile} />
        <TextInputWithUpdate input="kyc" placeholder="KYC" value={profile.kyc} error={profileError.kyc} onChange={updateProfile} />
        <TextInputWithUpdate input="email" placeholder="Email" value={profile.email} error={profileError.email} onChange={updateProfile} disabled={(profile.email == '' || !isInit) ? false : true}/>
        <div className="profile_item">
          <input className="profile_item_button submit-button" type="submit" value="Save" />
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    account: state.network.account,
  };
};

export default connect(mapStateToProps)(ProfileEdit);
