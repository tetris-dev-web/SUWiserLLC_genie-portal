import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { fetchPurchaseHistory  } from "../../../../actions/chain_actions/token_actions";
import { showCurrencyValue } from "../../../../util/function_util";

const Investments = (props) => {
  const {account, currency, eth2usd, setLoading} = props;

  const [rows, setRows] = React.useState([]);

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
    <TableContainer>
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
              <TableCell>{showCurrencyValue(row.price, currency, eth2usd)}</TableCell>
              <TableCell>{row.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
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
    currency: state.settings.currency,
    eth2usd: state.settings.eth2usd
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Investments);