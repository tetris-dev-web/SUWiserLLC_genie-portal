import React from 'react';
import './landing.scss';
import { connect } from 'react-redux';

const Landing = ({ web3 }) => {
  return (

    <div className="box">
      <img className="landing-img"
        src="https://s3.amazonaws.com/genie-portal-dev/static/family.jpg"
        alt="family" />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    web3: state.network.web3
  }
}

export default connect(mapStateToProps)(Landing);



// <div className='login-wrapper'>
// </div>
// );

// <div className='login-prompt'>
//   <div className="login-text">Please login with MetaMask</div>
//   {web3 ? <div></div> : <a href="https://metamask.io/" target="_blank" className="metaMask-Button">Download MetaMask</a>}
// </div>
