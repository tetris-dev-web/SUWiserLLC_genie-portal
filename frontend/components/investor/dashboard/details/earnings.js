import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { fetchDividendCollection } from "../../../../actions/chain_actions/dividends_actions";
import { showCurrencyValue } from "../../../../util/function_util";

const Earnings = (props) => {
  const {account, currency, eth2usd, setLoading} = props;

  const [rows, setRows] = React.useState([]);


  useEffect(() => {
    setLoading(true);
    fetchDividendCollection(account).then((dividend) => {

      let localRows = [];
      let count = 0;
      for (const item of dividend.dividend) {
        const time = item.time == 'NaN' ? '' : new Date(item.time * 1000);

        localRows.push({
          id : count,
          title : 'Collected',
          amount : item.amount,
          time : time == '' ? '' : time.toDateString()
        });

        count ++;
      }

      localRows.push({
        id : count,
        title : 'Owed',
        amount : dividend.dividendOwedTo,
        time : ''
      });

      setRows(localRows);
      setLoading(false);
    });

  }, [account]);

  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Action</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key = {row.id}>
              <TableCell>{row.title}</TableCell>
              <TableCell>{showCurrencyValue(row.amount, currency, eth2usd)}</TableCell>
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
    fetchDividendCollection: (account) => dispatch(fetchDividendCollection(account)),
  };
};

const mapStateToProps = (state) => {
  return {
    account: state.network.account,
    currency: state.settings.currency,
    eth2usd: state.settings.eth2usd
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Earnings);