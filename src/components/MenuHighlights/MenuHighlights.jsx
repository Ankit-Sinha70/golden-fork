import { Avatar, Box, Paper, Typography } from "@mui/material";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./MenuHighlights.scss";

const MenuHighlights = ({ menuHighlights }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <Box>
      {/* Menu Highlights Section */}
      <Box className="menuHighlights">
        <Typography className="headTitle management">
          Most Selling Product
        </Typography>

        <div className="sliderContainer">
          <Slider {...settings}>
            {menuHighlights.map((item, index) => (
              <div key={index}>
                <Paper elevation={3} className="sliderContainer__card">
                  <Avatar
                    src={item.image}
                    alt={item.name}
                    className="sliderContainer__img"
                    variant="square"
                  />
                  <Typography variant="subtitle1" sx={{ marginTop: "8px" }}>
                    {item.name}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ marginTop: "8px" }}>
                    {item.details}
                  </Typography>
                </Paper>
              </div>
            ))}
          </Slider>
        </div>
      </Box>
    </Box>
  );
};

export default MenuHighlights;
