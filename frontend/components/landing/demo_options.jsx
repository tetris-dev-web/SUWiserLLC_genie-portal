import React from 'react';
import { withRouter } from 'react-router';

class DemoOptions extends React.Component {

  constructor (props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick (demoType) {
    this.props.history.push(`/dashboard/${demoType}`);
  }

  render () {
    return (
      <div className='demo_options'>
        <DashBoardOption userDisplay={'demo investor dashboard'} navigateToDashBoard={() => this.handleClick('demoInvestor')}/>
        <DashBoardOption userDisplay={'demo developer dashboard'} navigateToDashBoard={() => this.handleClick('demoDeveloper')}/>
      </div>
    )
  }
}

const DashBoardOption = ({ userDisplay, navigateToDashBoard }) => {
  return (
    <div  className='bounceOnHover demo_option'>
      <p onClick={navigateToDashBoard}>{`${userDisplay}`}</p>
    </div>
  )
}

export default withRouter(DemoOptions);


// <DashBoardOption userDisplay={'demo with your own account'} navigateToDashBoard={() => this.handleClick('demo')}/>
