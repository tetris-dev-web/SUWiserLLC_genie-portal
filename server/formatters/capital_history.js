const formatCapitalHistoryData = async (tokenPurchases) => {
  return tokenPurchases.reduce((propsData, purchase) => {
    const time = purchase.blockNumber;

    if (!propsData.history) {
      propsData.history = [];
      propsData.capitalTotal = 0;
      propsData.startTime = time - 1;
      propsData.endTime = time;
      propsData.history.push({
        date: time - 1,
        capital: 0,
      });
    }

    const capital = Number(purchase.returnValues.value);
    propsData.capitalTotal += capital;

    const nextRecord = {
      date: Number(time),
      capital: propsData.capitalTotal,
    };

    const lastRecordIdx = propsData.history.length - 1;
    const lastRecord = propsData.history[lastRecordIdx];

    if (lastRecord.date === time) {
      propsData.history[lastRecordIdx] = nextRecord;
    } else {
      propsData.history.push(nextRecord);
    }

    if (time < propsData.startTime) {
      propsData.startTime = time;
    }

    if (time > propsData.endTime) {
      propsData.endTime = time;
    }

    return propsData;
  }, {});
};

module.exports = {
  formatCapitalHistoryData,
};
