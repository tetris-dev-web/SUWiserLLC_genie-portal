import React from 'react'
import ProjectGraph from 'Entities/dashboard/project_dashboard/project_graph'
import { shallow, mount, render } from 'enzyme';

function setup(){
  const props = {
    fetchProjects: jest.fn(()=>{
      return Promise.resolve();
    })
  }
  const eWrapper = mount(<ProjectGraph {...props}/>)
  return {
    props,
    eWrapper
  }
}


// describe what we are testing
describe('Project Graph Component', () => {
 // make our assertion and what we expect to happen


 it('should render without throwing an error', () => {

   const { eWrapper} = setup()
   //
   // expect(eWrapper.find('section').hasClass('graph-container')).toBe(true)

    expect(eWrapper).toMatchSnapshot();




 })
})

test('1 + 1 equals 2', () => {
  expect(1 + 3).toBe(4);
});
