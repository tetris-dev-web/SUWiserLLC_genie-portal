import { keys } from 'lodash'; // TODO - see if .keys works instead of keys()

export const fetchProjects = () => {
  console.log("projectList",$.ajax({
    method: 'GET',
    url: 'api/projects',
  }))
  return $.ajax({
    method: 'GET',
    url: 'api/projects',
  });

};

export const fetchProject = id => {
  return $.ajax({
    method: 'GET',
    url: `api/projects/${id}`,
  });
};

export const createProject = formData => {
  debugger
  return $.ajax({
    method: 'POST',
    url: 'api/projects',
    // processData: false,
    // contentType: false,
    // dataType: 'json',
    data: {project: formData}
  });
};

export const editProject = project => {
  return $.ajax({
    method: 'PATCH',
    url: `api/projects/${project.id}`,
    data: { project }
  });
};

export const getFailedProjects = () => {
  return $.ajax({
    method: 'GET',
    url: 'api/projects/failed_projects_count'
  });
};



export const formatProjectData = (cashflow) => {
  let {
    projected_cashflow,
    actual_cashflow,
    accum_actual_cashflow,
    accum_projected_cashflow,
    accumulated_revenue
  } = parseCashflows(cashflow);

  return {
    projected_cashflow,
    actual_cashflow,
    accum_actual_cashflow,
    accum_projected_cashflow,
    accumulated_revenue
  };
};

export const parseCashflows = cashflow => {
  let accumulatedSum = 0;
  let actualSum = 0;
  let projectedSum = 0;

  return Object.keys(cashflow).reduce((result, quarter) => {
    accumulatedSum += cashflow[quarter]["cashFlow"];
    result.accumulated_revenue[quarter] = accumulatedSum;

    if (cashflow[quarter]["isActuals"]) {
      actualSum += cashflow[quarter]["cashFlow"];


      result.projected_cashflow[quarter] = 0;
      result.actual_cashflow[quarter] = cashflow[quarter]["cashFlow"];
      result.accum_actual_cashflow[quarter] = actualSum;
      result.accum_projected_cashflow[quarter] = 0;
    } else {
      projectedSum += cashflow[quarter]["cashFlow"];

      result.projected_cashflow[quarter] = cashflow[quarter]["cashFlow"]
      result.actual_cashflow[quarter] = 0
      result.accum_actual_cashflow[quarter] = 0
      result.projected_sum = projectedSum;
      result.accum_projected_cashflow[quarter] = cashflow[quarter]["cashFlow"]
    }

    return result;
  }, {
    projected_cashflow: {},
    actual_cashflow: {},
    accum_actual_cashflow: {},
    accum_projected_cashflow: {},
    accumulated_revenue: {}
  });
}

// export const calculateAccumulatedRevenue = (cashflow) => {
//   const accumulatedRevenue = {};
//   let accumulatedSum = 0;
//   const quarters = keys(cashflow).map(Number).sort((a, b) => (a - b));
//   quarters.forEach(quarter => {
//     accumulatedSum += cashflow[quarter.toString()]['cashFlow'];
//     accumulatedRevenue[quarter.toString()] = accumulatedSum;
//   });
//
//   return accumulatedRevenue;
// };
//
// export const calculateCashflowData = (cashflow) => {
//   const projectedCashflow = {}
//   const actualCashflow = {}
//   const accumActualCashflow = {}
//   const accumProjectedCashflow = {};
//   let actualSum = 0;
//   let projectedSum = 0
//
//   for (var quarter in cashflow) {
//
//     if (cashflow[quarter]["isActuals"] === true){
//       projectedCashflow[quarter] = 0
//       actualCashflow[quarter] = cashflow[quarter]["cashFlow"]
//       actualSum += cashflow[quarter]["cashFlow"]
//       accumActualCashflow[quarter] = actualSum
//       accumProjectedCashflow[quarter] = 0
//
//     } else {
//       projectedCashflow[quarter] = cashflow[quarter]["cashFlow"]
//       actualCashflow[quarter] = 0
//       accumActualCashflow[quarter] = 0
//       projectedSum += cashflow[quarter]["cashFlow"]
//       accumProjectedCashflow[quarter] = projectedSum
//     }
//   }
//
//   // cashflow.forEach((quarter) => {
//   //
//   // })
//   return {
//     projected_cashflow: projectedCashflow,
//     actual_cashflow: actualCashflow,
//     accum_projected_cashflow: accumProjectedCashflow,
//     accum_actual_cashflow: accumActualCashflow
//   };
// }

export const processCashData = (cashflow) => {
  if (cashflow.tempfile) {
    return JSON.parse(cashflow.tempfile.join(""));
  } else if (typeof(cashflow) === 'string') {
    return JSON.parse(cashflow);
  } else {
    return cashflow;
  }
};
