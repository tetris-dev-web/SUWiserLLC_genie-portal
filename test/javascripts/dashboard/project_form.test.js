import React from 'react';
import ProjectForm from 'Entities/navbar/project_form/project_form';
import { shallow, mount, render } from 'enzyme';

function setUp(){
  const props = {
    fetchProjects: jest.fn(() => {
      return Promise.resolve();
    }),
    projects: {
      project1: projectCashflow
    }
  };
  const eWrapper = shallow(<ProjectForm {...props}/>);
  const mountWrapper = mount(<ProjectForm {...props}/>);
  return {
    props,
    eWrapper,
    mountWrapper
  };
}

describe('Project Form Component', () => {

  it('should render without throwing an error', () => {
    const { eWrapper } = setUp()
    expect(eWrapper).toMatchSnapshot();
  });

  it('expects props', () => {
    const { eWrapper } = setUp()
    expect(eWrapper.props).toBeTruthy();
  });

  it('Correctly enters a title', () => {
    const { eWrapper } = setUp();
    let projectTitleInput = eWrapper.find('.project-title-input');
    projectTitleInput.value = "Project";
    expect(projectTitleInput.value).toEqual("Project")
  });

  it('Expects discount rate to have text', () => {
    const { mountWrapper } = setUp();
    let discountFactorBox = mountWrapper.find('div.amount-box');
    expect(discountFactorBox.text()).toBeTruthy();
    console.log("Text is: ", discountFactorBox.text());
  })

})

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
