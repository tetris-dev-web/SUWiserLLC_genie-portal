const { merge } = require('lodash');

const formatTokenGraphData = (tokenTransferData, dividendsLogs, currentViewType, account) => {
  const dividendsHistory = formatDividendsHistory(dividendsLogs);
  const tokenHistory = formatTokenHistory(tokenTransferData, currentViewType, account);
  return mergeHistories(dividendsHistory, tokenHistory, currentViewType);
};

const formatDividendsHistory = (dividendsLogs) => {
  return dividendsLogs.map((_data) => {
    const data = merge({}, _data);
    data.date = data.blockNumber;
    return data;
  });
};

const formatTokenHistory = (
  tokenTransferData,
  currentViewType,
  account = '0xef898fd948f50d5010d3ec20233fae23d89a1a51',
) => {
  const { inactiveHistory, activeHistory } = getTransferHistory(tokenTransferData);

  const allTransfers = inactiveHistory.concat(activeHistory).sort((x, y) => {
    return x.blockNumber - y.blockNumber;
  });

  return currentViewType === 'BY USER'
    ? tokenHistoryByUser(account, allTransfers)
    : tokenHistoryByAll(allTransfers);
};

const mergeHistories = (dividendsHistory, tokenHistory, currentViewType) => {
  if (!tokenHistory.length) return [];

  const integrateBlockData = (blockData) => {
    if (lastMergedIdx > -1 && merged[lastMergedIdx].date === blockData.date) {
      merged[lastMergedIdx] = blockData;
    } else {
      merged.push(blockData);
    }
  };

  const incrementEarnings = () => {
    if (currentViewType === 'BY USER') {
      earnings +=
        Number(currentDividendsRecord.weiAmount) *
        (currentTokenRecord.activeTokens / currentTokenRecord.allActiveTokens);
    } else {
      earnings += Number(currentDividendsRecord.weiAmount);
    }
  };

  let currentDividendsRecord;
  let currentTokenRecord;

  let currentDividendsRecordsIdx = 0;
  let currentTokenRecordIdx = 0;
  let lastMergedIdx;

  let earnings = 0;
  const merged = [];

  while (
    currentDividendsRecordsIdx < dividendsHistory.length ||
    currentTokenRecordIdx < tokenHistory.length
  ) {
    lastMergedIdx = merged.length - 1;
    currentDividendsRecord =
      currentDividendsRecordsIdx < dividendsHistory.length
        ? dividendsHistory[currentDividendsRecordsIdx]
        : null;
    currentTokenRecord =
      currentTokenRecordIdx < tokenHistory.length
        ? tokenHistory[currentTokenRecordIdx]
        : currentTokenRecord;

    if (
      currentTokenRecordIdx >= tokenHistory.length ||
      (currentDividendsRecord && currentTokenRecord.date >= currentDividendsRecord.date)
    ) {
      incrementEarnings();
      integrateBlockData({
        activeTokens: merged[lastMergedIdx].activeTokens,
        totalTokens: merged[lastMergedIdx].totalTokens,
        date: currentDividendsRecord.date,
        earnings,
      });
      currentDividendsRecordsIdx++;
    } else {
      integrateBlockData({
        activeTokens: currentTokenRecord.activeTokens,
        totalTokens: currentTokenRecord.totalTokens,
        date: currentTokenRecord.date,
        earnings,
      });
      currentTokenRecordIdx++;
    }
  }

  return merged;
};

const getTransferHistory = (tokenTransferData) => {
  const { inactiveTransferData, activeTransferData } = tokenTransferData;

  const helper = (transferData) => {
    const type = transferData === inactiveTransferData ? 'inactive' : 'active';
    return transferData.map((_data) => {
      const data = merge({}, _data);
      data.type = type;
      return data;
    });
  };

  return {
    inactiveHistory: helper(inactiveTransferData),
    activeHistory: helper(activeTransferData),
  };
};

const tokenHistoryByUser = (account, allTransfers) => {
  const userTransfers = allTransfers.filter((transfer) => {
    return transfer.from.toLowerCase() === account || transfer.to.toLowerCase() === account;
  });

  let totalTokens = 0;
  let activeTokens = 0;
  let allActiveTokens = 0;

  return userTransfers.map((transferData) => {
    if (
      transferData.type === 'active' &&
      transferData.from === '0x0000000000000000000000000000000000000000'
    ) {
      allActiveTokens += transferData.value;
    }
    //if the account is receiving the tranfer
    if (transferData.to.toLowerCase() === account) {
      //if the account's overall balance is increasing
      if (
        transferData.type == 'inactive' ||
        transferData.from !== '0x0000000000000000000000000000000000000000'
      ) {
        totalTokens += transferData.value;
      }
      if (transferData.type == 'active') {
        //if the accounts own tokens were activated
        activeTokens += transferData.value;
      }
    } else {
      //if the account is doing the transfering
      //if the account is losing overall tokens
      if (
        transferData.type == 'active' ||
        transferData.to !== '0x0000000000000000000000000000000000000000'
      ) {
        totalTokens -= transferData.value;
      }
      if (transferData.type === 'active') {
        activeTokens -= transferData.value;
      }
    }

    return {
      date: transferData.blockNumber,
      totalTokens,
      activeTokens,
      allActiveTokens,
    };
  });
};

const tokenHistoryByAll = (allTransfers) => {
  let totalTokens = 0;
  let activeTokens = 0;

  return allTransfers.map((transferData) => {
    if (transferData.from == '0x0000000000000000000000000000000000000000') {
      if (transferData.type == 'inactive') {
        totalTokens += transferData.value;
      } else {
        activeTokens += transferData.value;
      }
    }

    return {
      date: transferData.blockNumber,
      totalTokens,
      activeTokens,
    };
  });
};

module.exports = {
  formatTokenGraphData,
};
