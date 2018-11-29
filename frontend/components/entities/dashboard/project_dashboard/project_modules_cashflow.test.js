import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'
import CashFlowGraph from 'Entities/dashboard/project_dashboard/project_modules_cashflow'
import { shallow, mount, render as eRender } from 'enzyme'


// import {setUp} from './project_graph_d3logic';

function componentSetup(){
  const props = {
    fetchProjects: jest.fn(()=>{
      return Promise.resolve();
    }),
    actual_cashflow: {1:10, 2:-30, 3:40, 4:50},
    accum_actual_cashflow: {1:10, 2:-20, 3:20, 4:70},
    projected_cashflow: {1:10, 2:-15, 3:60, 4:80},
    accum_projected_cashflow: {1:10, 2:-5, 3:55, 4:140},
    height: 200,
    width: 300,
  }
  const eWrapper = mount(<CashFlowGraph {...props}/>)
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




   it('scales should default to the min/max of projected or actual cashflows', () => {
     const {props, eWrapper} = componentSetup()
     const [xAxisScale, yAxisScale, yLinesScale] = eWrapper.instance().defineScales()

     expect(xAxisScale(2)).toEqual(props.width/Object.keys(props.actual_cashflow).length*2)
     expect(yAxisScale(20)).toEqual(-342)
     expect(yLinesScale(20)).toEqual(-24.666666666666686)

   })

})

test('1 + 1 equals 2', () => {
  expect(1 + 3).toBe(4);
});

//
// accum_actual_cashflow = {
//   1: 36974
//   2: 76992
//   3: 93849
//   4: 90934
//   5: 111259
//   6: 119123
//   7: 144483
//   8: 172590
//   9: 0
//   10: 0
//   11: 0
//   12: 0
//   13: 0
//   14: 0
//   15: 0
//   16: 0
//   17: 0
//   18: 0
//   19: 0
//   20: 0
//   21: 0
//   22: 0
//   23: 0
//   24: 0
//   25: 0
//   26: 0
//   27: 0
//   28: 0
// }
