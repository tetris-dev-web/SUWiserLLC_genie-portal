import { merge } from 'lodash'

export const formatTokenGraphData = (tokenTransferData, dividendsLogs, currentViewType, account) => {
  const dividendsHistory = formatDividendsHistory(dividendsLogs);
  const tokenHistory = formatTokenHistory(tokenTransferData, currentViewType, account);
  return mergeHistories(dividendsHistory, tokenHistory, currentViewType);
}

const formatDividendsHistory = dividendsLogs => {
  return dividendsLogs.map(_data => {
    const data = merge({}, _data);
    data.date = _data.blockNumber;
    return args;
  })
}

const formatTokenHistory = (tokenTransferData, currentViewType, account) => {
  const { inactiveHistory, activeHistory } = getTransferHistory(tokenTransferData);

  const allTransfers = inactiveHistory.concat(activeHistory).sort((x, y) => {
    return x.blockNumber - y.blockNumber;
  });

  return currentViewType === "BY USER" ?
                              tokenHistoryByUser(account, allTransfers):
                              tokenHistoryByAll(allTransfers);
}

const mergeHistories = (dividendsHistory, tokenHistory, currentViewType) => {
  const integrateBlockData = blockData => {
    if (lastMergedIdx > -1 && merged[lastMergedIdx].date === blockData.date) {
      merged[lastMergedIdx] = blockData;
    } else {
      merged.push(blockData)
    }
  }

  const incrementEarnings = () => {
    if (currentViewType === "BY USER") {
      earnings += Number(currentDividend.weiAmount) * (transfer.activeTokens / transfer.allActiveTokens);
    } else {
      earnings += Number(currentDividend.weiAmount);
    }
  }

  let currentDividend;
  let transfer;

  let currentDividendsIdx = 0;
  let currentTransferIdx = 0;
  let lastMergedIdx;

  let earnings = 0;
  const merged = [];

  while (currentDividendsIdx < dividendsHistory.length || currentTransferIdx < tokenHistory.length) {
    lastMergedIdx = merged.length - 1;
    currentDividend = currentDividendsIdx < dividendsHistory.length ? dividendsHistory[currentDividendsIdx] : null;
    transfer = currentTransferIdx < tokenHistory.length ? tokenHistory[currentTransferIdx] : transfer;

    if (currentTransferIdx >= tokenHistory.length || (currentDividend && transfer.date >= currentDividend.date)) {
      incrementEarnings();
      integrateBlockData({
        activeTokens: merged[lastMergedIdx].activeTokens,
        totalTokens: merged[lastMergedIdx].totalTokens,
        date: currentDividend.date,
        earnings
      })
      currentDividendsIdx++;
    } else {
      integrateBlockData({
        activeTokens: transfer.activeTokens,
        totalTokens: transfer.totalTokens,
        date: transfer.date,
        earnings
      })
      currentTransferIdx++;
    }
  }

  return merged;
}

const getTransferHistory = tokenTransferData => {
  const { inactiveTransferData, activeTransferData } = tokenTransferData;

  const helper = transferData => {
    const type = transferData === inactiveTransferData ? "inactive" : "active";
    return transferData.map(_data => {
      const data = merge({}, _data);
      data.type = type;
      return data;
    })
  }

  return {
    inactiveHistory: helper(inactiveTransferData),
    activeHistory: helper(activeTransferData)

  }
}

// const type = transferLogs === inactiveTransferData ? "inactive" : "active";
// return transferLogs.map(log => {
//   const args = merge({}, log.args);
//   args.value = Number(args.value);
//   args.blockNumber = log.blockNumber;
//   args.type = type;
//   return args;
// })

// const type = transferData === inactiveTransferData ? "inactive" : "active";
// return transferData.map(_data => {
//   const data = merge({}, _data);
//   data.type = type;
//   return data;
// })


const tokenHistoryByUser = (account, allTransfers) => {
  const userTransfers = allTransfers.filter(transfer => {
    return transfer.from === account || transfer.to === account;
  })

  let totalTokens = 0;
  let activeTokens = 0;
  let allActiveTokens = 0;

  return userTransfers.map(transferData => {
    if (transferData.type === 'active' && transferData.from === "0x0000000000000000000000000000000000000000") {
      allActiveTokens += transferData.value;
    }
    //if the account is receiving the tranfer
    if (transferData.to === account) {
      //if the account's overall balance is increasing
      if (transferData.type == 'inactive' || transferData.from !== "0x0000000000000000000000000000000000000000") {
        totalTokens += transferData.value;
      }
      if (transferData.type == 'active') { //if the accounts own tokens were activated
        activeTokens += transferData.value;
      }
    } else {//if the account is doing the transfering
      //if the account is losing overall tokens
      if (transferData.type == 'active' || transferData.to !== "0x0000000000000000000000000000000000000000") {
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
      allActiveTokens
    };
  });
};

const tokenHistoryByAll = allTransfers => {
  let totalTokens = 0;
  let activeTokens = 0;

  return allTransfers.map(transferData => {
    if (transferData.from == "0x0000000000000000000000000000000000000000") {
      if (transferData.type == 'inactive') {
        totalTokens += transferData.value;
      } else {
        activeTokens += transferData.value;
      }
    }

    return {
      date: transferData.blockNumber,
      totalTokens,
      activeTokens
    };
  });
};
