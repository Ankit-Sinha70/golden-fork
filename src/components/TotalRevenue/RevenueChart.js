import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Button from "@mui/material/Button";
import "./revenue.scss";
const data = {
  Monthly: {
    All: [
      { name: "Jan", value: 20 },
      { name: "Feb", value: 40 },
      { name: "Mar", value: 30 },
      { name: "Apr", value: 60 },
      { name: "May", value: 50 },
      { name: "Jun", value: 80 },
      { name: "Jul", value: 60 },
      { name: "Aug", value: 90 },
      { name: "Sep", value: 70 },
      { name: "Oct", value: 100 },
      { name: "Nov", value: 80 },
      { name: "Dec", value: 60 },
    ],
    Food: [
      { name: "Jan", value: 15 },
      { name: "Feb", value: 30 },
      { name: "Mar", value: 25 },
      { name: "Apr", value: 50 },
      { name: "May", value: 45 },
      { name: "Jun", value: 70 },
      { name: "Jul", value: 55 },
      { name: "Aug", value: 85 },
      { name: "Sep", value: 60 },
      { name: "Oct", value: 95 },
      { name: "Nov", value: 70 },
      { name: "Dec", value: 55 },
    ],
    Beverages: [
      { name: "Jan", value: 10 },
      { name: "Feb", value: 20 },
      { name: "Mar", value: 15 },
      { name: "Apr", value: 30 },
      { name: "May", value: 25 },
      { name: "Jun", value: 50 },
      { name: "Jul", value: 35 },
      { name: "Aug", value: 65 },
      { name: "Sep", value: 40 },
      { name: "Oct", value: 75 },
      { name: "Nov", value: 50 },
      { name: "Dec", value: 40 },
    ],
  },
  Weekly: {
    All: [
      { name: "Week 1", value: 50 },
      { name: "Week 2", value: 70 },
      { name: "Week 3", value: 65 },
      { name: "Week 4", value: 80 },
    ],
    Food: [
      { name: "Week 1", value: 40 },
      { name: "Week 2", value: 60 },
      { name: "Week 3", value: 55 },
      { name: "Week 4", value: 75 },
    ],
    Beverages: [
      { name: "Week 1", value: 20 },
      { name: "Week 2", value: 30 },
      { name: "Week 3", value: 35 },
      { name: "Week 4", value: 40 },
    ],
  },
  Daily: {
    All: [
      { name: "Mon", value: 10 },
      { name: "Tue", value: 20 },
      { name: "Wed", value: 30 },
      { name: "Thu", value: 25 },
      { name: "Fri", value: 35 },
      { name: "Sat", value: 50 },
      { name: "Sun", value: 40 },
    ],
    Food: [
      { name: "Mon", value: 8 },
      { name: "Tue", value: 15 },
      { name: "Wed", value: 25 },
      { name: "Thu", value: 20 },
      { name: "Fri", value: 30 },
      { name: "Sat", value: 45 },
      { name: "Sun", value: 35 },
    ],
    Beverages: [
      { name: "Mon", value: 5 },
      { name: "Tue", value: 10 },
      { name: "Wed", value: 15 },
      { name: "Thu", value: 12 },
      { name: "Fri", value: 18 },
      { name: "Sat", value: 30 },
      { name: "Sun", value: 25 },
    ],
  },
};
export default function RevenueChart({revenue, revenueChart}) {
  const [filter, setFilter] = useState("All");
  const [timeframe, setTimeframe] = useState("Monthly");
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };
  const handleTimeframeChange = (event) => {
    setTimeframe(event.target.value);
  };
  return (
    <div className="RevenueChart">
      {/* Header Section */}
      <div className="RevenueChart__head">
        <h6 className="RevenueChart__title">{revenue}</h6>
        <div className="RevenueChart__tabs">
        {["Monthly", "Weekly", "Today"].map((item) => (
          <Button
            key={item}
            variant={timeframe === item ? "contained" : "outlined"}
            // onClick={handleTimeframeChange}
          >
            {item}
          </Button>
        ))}
      </div>
        {/* <Select
          className="RevenueChart__select"
          value={timeframe}
          onChange={handleTimeframeChange}
        >
          <MenuItem value="Monthly">Monthly</MenuItem>
          <MenuItem value="Weekly">Weekly</MenuItem>
          <MenuItem value="Daily">Daily</MenuItem>
        </Select> */}
      </div>

      {/* Income Section */}
      <h4 className="RevenueChart__incomeText">${revenueChart}</h4>
      {/* Tabs Section */}
      {/* <div className="RevenueChart__tab">
        {["All", "Food", "Beverages"].map((category) => (
          <Button
            key={category}
            variant={filter === category ? "contained" : "outlined"}
            sx={{
              backgroundColor:
                filter === category ? "#FFE6E6" : "transparent",
              color: "#FF6B6B",
              borderColor: "#FF6B6B",
              borderRadius: "20px",
              textTransform: "none",
              fontWeight: "bold",
              ":hover": {
                backgroundColor: filter === category ? "#FFD1D1" : "#FFE6E6",
              },
            }}
            onClick={() => handleFilterChange(category)}
          >
            {category === "All" ? "All Food" : category}
          </Button>
        ))}
      </div> */}
      {/* Chart Section */}
      <div className="RevenueChart__chart">
        <ResponsiveContainer>
          <LineChart data={data[timeframe][filter]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12, fill: "#999" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#999" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              formatter={(value) => [`$${value}`, "Revenue"]}
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #FF6B6B",
                backgroundColor: "#fff",
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#b8860b"
              strokeWidth={2}
              fillOpacity={1}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
