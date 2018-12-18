import React from 'react';
import ProjectGraph from '../../frontend/components/entities/dashboard/project_dashboard/project_graph'
import { shallow, mount } from 'enzyme';

function componentSetup(){
  const props = {
    fetchProjects: jest.fn(()=>{
      return Promise.resolve();
    })
  }
  const eWrapper = shallow( <ProjectGraph {...props} /> )
  return {
    props,
    eWrapper
  }
}

describe('Project Graph Test', () => {
  it('should match snapshot', () => {
    const { eWrapper} = componentSetup()
    // expect(eWrapper.find('section').hasClass('graph-container')).toBe(true)
    expect(eWrapper).toMatchSnapshot();
  })
})
