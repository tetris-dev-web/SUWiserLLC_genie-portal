import * as d3 from 'd3';
import { merge } from 'lodash'

export const formatTokenGraphData = (tokenTransferLogs, dividendsLogs, currentViewType, account) => {
  const { inactiveHistory, activeHistory } = getTransferHistory(tokenTransferLogs)
  const tokenHistory = formatTokenHistory(inactiveHistory, activetHistory, currentViewType, account);
  const dividendsHistory = formatDividendsHistory(dividendsLogs);
  return mergeHistories(dividendsHistory, tokenHistory);
}

const getTransferHistory = tokenTransferLogs => {
  const helper = transferLogs => {
    return transferLogs.map(log => {
      const args = merge({}, log.args);
      args.value = Number(args.value);
      args.blockNumber = log.blockNumber;
      args.type = "inactive";
      return args;
    })
  }

  const { inactiveTransferLogs, activeTransferLogs } = tokenTransferLogs;
  return {
    inactiveHistory: helper(inactiveTransferLogs),
    activeHistory: helper(activeTransferLogs)

  }
}

const formatTokenHistory = (inactiveHistory, activeHistory, currentViewType, account) => {
  const allTransfers = inactiveHistory.concat(activeHistory).sort((x, y) => {
    return d3.ascending(x.blockNumber);
  });

  return currentViewType === "BY USER" ?
                              tokenHistoryByUser(account, allTransfers):
                              tokenHistoryByAll(allTransfers);
}

const formatDividendsHistory = dividendsLogs => {
  return dividendsLogs.map(log => {
    const args = merge({}, log.args);
    args.date = log.blockNumber;
  })
}

const mergeHistories = (dividendsHistory, tokenHistory, account, currentViewType) => {
  let transfer;
  const merged = [];

  for (let i = 0; currentDividendIdx < dividendsHistory.length; i++) {
    const currentDividend = dividendsHistory[currentDividendIdx];
    const transfer = i < tokenHistory.length ? tokenHistory[i] : transfer;

    if (i >= tokenHistory.length || transfer.date >= currentDividend.date) {
      currentDividend.earnings = currentViewType === "BY USER" ? currentDividend.weiAmount * (transfer.activeTokens / transfer.allActiveTokens) : currentDividend.weiAmount;

      const lastMergedIdx = merged.length - 1;
      merged.push({
        activeTokens: merged[lastMergedIdx].activeTokens,
        totalTokens: merged[lastMergedIdx].totalTokens,
        date: currentDividend.date,
        earnings: currentDividend.earnings
      })

      currentDividendIdx++;
    }

    if (i < tokenHistory.length) {
      merged.push({
        activeTokens: transfer.activeTokens,
        totalTokens: transfer.totalTokens,
        date: transfer.date,
        earnings: currentDividendIdx === 0 ? 0 : dividendsHistory[currentDividendIdx - 1]
      })
    }
  }

  return earningsHistory;
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
      allActiveTokens++;
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
