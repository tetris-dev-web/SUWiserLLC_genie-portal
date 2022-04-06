import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { fetchPurchaseHistory  } from "../../../../actions/chain_actions/token_actions";

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

const Investments = (props) => {
  const {account, setLoading} = props;

  const [rows, setRows] = React.useState([]);

  const accountStr = String(account).toLowerCase();

  useEffect(() => {
    setLoading(true);
    fetchPurchaseHistory(account).then((history) => {

      let localRows = [];
      let count = 0;

      for (const item of history) {
        const time = item.time == 0 ? '' : new Date(item.time * 1000);

        localRows.push({
          id : count,
          amount : item.amount,
          price : item.value,
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
            <TableCell>Token Amount</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key = {row.id}>
              <TableCell>{row.amount}</TableCell>
              <TableCell>{`$${row.price}`}</TableCell>
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
    fetchPurchaseHistory : (account) => dispatch(fetchPurchaseHistory (account)),
  };
};

const mapStateToProps = (state) => {
  return {
    account: state.network.account,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Investments);