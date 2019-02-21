import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'
import {VotesGraph as Graph} from 'Entities/dashboard/project_dashboard/votes_view/votes_graph'
import { shallow, mount, render as eRender } from 'enzyme'


// import {setUp} from './project_graph_d3logic';

function componentSetup(){
  const props = {
    fetchProjects: jest.fn(()=>{
      return Promise.resolve();
    }),
    prop_sample:  {1:0, 2:-30, 3: -10,  4: 0,   5: 0},
  }
  const eWrapper = shallow(<Graph {...props}/>)
  return {
    props,
    eWrapper
  }
}


describe('Project Module Component', () => {
 // it('the data being rendered should match the number of projects in the database', () => {
 //   const { eWrapper} = setup()
 //   // expect(eWrapper.find('section').hasClass('graph-container')).toBe(true)
 //    expect(eWrapper).toMatchSnapshot();
 // })


   it('should match snapshot', () => {
     const { eWrapper} = componentSetup()
     // expect(eWrapper.find('section').hasClass('graph-container')).toBe(true)
      expect(eWrapper).toMatchSnapshot()
   })




})
