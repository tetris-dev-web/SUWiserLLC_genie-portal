// import 'bootstrap/dist/css/bootstrap.css';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import React from 'react';
// import Modal from 'react-modal';

// import UserDropdown from './user_dropdown';
// import ModalStyle from './modal_style';

// import Wallet from './wallet/wallet';
// import ProfileContainer from './profile/profile_container';

class UserDropdown extends React.Component {
  constructor(props) {
    super(props);
    //
    // var fName = this.props.user.first_name;
    // var lName = this.props.user.last_name;
    // var uName = this.props.user.username;
    //
    // var userType = fName && lName ? `${fName} ${lName}` : uName;
    //
    // /*
    // We initially set the state of the displayName to either the user's
    // first and last name (if they have updated their profile with this information)
    // or to their truncated username.
    // */
    //
    // this.state = {
    //   openModal: false,
    //   displayName: userType,
    //   user_tokens: 500,
    //   total_tokens: 49500
    // };
    //
    // window.SessionOpenModal = () => {
    //   this.setState({openModal: true});
    // };
    //
    // window.SessionOpenModal = window.SessionOpenModal.bind(this);
    //
    // this.openModal = this.openModal.bind(this);
    // this.closeModal = this.closeModal.bind(this);
    // this.updateUsernameDisplay = this.updateUsernameDisplay.bind(this);
    // this.handleLogOut = this.handleLogOut.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      // dropdownOpen: false
      dropdownOpen: true
    };
  }

  toggle() {
    this.setState({
      // dropdownOpen: !this.state.dropdownOpen
      dropdownOpen: true
    });
  }

  // openModal() {
  //   this.setState({openModal: true});
  // }
  //
  // closeModal() {
  //   this.setState({openModal: false});
  // }

  // updateUsernameDisplay(user) {
  //   var input = '';
  //
  //   if(user.first_name && user.last_name) {
  //     input = `${user.first_name} ${user.last_name}`;
  //   } else {
  //     input = user.username;
  //   }
  //   this.setState({ displayName: input });
  // }

  /*
  this function serves to update the user's display name on the
  underlying Navbar Component upon updating their profile, via being
  passed down through props to the Profile Component.
  */

  // handleLogOut(e) {
  //   e.preventDefault();
  //   this.props.logout();
  // }

  // componentWillMount() {
  //   this.props.fetchUser(this.props.currentUser.id);
  // }

  handleLogOut(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {

    // let { user_tokens, total_tokens } = this.state;
    return (
      <div>
        <div id="dropdown-container" className="dropdown">
          <a id="dLabel" role="button" data-toggle="dropdown" className="dropdown-link">
            <div className="user-dropdown-button">
              {/* {this.props.currentUser.email} */}
              <hr/>
              <div className="tokens-div">
                <div id="t-d-1">50 tokens</div>
              </div>
            </div>
          </a>
      		<ul className="dropdown-menu multi-level" role="menu" aria-labelledby="dropdownMenu">
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle caret>
                click me
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem divider />
                <DropdownItem>Another Action</DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <li>
              <a className="logout-button" onClick={this.props.logout}>
                <img className="button-img" src="http://res.cloudinary.com/genus-development/image/upload/v1504727474/exit-white_ox7kfe.svg" />
                <div className="button-text">log&nbsp;out</div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default UserDropdown;
