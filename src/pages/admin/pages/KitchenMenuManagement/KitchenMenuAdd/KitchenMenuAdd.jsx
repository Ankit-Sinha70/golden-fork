import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import CircularLoader from "../../../../../components/CircularLoader/CircularLoader";
import { getAllKitchens } from "../../../../../redux/slices/kitchenSlice";
import { getAllCategories } from "../../../../../redux/slices/menuCategorySlice";
import {
  createMenu,
  getMenuById,
  updateMenuById,
} from "../../../../../redux/slices/menuSlice";
import { getAllRestaurants } from "../../../../../redux/slices/restaurantSlice";

const KitchenMenuAdd = () => {
  const [loading, setLoading] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [kitchens, setKitchens] = useState([]);
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const restaurantsResponse = await dispatch(
          getAllRestaurants({ withoutPagination: true })
        );
        const fetchedRestaurants =
          restaurantsResponse.payload.restaurants || [];
        setRestaurants(fetchedRestaurants);

        const kitchensResponse = await dispatch(
          getAllKitchens({ withoutPagination: true })
        );
        const fetchedKitchens = kitchensResponse.payload?.kitchens || [];
        setKitchens(fetchedKitchens);

        const categoriesResponse = await dispatch(getAllCategories());
        const fetchedCategories = categoriesResponse.payload?.categories || [];
        setCategories(fetchedCategories);

        // If editing (id is provided), fetch the menu details
        if (id) {
          const menuResponse = await dispatch(getMenuById(id));
          const menuData = menuResponse.payload?.menu;

          if (menuData) {
            setRestaurants((prevRestaurants) => [
              ...prevRestaurants,
              menuData?.restaurantId,
            ]);

            setKitchens((prevKitchens) => [
              ...prevKitchens,
              menuData?.kitchenId,
            ]);

            formik.setValues({
              restaurantId: menuData.restaurantId?._id || "",
              menuName: menuData.menuName || "",
              kitchenId: menuData.kitchenId?._id || "",
              categories: menuData.categories.map((cat) => cat._id) || [],
            });
          }
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, id]);

  const formik = useFormik({
    initialValues: {
      restaurantId: "",
      menuName: "",
      kitchenId: "",
      categories: [],
    },
    validationSchema: Yup.object({
      restaurantId: Yup.string().required("Restaurant is required"),
      menuName: Yup.string()
        .required("Menu Name is required")
        .min(3, "Menu Name must be at least 3 characters"),
      kitchenId: Yup.string().required("Kitchen is required"),
      categories: Yup.array()
        .min(1, "At least one category must be selected")
        .required("Categories are required"),
    }),
    onSubmit: (values) => {
      setLoading(true);
      if (id) {
        const payload = {
          ...values,
        };

        dispatch(updateMenuById({ id, values: payload }))
          .then(() => {
            navigate("/admin/kitchen-menu/list");
          })
          .catch((err) => console.error("Error updating menu:", err));
      } else {
        dispatch(createMenu(values))
          .then(() => {
            navigate("/admin/kitchen-menu/list");
          })
          .catch((err) => console.error("Error creating menu:", err));
      }
    },
  });

  return (
    <>
      {loading ? (
        <div>
          <CircularLoader />
        </div>
      ) : (
        <div className="pageTemplate">
          <div className="pageTemplate__head">
            <h1 className="headTitle">{id ? "Edit Menu" : "Add Menu"}</h1>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item lg={6} sm={6} xs={12}>
                <label className="inputGroup__title">Restaurant List</label>
                <TextField
                  select
                  fullWidth
                  id="restaurantId"
                  name="restaurantId"
                  value={formik.values.restaurantId}
                  className="inputGroup__inputField"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.restaurantId &&
                    Boolean(formik.errors.restaurantId)
                  }
                  helperText={
                    formik.touched.restaurantId && formik.errors.restaurantId
                  }
                >
                  {restaurants?.map((restaurant) => (
                    <MenuItem key={restaurant._id} value={restaurant._id}>
                      {restaurant.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item lg={6} sm={6} xs={12}>
                <label className="inputGroup__title">Menu Name</label>
                <TextField
                  fullWidth
                  id="menuName"
                  name="menuName"
                  value={formik.values.menuName}
                  onChange={formik.handleChange}
                  className="inputGroup__inputField"
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.menuName && Boolean(formik.errors.menuName)
                  }
                  helperText={formik.touched.menuName && formik.errors.menuName}
                />
              </Grid>
              <Grid item lg={6} sm={6} xs={12}>
                <label className="inputGroup__title">Kitchen List</label>
                <TextField
                  select
                  fullWidth
                  id="kitchenId"
                  name="kitchenId"
                  value={formik.values.kitchenId}
                  className="inputGroup__inputField"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.kitchenId && Boolean(formik.errors.kitchenId)
                  }
                  helperText={
                    formik.touched.kitchenId && formik.errors.kitchenId
                  }
                >
                  {kitchens?.map((kitchen) => (
                    <MenuItem key={kitchen._id} value={kitchen._id}>
                      {kitchen.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item lg={6} sm={6} xs={12}>
                <label className="inputGroup__title">Categories List</label>
                <TextField
                  select
                  fullWidth
                  id="categories"
                  name="categories"
                  value={formik.values.categories}
                  className="inputGroup__inputField"
                  onChange={(event) => {
                    const {
                      target: { value },
                    } = event;
                    formik.setFieldValue(
                      "categories",
                      typeof value === "string" ? value.split(",") : value
                    );
                  }}
                  onBlur={formik.handleBlur}
                  SelectProps={{
                    multiple: true,
                    renderValue: (selected) =>
                      selected
                        ?.map((id) => {
                          const category = categories.find(
                            (category) => category._id === id
                          );
                          return category?.categoryName || "";
                        })
                        .join(", "),
                  }}
                  error={
                    formik.touched.categories &&
                    Boolean(formik.errors.categories)
                  }
                  helperText={
                    formik.touched.categories && formik.errors.categories
                  }
                >
                  {categories?.map((category) => (
                    <MenuItem key={category._id} value={category?._id}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              formik.values.categories.indexOf(category?._id) >
                              -1
                            }
                          />
                        }
                        label={category.categoryName}
                      />
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}
            >
              <div className="Primarydiv button--gray"></div>
              <div className="formActions">
                <Button
                  className="PrimaryButton"
                  variant="contained"
                  type="submit"
                  color="primary"
                >
                  {id ? "Update Menu" : "Submit"}
                </Button>
              </div>
            </Box>
          </form>
        </div>
      )}
    </>
  );
};

export default KitchenMenuAdd;
