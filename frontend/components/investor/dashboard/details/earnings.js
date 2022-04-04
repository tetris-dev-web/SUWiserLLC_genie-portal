import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { fetchDividendCollection } from "../../../../actions/chain_actions/dividends_actions";

const Earnings = (props) => {
  const {account, setLoading} = props;

  const [rows, setRows] = React.useState([]);


  useEffect(() => {
    // Fetch Investor Summary
    setLoading(true);
    fetchDividendCollection(account).then((dividend) => {

      let localRows = [];
      let count = 0;
      for (const item of dividend.dividend) {
        const time = item.time == 'NaN' ? '' : new Date(item.time);

        localRows.push({
          id : count,
          title : 'Collected',
          amount : item.amount,
          time : time == '' ? '' : time.toDateString()
        });

        count ++;
      }

      localRows.push({
        count : count,
        title : 'Owed',
        amount : dividend.dividendOwedTo,
        time : ''
      });

      setRows(localRows);
      setLoading(false);
    });

  }, [account]);

  return (
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
            <TableCell>{row.amount}</TableCell>
            <TableCell>{row.time}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Earnings);