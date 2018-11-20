const miscUtil = require('./miscUtil');

const addMethod = async (stub, methodName) => {
  await stub.addMethod(methodName);
}

const resetMethod = async (stub, methodName) => {
  await stub.resetMethod(methodName);
}

const callHistory = async (stub, methodName) => {
  let data = await stub.callHistory(methodName);

  return {
    firstUint: miscUtil.parseBN(data[0]),
    secondUint: miscUtil.parseBN(data[1]),
    thirdUint: miscUtil.parseBN(data[2]),
    firstString: data[3],
    secondString: data[4],
    thirdString: data[5],
    firstAddress: data[6],
    secondAddress: data[7],
    thirdAddress: data[8],
    called: data[9],
    callCount: miscUtil.parseBN(data[10])
  }
}

module.exports = {
  addMethod,
  resetMethod,
  callHistory
}
