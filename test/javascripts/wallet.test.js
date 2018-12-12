
import React from 'react';
import Wallet from 'Entities/navbar/user_dropdown/wallet/wallet';
import { shallow, mount } from 'enzyme';

function setUp(){
 const props = {
   fetchProjects: jest.fn(() => {
     return Promise.resolve();
   })
 };
 const eWrapper = shallow(<Wallet {...props}/>);
 const mountWrapper = mount(<Wallet {...props}/>);
 return {
   props,
   eWrapper,
   mountWrapper
 };
}

describe('Wallet information', () => {
  it('should render without throwing an error', () => {
    const { eWrapper } = setUp()
    expect(eWrapper).toMatchSnapshot();
  });
  it('expects props', () => {
    const { eWrapper } = setUp()
    expect(eWrapper.props).toBeTruthy();
  });
})
