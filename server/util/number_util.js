const numberParser = async (method) => {
  const result = await method.call();
  return Number(result);
};

module.exports = {
  numberParser,
};
