import { Button, Grid, MenuItem, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import CircularLoader from "../../../../../components/CircularLoader/CircularLoader";
import KitchenAdminService from "../../../../../redux/service/KitchenAdminService";
import RestaurantService from "../../../../../redux/service/RestaurantService";
import {
  createKitchen,
  getKitchenById,
  updateKitchenById,
} from "../../../../../redux/slices/kitchenSlice";

const AddKitchen = () => {
  const { id: kitchenId } = useParams();
  const [restaurants, setRestaurants] = useState([]);
  const [admins, setAdmins] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, kitchen } = useSelector((state) => state.kitchen); 

  useEffect(() => {
    const fetchRestaurantsAndAdmins = async () => {
      try {
        const restaurantData = await RestaurantService.getAllRestaurants({
          withoutPagination: true,
        });
        setRestaurants(restaurantData.restaurants || []);
        const adminData = await KitchenAdminService.getAvailableKitchenAdmins();
        setAdmins(adminData.data || []);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchRestaurantsAndAdmins();
  }, []);

  useEffect(() => {
    if (kitchenId) {
      dispatch(getKitchenById(kitchenId));
    }
  }, [dispatch, kitchenId]);

  const validationSchema = Yup.object({
    restaurantId: Yup.string().required("Restaurant is required"),
    name: Yup.string().required("Kitchen name is required"),
    kitchenAdminId: Yup.string().required("Admin is required"),
  });

  const formik = useFormik({
    initialValues: {
      restaurantId: "",
      name: "",
      kitchenAdminId: "",
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const payload = { ...values };
        if (kitchenId) {
          await dispatch(
            updateKitchenById({ id: kitchenId, formData: payload })
          )
            .then(() => {
              resetForm();
              navigate("/admin/kitchen/list");
            })
            .catch((err) => console.error("Error updating Kitchen:", err));
        } else {
          await dispatch(createKitchen(payload)).unwrap();
        }
        resetForm();
        navigate("/admin/kitchen/list");
      } catch (error) {
        console.error("Error:", error.message);
      }
    },
  });

  // Pre-fill form when editing
  useEffect(() => {
    if (kitchenId && kitchen) {
      setRestaurants((prevRestaurant) => [
        ...prevRestaurant,
        kitchen.restaurantId._Id,
      ]);

      setAdmins((prevAdmins) => [
        ...prevAdmins,
        kitchen?.kitchenAdminId?._id,
      ]);

      formik.setValues({
        restaurantId: kitchen.restaurantId?._id || "",
        name: kitchen?.name || "",
        // kitchenAdminId:admins[0]?._id || "",
        kitchenAdminId: kitchen?.kitchenAdminId?._id || "",
      });
    }
  }, [kitchen, kitchenId]);

  if (loading) {
    return <CircularLoader />;
  }

  return (
    <div className="pageTemplate">
      <div className="pageTemplate__head">
        <h1 className="headTitle management">
          {kitchenId ? "Update Kitchen" : "Add Kitchen"}
        </h1>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item lg={6} sm={6} xs={12}>
            <label className="inputGroup__title">Kitchen Name</label>
            <TextField
              fullWidth
              id="name"
              name="name"
              className="inputGroup__inputField"
              type="text"
              value={formik.values?.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>

          <Grid item lg={6} sm={6} xs={12}>
            <label className="inputGroup__title">Select Restaurant</label>
            <TextField
              fullWidth
              select
              id="restaurantId"
              name="restaurantId"
              className="inputGroup__inputField"
              value={formik.values.restaurantId}
              onChange={formik.handleChange}
              error={
                formik.touched.restaurantId &&
                Boolean(formik.errors.restaurantId)
              }
              helperText={
                formik.touched.restaurantId && formik.errors.restaurantId
              }
            >
              {restaurants?.map((restaurant) => (
                <MenuItem key={restaurant?._id} value={restaurant?._id}>
                  {restaurant?.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item lg={6} sm={6} xs={12}>
            <label className="inputGroup__title">Available Kitchen Admin</label>
            <TextField
              fullWidth
              select
              id="kitchenAdminId"
              name="kitchenAdminId"
              className="inputGroup__inputField"
              value={formik.values.kitchenAdminId}
              onChange={formik.handleChange}
              error={
                formik.touched.kitchenAdminId &&
                Boolean(formik.errors.kitchenAdminId)
              }
              helperText={
                formik.touched.kitchenAdminId && formik.errors.kitchenAdminId
              }
            >
              {admins?.map((admin) => (
                <MenuItem key={admin?._id} value={admin?._id}>
                  {`${admin?.firstName} ${admin?.lastName}`}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <Button
              style={{ marginTop: "50px" }}
              className="PrimaryButton"
              variant="contained"
              fullWidth
              type="submit"
            >
              {kitchenId ? "Update Kitchen" : "Add Kitchen"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddKitchen;
