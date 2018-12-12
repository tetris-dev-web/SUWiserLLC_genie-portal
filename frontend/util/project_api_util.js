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
  return $.ajax({
    method: 'POST',
    url: 'api/projects',
    processData: false,
    contentType: false,
    dataType: 'json',
    // data: {project: formData},
    data: formData,
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

export const calculateAccumulatedRevenue = (cashflow) => {
  const accumulatedRevenue = {};
  let accumulatedSum = 0;
  const quarters = keys(cashflow).map(Number).sort((a, b) => (a - b));
  quarters.forEach(quarter => {
    accumulatedSum += cashflow[quarter.toString()]['cashFlow'];
    accumulatedRevenue[quarter.toString()] = accumulatedSum;
  });
  console.log('accrev:', accumulatedRevenue)
  return accumulatedRevenue;
};

export const calculateCashflowData = (cashflow) => {
  const projectedCashflow = {}
  const actualCashflow = {}
  const accumActualCashflow = {}
  const accumProjectedCashflow = {};
  let actualSum = 0;
  let projectedSum = 0

  for (var quarter in cashflow){
    console.log("Quarter is: ", cashflow[quarter]);
    accumProjectedCashflow[quarter] = {}
    projectedCashflow[quarter] = {}
    actualCashflow[quarter] = {}
    accumActualCashflow[quarter] = {}
    if (cashflow[quarter]["isActuals"] === true){
      projectedCashflow[quarter] = 0
      actualCashflow[quarter] = cashflow[quarter]["cashFlow"]
      actualSum += cashflow[quarter]["cashFlow"]
      accumActualCashflow[quarter] = actualSum
      accumProjectedCashflow[quarter] = 0

    } else {
      projectedCashflow[quarter] = cashflow[quarter]["cashFlow"]
      actualCashflow[quarter] = 0
      accumActualCashflow[quarter] = 0
      projectedSum += cashflow[quarter]["cashFlow"]
      accumProjectedCashflow[quarter] = projectedSum
    }
  }

  // cashflow.forEach((quarter) => {
  //
  // })
  return {
    projected_cashflow: projectedCashflow,
    actual_cashflow: actualCashflow,
    accum_projected_cashflow: accumProjectedCashflow,
    accum_actual_cashflow: accumActualCashflow
  };
}

export const processCashData = (cashflow) => {
  // Dealing with tempfiles
  if (cashflow.tempfile) {
    return JSON.parse(cashflow.tempfile.join(""));
  } else if (typeof(cashflow) === 'string') {
    return JSON.parse(cashflow);
  } else {
    return cashflow;
  }
};
