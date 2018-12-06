import React from 'react';
import ProjectDashboard from 'Entities/dashboard/project_dashboard/project_dashboard';
import { shallow, mount } from 'enzyme';

function setUp(){
  const props = {
    fetchProjects: jest.fn(() => {
      return Promise.resolve();
    }),
    currentUser: {
      email: "matsteele@gmail.com",
      password: "password"
    }
  };

  const eWrapper = shallow(<ProjectDashboard {...props}/>);
  const mountWrapper = mount(<ProjectDashboard {...props}/>);

  mountWrapper.setState({
    projectClicked: {
      title: "Project 1",
      summary: "Project Summary",
      model_id: "1",
      cashflow: projectCashflow
    },
    showText: true,
    openModal: true
  });

  return {
    props,
    eWrapper,
    mountWrapper
  };

}

describe('ProjectDashboard Component', () => {
  it('should render without throwing an error', () => {
    const { eWrapper } = setUp();
    expect(eWrapper).toMatchSnapshot();
  });

  // it('should have a summary', () => {
  //   const { mountWrapper } = setUp();
  //
  //   let summaryDiv = mountWrapper.find('div.project-summary')
  //   console.log(mountWrapper.props().currentUser);
  //   expect(summaryDiv.text()).toBeTruthy();
  // })

  it('should have a cashflow graph', () => {

  });

  it('should have a Project Thermo', () => {

  });

  it('should have a leaflet map', () => {

  });

});

let projectCashflow = `{
  "01A": -36974,
  "02A": -40018,
  "03A": -16857,
  "04A": -2915,
  "05A": -20325,
  "06A": 7864,
  "07A": 25360,
  "08A": 28107,
  "09A": 28942,
  "10A": 28696,
  "11A": 29356,
  "12A": 28854,
  "13A": 28588,
  "14A": 30781,
  "15A": 29081,
  "16A": 31887,
  "17A": 51887,
  "18A": 71887,
  "19P": 30339,
  "20P": 30718,
  "21P": 31102,
  "22P": 31491,
  "23P": 31885,
  "24P": 32283,
  "25P": 32687,
  "26P": 33096,
  "27P": 33509,
  "28P": 33928
}`;
