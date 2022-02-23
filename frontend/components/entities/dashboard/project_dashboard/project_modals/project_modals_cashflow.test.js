import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import CashFlowGraph from "Entities/dashboard/project_dashboard/project_modals_cashflow";
import { shallow, mount, render as eRender } from "enzyme";

// import {setUp} from './project_graph_d3logic';

function componentSetup() {
  const props = {
    fetchProjects: jest.fn(() => {
      return Promise.resolve();
    }),
    actual_cashflow: { 1: 0, 2: -30, 3: -10, 4: 0, 5: 0 },
    accum_actual_cashflow: { 1: 0, 2: -30, 3: -40, 4: 0, 5: 0 },
    projected_cashflow: { 1: 0, 2: -15, 3: -10, 4: 40, 5: 45 },
    accum_projected_cashflow: { 1: 0, 2: -15, 3: -25, 4: 15, 5: 60 },
    height: 200,
    width: 300,
  };
  const eWrapper = mount(<CashFlowGraph {...props} />);
  return {
    props,
    eWrapper,
  };
}

describe("Project Module Component", () => {
  // it('the data being rendered should match the number of projects in the database', () => {
  //   const { eWrapper} = setup()
  //   // expect(eWrapper.find('section').hasClass('graph-container')).toBe(true)
  //    expect(eWrapper).toMatchSnapshot();
  // })

  it("should match snapshot", () => {
    const { eWrapper } = componentSetup();
    // expect(eWrapper.find('section').hasClass('graph-container')).toBe(true)
    expect(eWrapper).toMatchSnapshot();
  });

  it("scales should default to the min/max of projected or actual cashflows", () => {
    const { props, eWrapper } = componentSetup();
    const { xAxisScale, yAxisScale, yLinesScale, maxValue, minValue, minExpectedValueAccuProj } =
      eWrapper.instance().defineScales();

    expect(maxValue).toEqual(-25);
    expect(minValue).toEqual(-40);
    expect(minExpectedValueAccuProj).toEqual(-25);

    expect(xAxisScale(2)).toEqual(124);
    expect(yAxisScale(20)).toEqual(627);
    expect(yLinesScale(20)).toEqual(254);
  });

  it("cashflow should be formatted to output just values, identify currentQuarter and identify min/max", () => {
    const { props, eWrapper } = componentSetup();

    const {
      currentQuarter,
      actualPoints,
      actualAccumulatedPoints,
      projectedPoints,
      projectedAccumulatedPoints,
    } = eWrapper.instance().formatCashData();

    expect(currentQuarter).toEqual(4);

    expect(actualPoints).toEqual([
      { x: 0, y: 0 },
      { x: 1, y: -30 },
      { x: 2, y: -10 },
      { x: 3, y: 0 },
      { x: 4, y: 0 },
    ]);
    expect(actualAccumulatedPoints).toEqual([
      { x: 0, y: 0 },
      { x: 1, y: -30 },
      { x: 2, y: -40 },
      { x: 3, y: 0 },
      { x: 4, y: 0 },
    ]);
    expect(projectedPoints).toEqual([
      { x: 0, y: 0 },
      { x: 1, y: -15 },
      { x: 2, y: -10 },
      { x: 3, y: 40 },
      { x: 4, y: 45 },
    ]);
    expect(projectedAccumulatedPoints).toEqual([
      { x: 0, y: 0 },
      { x: 1, y: -15 },
      { x: 2, y: -25 },
      { x: 3, y: 15 },
      { x: 4, y: 60 },
    ]);
  });
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
