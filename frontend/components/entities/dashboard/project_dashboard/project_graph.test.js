import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'
import ProjectGraph from 'Entities/dashboard/project_dashboard/project_graph'
import { shallow, mount, render as eRender } from 'enzyme'
import ReactFauxDOM from 'react-faux-dom'
import * as d3 from 'd3';
import {event as currentEvent} from 'd3-selection';

const margin = {top: 20, right: 20, bottom: 30, left: 50};
const width = 960 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;
const citySquareSide = 15;
const continentSquareSide = 5;

// import {setUp} from './project_graph_d3logic';

function componentSetup(){
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


describe('Project Graph Component', () => {
 // it('the data being rendered should match the number of projects in the database', () => {
 //   const { eWrapper} = setup()
 //   // expect(eWrapper.find('section').hasClass('graph-container')).toBe(true)
 //    expect(eWrapper).toMatchSnapshot();
 // })



   let node,
   Component;

   beforeEach(() => {
     node = document.createElement('svg');
   })

   afterEach(() => {
     unmountComponentAtNode(node);
   })


   it('d3 should create a render', () => {

     let nodeLoader = ReactFauxDOM.createElement('div');

     function divElement() {
       return d3.select(nodeLoader).append('svg')
              .classed('project-svg', true)
              .attr("preserveAspectRatio", "xMinYMin meet")
              .attr("viewBox", "0 0 700 500")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom);
     }

    divElement = mount(nodeLoader)

    expect(divWrapper.find('svg')).to.have.length(1);

     //
     // const { eWrapper} = componentSetup()

     var data = [4, 8, 15, 16, 23, 42]


   })


   it('should match snapshot', () => {
     const { eWrapper} = componentSetup()
     // expect(eWrapper.find('section').hasClass('graph-container')).toBe(true)
      expect(eWrapper).toMatchSnapshot();
   })

})

test('1 + 1 equals 2', () => {
  expect(1 + 3).toBe(4);
});
