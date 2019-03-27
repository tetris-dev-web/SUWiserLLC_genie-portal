import React from 'react';
import DevInfoDropdown from './DevInfoDropdown';

class DeveloperInfo extends React.Component {

  render() {
    const DevLogo = () => (
      <div className="DevLogo">
        <img className="gen-logo" src="https://s3.amazonaws.com/genie-portal-dev/static/logo.png"/>
        <div className="genus-dev-dash">
          <div className="gen-dev"> GENUS DEVELOPMENT </div>
          <div className="gen-dash"> GENIE DASHBOARD </div>
        </div>
      </div>
    );
console.log("develoepr info component")
  return (
      <div className= "navbar-left">
        <DevLogo />
        <DevInfoDropdown />
      </div>
  )}
}

export default DeveloperInfo;
