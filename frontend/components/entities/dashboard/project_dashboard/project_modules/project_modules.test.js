import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'
import ProjectModules from 'Entities/dashboard/project_dashboard/project_modules'
import { shallow, mount, render as eRender } from 'enzyme'


// import {setUp} from './project_graph_d3logic';

function componentSetup(){
  const props = {
    fetchProjects: jest.fn(()=>{
      return Promise.resolve();
    })
  }
  const eWrapper = mount(<ProjectModules {...props}/>)
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
      expect(eWrapper).toMatchSnapshot();
   })

})

test('1 + 1 equals 2', () => {
  expect(1 + 3).toBe(4);
});
