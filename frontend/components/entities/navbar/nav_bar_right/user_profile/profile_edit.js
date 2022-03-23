import React, { useState, useEffect } from "react";
import Loader from "../../../dashboard/loader/loader";
import { merge } from "lodash";

import {
  fetchUser,
  updateUser,
} from "../../../../../actions/user_actions";
import { connect } from "react-redux";

import { fetchInvestorDividend } from "../../../../../actions/chain_actions/dividends_actions";
import { fetchInvestorPurchaseTotal, fetchInvestorAccountBalance } from "../../../../../actions/chain_actions/token_actions";

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
  const {
    updateUser,
    fetchUser,
  } = props;

  const [profile, setProfile] = React.useState({
    firstName: "",
    middleName: "",
    lastName: "",
    alias: "",
    mobileNumber: "",
    nationality: "",
    kyc: "",
    email: '',
    account : account
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

  const [isLoading, setIsLoading] = React.useState(true);
  const [isInit, setIsInit] = React.useState(true);
  const [saveLabel, setSaveLabel] = React.useState('Save');
  const [getEmail, setGetEmail] = React.useState('');

  useEffect(() => {
    fetchUser(account, '').then((existingProfile) => {
      setIsLoading(false);
      setProfile(merge({}, existingProfile, {account: account}));
    });

    fetchInvestorDividend(account).then((amount) => {
      console.log(amount);
    });
    fetchInvestorPurchaseTotal(account).then((amount) => {
      console.log(amount);
    });
    
    fetchInvestorAccountBalance(account).then((amount) => {
      console.log(amount);
    });

  }, [account]);

  const updateProfile = (e) => {
    setProfile(merge({}, profile, { [e.target.name]: e.target.value }));
    if (e.target.name == "email") setIsInit(false);
    setSaveLabel('Save');
  };

  const onGetEmailChange = (e) => {
    setGetEmail(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    let isError = false;
    let errorFirstName = false;
    if (profile.firstName == '' || profile.firstName == null) {errorFirstName = true; isError = true;}

    let errorLastName = false;
    if (profile.lastName == '' || profile.lastName == null) {errorLastName = true; isError = true;}

    let errorAlias = false;
    if (profile.alias == '' || profile.alias == null) {errorAlias = true; isError = true;}

    let errorMobileNumber = false;
    if (profile.mobileNumber == '' || profile.mobileNumber == null) {errorMobileNumber = true; isError = true;}

    let errorNationality = false;
    if (profile.nationality == '' || profile.nationality == null) {errorNationality = true; isError = true;}

    let errorKyc = false;
    if (profile.kyc == '' || profile.kyc == null) {errorKyc = true; isError = true;}

    let errorEmail = false;
    if (profile.email == '' || profile.email == null) {errorEmail = true; isError = true;}

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

    if(!isError) {
      setSaveLabel('Saving ...');
      setIsLoading(true);
      updateUser(profile).then((newProfile) => {
        setSaveLabel('Saved !');
        setIsLoading(false);
      });
    }
  };

  const onGetProfileByEmail = () => {

    let errorEmail = false;
    if (onGetEmailChange == '' || onGetEmailChange == null) {errorEmail = true;}

    if(!errorEmail) {
      setIsLoading(true);
      fetchUser('', getEmail).then((existingProfile) => {
        setProfile({
          firstName: existingProfile.firstName == null ? '' : existingProfile.firstName,
          middleName: existingProfile.middleName == null ? '' : existingProfile.middleName,
          lastName: existingProfile.lastName == null ? '' : existingProfile.lastName,
          alias: existingProfile.alias == null ? '' : existingProfile.alias,
          mobileNumber: existingProfile.mobileNumber == null ? '' : existingProfile.mobileNumber,
          nationality: existingProfile.nationality == null ? '' : existingProfile.nationality,
          kyc: existingProfile.kyc == null ? '' : existingProfile.kyc,
          email: existingProfile.email == null ? '' : existingProfile.email,
          account : existingProfile.account == null ? '' : existingProfile.account
        });
        setIsLoading(false);
      });
    }
  };

  return (
    <div className="profile_items">
      {isLoading ? <Loader /> : '' }
      <form className="p-form-box" onSubmit={handleSubmit}>
        <div className="profile_item">
          <div className={`profile_item_type`}>Account</div>
          <input
            className={`text-input email-input`}
            type="text"
            value={profile.account}
            disabled
          />        
        </div>

        <TextInputWithUpdate input="firstName" placeholder="First Name" value={profile.firstName} error={profileError.firstName} onChange={updateProfile} />
        <TextInputWithUpdate input="middleName" placeholder="Middle Name" value={profile.middleName} error={profileError.middleName} onChange={updateProfile} />
        <TextInputWithUpdate input="lastName" placeholder="Last Name" value={profile.lastName} error={profileError.lastName} onChange={updateProfile} />
        <TextInputWithUpdate input="alias" placeholder="Alias" value={profile.alias} error={profileError.alias} onChange={updateProfile} />
        <TextInputWithUpdate input="mobileNumber" placeholder="Mobile Number" value={profile.mobileNumber} error={profileError.mobileNumber} onChange={updateProfile} />
        <TextInputWithUpdate input="nationality" placeholder="Nationality" value={profile.nationality} error={profileError.nationality} onChange={updateProfile} />
        <TextInputWithUpdate input="kyc" placeholder="KYC" value={profile.kyc} error={profileError.kyc} onChange={updateProfile} />
        <TextInputWithUpdate input="email" placeholder="Email" value={profile.email} error={profileError.email} onChange={updateProfile} disabled={(profile.email == '' || profile.email == null || !isInit) ? false : true}/>
        <div className="profile_item">
          <input className="profile_item_button submit-button" type="submit" value={saveLabel} />
        </div>
        <div className="profile_item">
          <div className={`profile_item_type ${props.error ? 'error' : ''}`}>
          <input className="profile_item_button submit-button" type="button" onClick = {onGetProfileByEmail} value="Get profile by email" />
          </div>
          <input
            className={`text-input email-input`}
            type="text"
            placeholder="email"
            onChange={onGetEmailChange}
            value={getEmail}
          />        
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
const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: (account, email) => dispatch(fetchUser(account, email)),
    updateUser: (profile) => dispatch(updateUser(profile)),
    fetchInvestorDividend: (account) => dispatch(fetchInvestorDividend(account)),
    fetchInvestorPurchaseTotal: (account) => dispatch(fetchInvestorPurchaseTotal(account)),
    fetchInvestorAccountBalance: (account) => dispatch(fetchInvestorAccountBalance(account)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);
