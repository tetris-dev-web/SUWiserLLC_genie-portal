import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'
import CashflowInputSheet from 'Entities/navbar/project_form/cashflow_modal/cashflow_input_sheet'
import { shallow, mount, render as eRender } from 'enzyme'


// import {setUp} from './project_graph_d3logic';

function componentSetup(){
  const props = {
    fetchProjects: jest.fn(()=>{
      return Promise.resolve();
    })
  }
  const eWrapper = mount(<CashflowInputSheet {...props}/>)
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
