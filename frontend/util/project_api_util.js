import { keys } from 'lodash';

export const fetchProjects = () => {
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
    data: formData,
  });
};

export const calculateAccumulatedRevenue = (project) => {
  const accumulatedRevenue = {};
  let accumulatedSum = 0;
  const quarters = keys(project).sort();
  quarters.forEach(quarter => {
    accumulatedSum += project[quarter];
    accumulatedRevenue[quarter] = accumulatedSum;
  });
  return accumulatedRevenue;
};

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