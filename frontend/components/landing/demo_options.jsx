import React from 'react';
import { withRouter } from 'react-router';

class DemoOptions extends React.Component {
  handleClick (demoType) {
    this.props.history.push(`/dashboard/${demoType}`);
  }

  render () {
    return (
      <div className='demo_options'>
        <DashBoardOption userDisplay={'proceed to dashboard with my own account'} navigateToDashBoard={() => handleClick('demo')}/>
        <DashBoardOption userDisplay={'demo investor dashboard'} navigateToDashBoard={() => handleClick('demoInvestor')}/>
        <DashBoardOption userDisplay={'demo developer dashboard'} navigateToDashBoard={() => handleClick('demoDeveloper')}/>
      </div>
    )
  }
}

const DashBoardOption = ({ userDisplay, navigateToDashBoard }) => {
  return (
    <div className='demo_option'>
      <p onClick={navigateToDashBoard}>{`${userDisplay}`}</p>
    </div>
  )
}

export default withRouter(DemoOptions);
