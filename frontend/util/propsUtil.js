import * as d3 from 'd3';
import { merge } from 'lodash'

export const formatTokenGraphData = (tokenTransferLogs, dividendsLogs, currentViewType, account) => {
  const { inactiveHistory, activeHistory } = getTransferHistory(tokenTransferLogs)
  const tokenHistory = formatTokenHistory(inactiveHistory, activeHistory, currentViewType, account);
  const dividendsHistory = formatDividendsHistory(dividendsLogs);
  console.log("dividendsHistory", dividendsHistory)
  console.log("token history", tokenHistory)
  return mergeHistories(dividendsHistory, tokenHistory, currentViewType);
}

const getTransferHistory = tokenTransferLogs => {
  const { inactiveTransferLogs, activeTransferLogs } = tokenTransferLogs;

  const helper = transferLogs => {
    const type = transferLogs === inactiveTransferLogs ? "inactive" : "active";
    return transferLogs.map(log => {
      const args = merge({}, log.args);
      args.value = Number(args.value);
      args.blockNumber = log.blockNumber;
      args.type = type;
      return args;
    })
  }

  return {
    inactiveHistory: helper(inactiveTransferLogs),
    activeHistory: helper(activeTransferLogs)

  }
}

const formatTokenHistory = (inactiveHistory, activeHistory, currentViewType, account) => {
  const allTransfers = inactiveHistory.concat(activeHistory).sort((x, y) => {
    return x.blockNumber - y.blockNumber;
  });
  console.log("allTransfers", allTransfers)
  return currentViewType === "BY USER" ?
                              tokenHistoryByUser(account, allTransfers):
                              tokenHistoryByAll(allTransfers);
}

const formatDividendsHistory = dividendsLogs => {
  console.log("dividendsLogs", dividendsLogs)
  return dividendsLogs.map(log => {
    const args = merge({}, log.args);
    args.date = log.blockNumber;
    return args;
  })
}

const mergeHistories = (dividendsHistory, tokenHistory, currentViewType) => {
  let transfer;
  let currentDividendsIdx = 0;
  let earnings = 0;
  let lastMergedIdx;
  const merged = [];

  const integrateBlockData = blockData => {
    if (lastMergedIdx > -1 && merged[lastMergedIdx].date === blockData.date) {
      merged[lastMergedIdx] = blockData;
    } else {
      merged.push(blockData)
    }
  }

  for (let i = 0; currentDividendsIdx < dividendsHistory.length; i++) {
    lastMergedIdx = merged.length - 1;
    const currentDividend = dividendsHistory[currentDividendsIdx];
    const transfer = i < tokenHistory.length ? tokenHistory[i] : transfer;

    if (i >= tokenHistory.length || transfer.date >= currentDividend.date) {
      if (currentViewType === "BY USER") {
        earnings += Number(currentDividend.weiAmount) * (transfer.activeTokens / transfer.allActiveTokens);
      } else {
        earnings += Number(currentDividend.weiAmount);
      }

      integrateBlockData({
        activeTokens: merged[lastMergedIdx].activeTokens,
        totalTokens: merged[lastMergedIdx].totalTokens,
        date: currentDividend.date,
        earnings
      })

      currentDividendsIdx++;
    }

    if (i < tokenHistory.length) {
      integrateBlockData({
        activeTokens: transfer.activeTokens,
        totalTokens: transfer.totalTokens,
        date: transfer.date,
        earnings
      })
    }
  }

  return merged;
}

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
