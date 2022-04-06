import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function Assets(props) {
  const {assetList} = props;
  let rows = [];

  for (const [key, value] of Object.entries(assetList)) {
    const openingTime = new Date(value.openingTime * 1000);
    const closingTime = new Date(value.closingTime * 1000);
    const activationTime = value.activationTime == 0 ? '' : new Date(value.activationTime * 1000);

    rows.push({
      id : key,
      title : value.title,
      location : value.lat,
      openingTime: openingTime.toGMTString(),
      closingTime : closingTime.toGMTString(),
      activationTime : activationTime == '' ? '' : activationTime.toDateString(),
      votes : value.votes
    });
  }

  return (
    <div>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Asset Name</TableCell>
            <TableCell>Asset Location</TableCell>
            <TableCell>Opening</TableCell>
            <TableCell>Closing</TableCell>
            <TableCell>Activation Time</TableCell>
            <TableCell align="right">Total Votes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.location}</TableCell>
              <TableCell>{row.openingTime}</TableCell>
              <TableCell>{row.closingTime}</TableCell>
              <TableCell>{row.activationTime}</TableCell>
              <TableCell align="right">{row.votes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}