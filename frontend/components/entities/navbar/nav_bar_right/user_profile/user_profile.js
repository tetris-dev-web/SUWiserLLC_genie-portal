import React from 'react';
import Modal from 'react-modal';
import ProfileContent from './profile_content';
import './user_profile.scss';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showProfile: false
    }
    this.setShowProfileStatus = this.setShowProfileStatus.bind(this);
  }

  setShowProfileStatus (status) {
    this.setState({
      showProfile: status
    })
  }

  render () {
    console.log(this.state, 'stateee')
    return (
      <div className='user_profile'>
        <div onClick={() => this.setShowProfileStatus(true)}>DEMO USER</div>
        <img
        className="button-img"
        src="https://s3.amazonaws.com/genie-portal-dev/static/profile.svg"
        onClick={() => this.setShowProfileStatus(true)}
        />
        <Modal
        className='user_profile_modal'
        isOpen={this.state.showProfile}
        onRequestClose={() => this.setShowProfileStatus(false)}
        >
        <ProfileContent />
        </Modal>
      </div>
    );
  }
}

export default UserProfile;
