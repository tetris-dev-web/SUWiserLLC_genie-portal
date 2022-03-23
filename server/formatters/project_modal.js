const { merge } = require("lodash");

const formatProject = (project) => {
  const {
    id,
    prePortalCashflow,
    cashflow,
    lat,
    lng,
    busLink,
    description,
    closingTime,
    openingTime,
  } = project;

  const cashFlow = formatCashflow(prePortalCashflow, cashflow);

  return {
    id,
    cashFlow,
    lat,
    lng,
    busLink,
    description,
    closingTime,
    openingTime,
  };
};

const formatCashflow = (prePortalCashflow, portalCashflow) => {
  const prePortalLen = Object.keys(prePortalCashflow).length;
  let len;

  const formattedPortalCashflow = portalCashflow.reduce((result, currentCashFlow) => {
    len = len ? len + 1 : prePortalLen + 1;

    result[len] = {
      cashFlow: Number(currentCashFlow.returnValues.weiAmount),
      isActuals: true,
    };

    return result;
  }, {});

  return merge({}, prePortalCashflow, formattedPortalCashflow);
};

module.exports = {
  formatProject,
};
