import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { Cell, Pie, PieChart } from "recharts";
import "./orderSummay.scss";

const data = [
  { name: "Completed", value: 85 },
  { name: "Remaining", value: 15 },
];

const COLORS = ["#b8860b", "#E0E0E0"];

const orderStats = {
  Monthly: { delivery: 25, delivered: 60, canceled: 7 },
  Weekly: { delivery: 15, delivered: 30, canceled: 3 },
  Today: { delivery: 5, delivered: 8, canceled: 1 },
};

export default function OrdersSummary() {
  const [timeframe, setTimeframe] = useState("Monthly");

  const handleTimeframeChange = (newTimeframe) => {
    setTimeframe(newTimeframe);
  };

  return (
    // <div className="orderSummery">
    //    <div className="orderSummery__head">
    //   <h6 className="orderSummery__title">Orders Summary</h6>
    //   <div className="orderSummery__tabs">
    //     {["Monthly", "Weekly", "Today"].map((item) => (
    //       <Button
    //         key={item}
    //         variant={timeframe === item ? "contained" : "outlined"}
    //         onClick={() => handleTimeframeChange(item)}
    //       >
    //         {item}
    //       </Button>
    //     ))}
    //   </div>
    //   </div>
    //   <div>
    //     <div className="orderSummery__pieChart">
    //       <PieChart width={150} height={150}>
    //         <Pie
    //           data={data}
    //           innerRadius={60}
    //           outerRadius={70}
    //           startAngle={90}
    //           endAngle={-270}
    //           paddingAngle={5}
    //           dataKey="value"
    //         >
    //           {data.map((entry, index) => (
    //             <Cell key={`cell-${index}`} fill={COLORS[index]} />
    //           ))}
    //         </Pie>
    //       </PieChart>
    //       <div className="orderSummery__pieChartInfo">
    //         <h4 className="orderSummery__pieChartNum">85%</h4>
    //       </div>
    //     </div>

    //     <div className="orderSummery__text">
    //       <h4>$456,005.56 - $500,000.00</h4>
    //     </div>
    //   </div>

    //   {/* <Button className="orderSummery__textBtn">More Details</Button> */}
    //   <Box class="orderSummery__info">
    //     {[
    //       { label: "On Delivery", value: orderStats[timeframe].delivery },
    //       { label: "Delivered", value: orderStats[timeframe].delivered },
    //       { label: "Canceled", value: orderStats[timeframe].canceled },
    //     ].map((stat) => (
    //       <Box key={stat.label} sx={{ textAlign: "center" }}>
    //         <h1>{stat.value}</h1>
    //         <p>
    //           {stat.label}
    //         </p>
    //       </Box>
    //     ))}
    //   </Box>
    // </div>
    <div></div>
  );
}
