import * as d3 from 'd3';

export const getTokenHistory = (tokenTransferLogs, currentViewType, account) => {
  let { inactiveTransferLogs, activeTransferLogs } = tokenTransferLogs;

  const getTransferData = transferLogs => {
    return transferLogs.map(log => {
      const args = log.args;
      args.value = Number(args.value);
      args.blockNumber = log.blockNumber;
      args.type = "inactive";
      return args;
    })
  }

  const inactiveTransfers = getTransferData(inactiveTransferLogs);
  const activeTransfers = getTransferData(activeTransferLogs);
  const allTransfers = inactiveTransfers.concat(activeTransfers);
  return currentViewType === "BY USER" ?
                              tokenHistoryByUser(account, allTransfers):
                              tokenHistoryByAll(inactiveTransfers, activeTransfers);
}

const tokenHistoryByUser = (account, allTransfers) => {
  const userTransfers = allTransfers.filter(transfer => {
    return transfer.from === account || transfer.to === account;
  })
  console.log("userTransfers", userTransfers)
  let totalTokens = 0;
  let activeTokens = 0;

  return userTransfers.map(transferData => {
    //if the account is receiving the tranfer
    if (transferData.to === account) {
      //if the account's overall balance is increasing
      if (transferData.type == 'inactive' || transferData.from !== "0x0000000000000000000000000000000000000000") {
        totalTokens += transferData.value;
        if (transferData.type == 'active') {
          activeTokens += transferData.value;
        }
      } else { //if the accounts own tokens were activated
        activeTokens += transferData.value;
      }
    } else {//if the account is doing the transfering
      //if the account is losing overall tokens
      if (transferData.type == 'active' || transferData.to !== "0x0000000000000000000000000000000000000000") {
        totalTokens -= transferData.value;
        if (transferData.type === 'active') {
          activeTokens -= transferData.value;
        }
      }
    }

    return {
      date: transferData.blockNumber,
      totalTokens,
      activeTokens,
      earnings: 0
    };
  });
};

const tokenHistoryByAll = allTransfers => {
  const sortedTransfers = allTransfers.sort((x, y) => {
    return d3.ascending(x.blockNumber);
  });

  let totalTokens = 0;
  let activeTokens = 0;

  return sortedTransfers.map(transferData => {
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
      activeTokens,
      earnings: 0
    };
  });
};
