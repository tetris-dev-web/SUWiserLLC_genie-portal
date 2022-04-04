import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

import Assets from './assets'
import Earnings from './earnings'
import Transactions from './transactions'
import Investments from './investments'

function TabPanel(props) {
  const { children, value, index, } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

 const DashboardDetails = (props) => {
  const {assetList, setLoading } = props;

  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <React.Fragment>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example">
          <Tab label="Latest Assets" {...a11yProps(0)} />
          <Tab label="Recent Transactions" {...a11yProps(1)} />
          <Tab label="Recent Earnings" {...a11yProps(2)} />
          <Tab label="Viewed Assets" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={tabValue} index={0}>
        <Assets assetList = {assetList} />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <Transactions setLoading = {setLoading} />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <Earnings setLoading = {setLoading} />
      </TabPanel>
      <TabPanel value={tabValue} index={4}>
        <Investments setLoading = {setLoading} />
      </TabPanel>
    </React.Fragment>
  );
}

export default DashboardDetails;