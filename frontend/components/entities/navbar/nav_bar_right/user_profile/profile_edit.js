import React, { useState, useEffect } from "react";
import {
  fetchUser,
  updateUser,
} from "../../../../../actions/user_actions";
import { connect } from "react-redux";

const TextInputWithUpdate = (props) => (
  <div className="profile_item">
    <div className="profile_item_type">{props.input}</div>
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
    email: ""
  });

  useEffect(() => {
    setProfile(fetchUser(account, ''));
  }, [account]);

  const updateProfile = (e) => {
    setProfile(merge({}, profile, { [e.target.name]: e.target.value }));
  };

  return (
    <div className="profile_items">
      <TextInputWithUpdate input="firstName" placeholder="First Name" value={profile.firstName} onChange={updateProfile} />
      <TextInputWithUpdate input="lastName" placeholder="Last Name" value={profile.lastName} onChange={updateProfile} />
      <TextInputWithUpdate input="middleName" placeholder="Middle Name" value={profile.middleName} onChange={updateProfile} />
      <TextInputWithUpdate input="alias" placeholder="Alias" value={profile.alias} onChange={updateProfile} />
      <TextInputWithUpdate input="mobileNumber" placeholder="Mobile Number" value={profile.mobileNumber} onChange={updateProfile} />
      <TextInputWithUpdate input="nationality" placeholder="Nationality" value={profile.nationality} onChange={updateProfile} />
      <TextInputWithUpdate input="kyc" placeholder="KYC" value={profile.kyc} onChange={updateProfile} />
      <TextInputWithUpdate input="email" placeholder="Email" value={profile.email} onChange={updateProfile} disabled={profile.email == '' ? false : true}/>
      <div className="profile_item">
        
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    account: state.network.account,
  };
};

export default connect(mapStateToProps)(ProfileEdit);
