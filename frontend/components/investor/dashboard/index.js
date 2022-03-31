import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Card from './cards/card';
import Orders from './details/Orders';

export default function Dashboard() {
  return (
    <Grid container spacing={3}>
      {/* Total Assets */}
      <Grid item xs={12} md={4} lg={4}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          <Card 
            title = "Total Assets Invested"
            amount = "40 Assets"
          />
        </Paper>
      </Grid>

      {/* Total Investments */}
      <Grid item xs={12} md={4} lg={4}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          <Card
            title = "Total Investments Value"
            amount = "$356,000"
          />
        </Paper>
      </Grid>   

      {/* Total Earnings */}
      <Grid item xs={12} md={4} lg={4}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          <Card
            title = "Total Earnings"
            amount = "$23,000"
          />
        </Paper>
      </Grid>  

      {/* Recent Orders */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Orders />
        </Paper>
      </Grid>
    </Grid>
  );
}