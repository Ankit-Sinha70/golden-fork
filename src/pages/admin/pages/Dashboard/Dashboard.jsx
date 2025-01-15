import React, { useState } from "react";
import {
  Box,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  NativeSelect,
} from "@mui/material";
import {
  MenuBook,
  People,
  LocationOn,
  TableBar,
  TableRestaurant,
} from "@mui/icons-material";
import TotalCountCard from "../../../../components/Card/TotalCountCard";
import FinancialCard from "../../../../components/FinancialCard/FinancialCard";
import RevenueChart from "../../../../components/TotalRevenue/RevenueChart";
import OrdersSummary from "../../../../components/TotalRevenue/OrdersSummary";
import "./Dashboard.scss";

const Dashboard = () => {
  const [timeFilter, setTimeFilter] = useState("day");
  console.log("timeFilter", timeFilter);

  const bookingData = {
    day: {
      customers: "125",
      locations: "193",
      menuItems: "1,593",
      occupiedTables: "45",
      vacantTables: "15",
      totalTables: "60",
    },
    week: {
      customers: "875",
      locations: "183",
      menuItems: "1,793",
      occupiedTables: "52",
      vacantTables: "8",
      totalTables: "60",
    },
    month: {
      customers: "3,425",
      locations: "23",
      menuItems: "1,993",
      occupiedTables: "58",
      vacantTables: "2",
      totalTables: "60",
    },
  };

  const handleFilterChange = (event) => {
    setTimeFilter(event.target.value);
    console.log("Filter changed to:", event.target.value);
  };

  return (
    <Box className="dashboardMain1 pageTemplate">
      <div className="pageTemplate__head">
        <h1 className="headTitle">Total number of table booking</h1>
        <Box Box className="table-head-select">
          <FormControl fullWidth>
            <NativeSelect
              value={timeFilter}
              label="Time Period"
              onChange={handleFilterChange}
            >
              <option option value="day">
                Per Day
              </option>
              <option value="week">Per Week</option>
              <option value="month">Per Month</option>
            </NativeSelect>
          </FormControl>
          {/* <InputLabel>Time Period</InputLabel> */}
        </Box>
      </div>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={8.5} xl={12}>
          <Grid container spacing={3}>
            {/* Original Cards */}
            <Grid item md={4} xs={12}>
              <TotalCountCard
                name="Total Customer"
                icon={People}
                count={bookingData[timeFilter].customers}
                month={`This ${timeFilter}`}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <TotalCountCard
                name="Total Location"
                icon={LocationOn}
                count={bookingData[timeFilter].locations}
                month={`This ${timeFilter}`}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <TotalCountCard
                name="Total Menu Items"
                icon={MenuBook}
                count={bookingData[timeFilter].menuItems}
                month={`This ${timeFilter}`}
              />
            </Grid>

            {/* New Table Status Cards */}
            <Grid item md={4} xs={12}>
              <TotalCountCard
                name="Occupied Tables"
                icon={TableBar}
                count={bookingData[timeFilter].occupiedTables}
                month={`This ${timeFilter}`}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <TotalCountCard
                name="Vacant Tables"
                icon={TableRestaurant}
                count={bookingData[timeFilter].vacantTables}
                month={`This ${timeFilter}`}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <TotalCountCard
                name="Total Tables"
                icon={TableRestaurant}
                count={bookingData[timeFilter].totalTables}
                month={`This ${timeFilter}`}
              />
            </Grid>

            <Grid item xs={12}>
              <FinancialCard timeFilter={timeFilter} />
            </Grid>
            <Grid item xs={12} lg={6}>
              <RevenueChart revenue="Revenue" revenueChart={15000} />
            </Grid>
            <Grid item xs={12} lg={6}>
              <OrdersSummary />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
