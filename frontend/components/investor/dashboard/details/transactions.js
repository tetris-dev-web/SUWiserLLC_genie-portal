import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { fetchTokenHistory  } from "../../../../actions/chain_actions/token_actions";

const defineAction = (from, to, account) => {
  if (from == account) {
    if (to == "0x0000000000000000000000000000000000000000") {
      return "Burn";
    } else {
      return "Transfer";
    }
  }

  if (to == account) {
    if (from == "0x0000000000000000000000000000000000000000") {
      return "Mint";
    } else {
      return "Receive";
    }
  }
}

const Transactions = (props) => {
  const {account, setLoading} = props;

  const [rows, setRows] = React.useState([]);

  const accountStr = String(account).toLowerCase();

  useEffect(() => {
    setLoading(true);
    fetchTokenHistory(account).then((history) => {

      let localRows = [];
      let count = 0;
      let balance = 0;
      for (const item of history.inactiveTransferData) {
        const time = item.time == 0 ? '' : new Date(item.time * 1000);
        const action = defineAction(String(item.from).toLowerCase(), String(item.to).toLowerCase(), String(accountStr));
        if (action == 'Mint' || action == 'Receive') balance += Number(item.value);
        if (action == 'Burn' || action == 'Transfer') balance -= Number(item.value);

        localRows.push({
          id : count,
          type : 'Inactive',
          action : action,
          from : String(item.from).toLowerCase() == accountStr ? 'Me' : item.from,
          to : String(item.to).toLowerCase() == accountStr ? 'Me' : item.to,
          amount : item.value,
          balance : balance,
          time : time == '' ? '' : time.toDateString()
        });

        count ++;
      }

      balance = 0;
      for (const item of history.activeTransferData) {
        const time = item.time == 0 ? '' : new Date(item.time * 1000);
        const action = defineAction(String(item.from).toLowerCase(), String(item.to).toLowerCase(), String(accountStr));
        if (action == 'Mint' || action == 'Receive') balance += Number(item.value);
        if (action == 'Burn' || action == 'Transfer') balance -= Number(item.value);

        localRows.push({
          id : count,
          type : 'Active',
          action : action,
          from : String(item.from).toLowerCase() == accountStr ? 'Me' : item.from,
          to : String(item.to).toLowerCase() == accountStr ? 'Me' : item.to,
          amount : item.value,
          balance : balance,
          time : time == '' ? '' : time.toDateString()
        });

        count ++;
      }

      setRows(localRows);
      setLoading(false);
    });

  }, [account]);

  return (
    <div>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Token Type</TableCell>
            <TableCell>Action</TableCell>
            <TableCell>From</TableCell>
            <TableCell>To</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Balance</TableCell>
            <TableCell>Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key = {row.id}>
              <TableCell>{row.type}</TableCell>
              <TableCell>{row.action}</TableCell>
              <TableCell>{row.from}</TableCell>
              <TableCell>{row.to}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell>{row.balance}</TableCell>
              <TableCell>{row.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTokenHistory : (account) => dispatch(fetchTokenHistory (account)),
  };
};

const mapStateToProps = (state) => {
  return {
    account: state.network.account,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);