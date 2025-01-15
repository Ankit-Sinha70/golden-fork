import React, { useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Food from "../../../../../assets/images/icon/jpeg/Table/Food.jpeg";
import { getMenuById } from "../../../../../redux/slices/menuSlice";
import CircularLoader from "../../../../../components/CircularLoader/CircularLoader";

const KitchenItemView = () => {
  const { menu, loading } = useSelector((state) => state.menu);
  const dispatch = useDispatch();

  const restaurantId = "6752f05f41c504ad449ae52b";

  useEffect(() => {
    if (restaurantId && (!menu || !menu.categories)) {
      dispatch(getMenuById(restaurantId));
    }
  }, [menu, dispatch, restaurantId]);

  return (
    <div className="pageTemplate">
      <div className="pageTemplate__head">
        {loading ? (
          <CircularLoader />
        ) : menu?.categories?.length > 0 ? (
          <>
            <Typography
              className="headTitle"
              variant="h4"
              sx={{ textAlign: "center", fontWeight: "bold", marginBottom: 2 }}
            >
              {menu.menuName}
            </Typography>

            <Grid container spacing={4}>
              {menu.categories.map((category) => (
                <Grid item xs={12} md={6} key={category._id}>
                  <Card sx={{ backgroundColor: "#fff", padding: 2 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        textAlign: "center",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        marginBottom: 2,
                        color: "#ff6600",
                      }}
                    >
                      {category.categoryName}
                    </Typography>

                    <Grid container spacing={2}>
                      {category.items.map((item) => (
                        <Grid item xs={12} key={item._id}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <CardMedia
                              component="img"
                              image={Food}
                              alt={item.name}
                              sx={{
                                width: 60,
                                height: 60,
                                borderRadius: "50%",
                                marginRight: 2,
                              }}
                            />
                            <CardContent
                              sx={{
                                flexGrow: 2,
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <Typography
                                variant="body1"
                                sx={{ fontWeight: "bold" }}
                              >
                                {item.name}
                              </Typography>
                              <Typography
                                variant="body1"
                                sx={{ fontWeight: "bold", color: "#333" }}
                              >
                                ₹{item.price}
                              </Typography>
                              <Typography
                                variant="body1"
                                sx={{ fontWeight: "bold", color: "#333" }}
                              >
                                {item.description}
                              </Typography>
                            </CardContent>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        ) : (
          <Typography
            variant="h6"
            sx={{ textAlign: "center", marginTop: 4, fontStyle: "italic" }}
          >
            No Items found
          </Typography>
        )}
      </div>
    </div>
  );
};

export default KitchenItemView;
