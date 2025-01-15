import { Box, CardContent, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FoodMain from "../../../../../assets/images/icon/png/FoodMain.png";
import CircularLoader from "../../../../../components/CircularLoader/CircularLoader";
import FoodTable from "../../../../../components/Table/FoodTable";
import { getMenuById } from "../../../../../redux/slices/menuSlice";
import "./KitchenMenuView.scss";

const KitchenMenuView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    dispatch(getMenuById(id));
  }, [dispatch, id]);

  const { menu, loading } = useSelector((state) => state.menu);

  useEffect(() => {
    if (menu?.categories?.length > 0) {
      setSelectedCategory(menu.categories[0]);
    }
  }, [menu]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  function capitalizeFirstLetter(string) {
    if (!string) return "N/A";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  return (
    <>
      {loading ? (
        <div>
          <CircularLoader />
        </div>
      ) : (
        <div className="pageTemplate kitchenMenu">
          <div className="pageTemplate__head">
            <h1 className="headTitle">Kitchen Menu Management</h1>
          </div>

          <p className="kitchenMenu__title">{capitalizeFirstLetter(menu?.menuName)}</p>

          <Grid rid container spacing={4}>
            {menu?.categories?.map((category, index) => (
              <Grid item xs={12} md={3} key={index}>
                <div
                  className={`kitchenMenuCardsMain ${
                    selectedCategory?._id === category._id ? "selected" : ""
                  }`}
                  onClick={() => handleCategoryClick(category)}
                >
                  <Typography className="kitchenMenu__cardTitle">
                    {category.categoryName}
                  </Typography>
                  <div className="kitchenMenuCards">
                    <div className="kitchenMenuCards__img">
                      <img src={FoodMain} alt="FoodMain" />
                    </div>
                    <div className="kitchenMenuCards__content">
                      {category.items.map((item, idx) => (
                        <Grid item xs={12} key={idx}>
                          <Box>
                            <CardContent className="kitchenMenuCards__items">
                              <Typography
                                variant="body1"
                                sx={{ fontWeight: "bold" }}
                              >
                                {capitalizeFirstLetter(item.name)}
                              </Typography>
                              <Typography
                                variant="body1"
                                sx={{ fontWeight: "bold", color: "#333" }}
                              >
                                {item.price}
                              </Typography>
                            </CardContent>
                          </Box>
                        </Grid>
                      ))}
                    </div>
                  </div>
                </div>
              </Grid>
            ))}
            <Grid item xs={12} md={9}>
              <div className="kitchenMenuTable">
                <FoodTable tableData={selectedCategory} />
              </div>
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
};

export default KitchenMenuView;
