import {
  Business,
  DeliveryDining,
  LocalBar,
  Restaurant,
  Satellite,
  Stars,
  TakeoutDining,
} from "@mui/icons-material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PlaceIcon from "@mui/icons-material/Place";
import TableBarIcon from "@mui/icons-material/TableBar";
import { Box, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Food from "../../../../../assets/images/icon/jpeg/mostSelling-item/mostSelling-Img.jpg";
import HotelIcon from "../../../../../assets/images/icon/jpeg/restaurant.jpg";
import CircularLoader from "../../../../../components/CircularLoader/CircularLoader";
import { getRestaurantById } from "../../../../../redux/slices/restaurantSlice";
import "./RestaurantDetails.scss";

const RestaurantDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(HotelIcon);
  const { restaurant, meta, loading } = useSelector(
    (state) => state.restaurant
  );

  useEffect(() => {
    dispatch(getRestaurantById(id));
  }, [dispatch, id]);

  if (loading) {
    return <CircularLoader />;
  }

  const menuHighlights = [
    {
      name: "Salad",
      reviews: 2,
      photos: 2,
      image: Food,
      details: "A fresh and healthy mix of vegetables and dressings.",
    },
    {
      name: "Undhiyu Puri Bhaji",
      price: 4,
      photos: 4,
      image: Food,
      details: "A traditional Gujarati dish served with crispy puris.",
    },
    {
      name: "Masala Dosa",
      reviews: 2,
      photos: 1,
      image: Food,
      details: "South Indian crepe filled with spicy potato masala.",
    },
    {
      name: "Special Mehta",
      reviews: 2,
      photos: 2,
      image: Food,
      details: "A chef's special dish with unique flavors and spices.",
    },
  ];

  const images = [
    { name: "Image", image: HotelIcon },
    { name: "Image", image: HotelIcon },
    { name: "Image", image: HotelIcon },
    { name: "Image", image: HotelIcon },
  ];

  const availablePlaces = [
    { id: "dinein", icon: <Restaurant />, label: "Dine-In" },
    { id: "delivery", icon: <DeliveryDining />, label: "Delivery" },
    { id: "takeaway", icon: <TakeoutDining />, label: "Takeaway" },
    { id: "bar", icon: <LocalBar />, label: "Bar" },
  ];

  function capitalizeFirstLetter(string) {
    if (!string) return "N/A";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  return (
    <div className="pageTemplate">
      <div className="pageTemplate__head">
        <h1 className="headTitle management">Restaurant Overview</h1>
      </div>

      <div className="addProperty dashboard-container">
        <Box>
          <Box className="moduleBox">
            <div className="property-details grayCard">
              <Grid container spacing={4} className="property_image_container">
                <Grid item md={9}>
                  <Box className="thumbnail-section">
                    <Box>
                      {images?.map((image, index) => (
                        <Box
                          key={index}
                          // onClick={() => handleImageClick(image)}
                          className="single_thumbnail_img"
                        >
                          <Paper
                            elevation={3}
                            className={`thumbnail ${
                              selectedImage === image ? "active" : ""
                            }`}
                          >
                            <img
                              src={selectedImage}
                              alt={`Thumbnail ${index}`}
                            />
                          </Paper>
                        </Box>
                      ))}
                    </Box>
                    <Box className="image-section">
                      <Paper elevation={3} className="main-image">
                        <img src={selectedImage} alt="Property" />
                      </Paper>
                      <Box className="saleTag">
                        <Satellite />
                      </Box>
                    </Box>
                  </Box>
                </Grid>

                <Grid item md={3}>
                  <Box className="property-info">
                    <Box className="restaurant-details grayCard">
                      <Typography
                        variant="h6"
                        className="restaurant-details__header"
                      >
                        {capitalizeFirstLetter(restaurant?.name)}
                      </Typography>

                      <Typography
                        variant="h6"
                        className="restaurant-details__header"
                      >
                        <div className="restaurant-details__textClamp">
                          {restaurant?.description}
                        </div>
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography>
                            <h6 className="restaurant-details-title location">
                              <PlaceIcon />{" "}
                              <span>
                                {" "}
                                {capitalizeFirstLetter(restaurant?.location)}
                              </span>
                            </h6>
                          </Typography>
                        </Grid>

                        <Grid item xs={12}>
                          <Typography>
                            <h6 className="restaurant-details-title">
                              <Business />
                              <span> Address :</span>
                            </h6>
                          </Typography>
                          <div className="restaurant-details__textClamp">
                            {capitalizeFirstLetter(restaurant?.address)}
                          </div>
                        </Grid>

                        <Grid item xs={12}>
                          <Typography>
                            <h6 className="restaurant-details-title">
                              <TableBarIcon /> <span> Table</span>{" "}
                              <span> 10</span>
                            </h6>
                          </Typography>
                        </Grid>

                        <Grid item xs={12}>
                          <Typography>
                            <h6 className="restaurant-details-title">
                              <MenuBookIcon /> <span> Menu</span>
                            </h6>
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography>
                            <h6 className="restaurant-details-title">
                              <Stars /> <span> {restaurant?.status}</span>
                            </h6>
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </div>
          </Box>

          <div>
            {/* <MenuHighlightsAndPopularTimes menuHighlights={menuHighlights} /> */}
          </div>

          <Box className="mapCard">
            <Box className="mapCard__mapBox">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d798.5648594720602!2d72.51867366714383!3d23.051097088415073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9b701695c397%3A0x37f7eac0feed6e52!2sTitanium%20square!5e1!3m2!1sen!2sin!4v1730186240481!5m2!1sen!2sin"
                width="600"
                height="450"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              />
            </Box>
          </Box>
          <Box className="nearPlaceCard">
            <Box className="nearPlaceCard__header">
              <h6>Available at Restaurant</h6>
            </Box>
            <Box className="nearPlaceCard__box">
              {availablePlaces.map((place) => {
                return (
                  <Paper key={place.id} className="PlaceBox">
                    {place.icon} {place.label}
                  </Paper>
                );
              })}
            </Box>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default RestaurantDetails;
