import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import DevInfoDropdown from './DevInfoDropdown';
import { setDemoType } from '../../../../actions/ui_actions';

class DeveloperInfo extends React.Component {
  constructor (props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick () {
    this.props.setDemoType('');
    this.props.history.push('/');
  }

  render() {
    const DevLogo = () => (
      <div className="DevLogo" onClick={this.handleClick}>
        <img className="gen-logo" src="https://s3.amazonaws.com/genie-portal-dev/static/logo.png"/>
        <div className="genus-dev-dash">
          <div className="gen-dev"> GENUS DEVELOPMENT </div>
          <div className="gen-dash"> GENIE DASHBOARD </div>
        </div>
      </div>
    );

  return (
      <div className= "navbar-left">
        <DevLogo />
        <DevInfoDropdown />
      </div>
  )}
}

const mapDispatchToProps = dispatch => {
  return {
    setDemoType: demoType => dispatch(setDemoType(demoType))
  }
}

export default withRouter(connect(null, mapDispatchToProps)(DeveloperInfo));
