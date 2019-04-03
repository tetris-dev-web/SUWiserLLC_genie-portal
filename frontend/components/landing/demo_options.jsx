import React from 'react';

export const DemoOptions = ({ handleClick }) => {
  return (
    <div className='demo_options'>
      <DashBoardOption userDisplay={'demo investor dashboard'} navigateToDashBoard={() => handleClick('demoInvestor')}/>
      <DashBoardOption userDisplay={'demo developer dashboard'} navigateToDashBoard={() => handleClick('demoDeveloper')}/>
    </div>
  )
}

const DashBoardOption = ({ userDisplay, navigateToDashBoard }) => {
  return (
    <div className='demo_option'>
      <p onClick={navigateToDashBoard}>{`${userDisplay}`}</p>
    </div>
  )
}
