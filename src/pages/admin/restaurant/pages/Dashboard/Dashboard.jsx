import React from "react";
import CustomerIcon from "../../../../../assets/images/icon/png/customerIcon.png";
import TotalCoutnCard from "../../../../../components/Card/TotalCountCard";
import RevenueChart from "../../../../../components/TotalRevenue/RevenueChart";
import { Grid } from "@mui/material";
import "./Dashboard.scss";
const Dashboard = () => {
  return (
    <div className="moduleBox">
      <div className="pageTemplate">
          <h1 className="headTitle management">Dashboard</h1>
        <div className="pageTemplate__head">
          <Grid container spacing={3}>
            <Grid item lg={8.5} xl={12}>
              <Grid container spacing={3}>
                <Grid item md={4} xs={12}>
                  <TotalCoutnCard
                    name={"Total number of orders completed"}
                    Icons={CustomerIcon}
                    count={"1,593"}
                    month={"This Month"}
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <TotalCoutnCard
                    name={"Total table booking"}
                    Icons={CustomerIcon}
                    count={"1,593"}
                    month={"This Month"}
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <TotalCoutnCard
                    name={"Upcoming order"}
                    Icons={CustomerIcon}
                    count={"1,593"}
                    month={"This Month"}
                  />
                </Grid>
                <div className="revenue__graph-chart">
                  <Grid item xs={12} lg={6}>
                    <RevenueChart
                      revenue={"Total Revenue Generated"}
                      revenueChart={15000}
                    />
                  </Grid>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
