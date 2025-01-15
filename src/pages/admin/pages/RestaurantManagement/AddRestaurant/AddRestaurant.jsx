import styled from "@emotion/styled";
import { Close, Upload } from "@mui/icons-material";
import { Button, Grid, MenuItem, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import CircularLoader from "../../../../../components/CircularLoader/CircularLoader";
import RestaurantService from "../../../../../redux/service/RestaurantService";
import {
  createRestaurant,
  getRestaurantById,
  updateRestaurantById
} from "../../../../../redux/slices/restaurantSlice";
import "./AddRestaurant.scss";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  whiteSpace: "nowrap",
  width: 1,
});

const AddRestaurant = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {loading } = useSelector((state) => state.restaurant);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [admins, setAdmins] = useState([]);

  const validationSchema = Yup.object({
    name: Yup.string()
      .trim("Name cannot include leading or trailing spaces")
      .required("Restaurant name is required"),
    location: Yup.string()
      .trim("Location cannot include leading or trailing spaces")
      .required("Location is required"),
    description: Yup.string()
      .trim("Description cannot include leading or trailing spaces")
      .required("Description is required"),
    restaurantAdminId: Yup.string().required("Restaurant Admin is required"),
    country: Yup.string()
      .trim("Country cannot include leading or trailing spaces")
      .required("Country is required"),
    state: Yup.string()
      .trim("State cannot include leading or trailing spaces")
      .required("State is required"),
    // image: Yup.array()
    //   .of(
    //     Yup.mixed()
    //       .test(
    //         "fileType",
    //         "Only images are allowed (JPEG, PNG, JPG)",
    //         (file) => {
    //           if (!file || typeof file === "string") return true;
    //           return ["image/jpeg", "image/png", "image/jpg"].includes(
    //             file.type
    //           );
    //         }
    //       )
    //       .test("fileSize", "Each file size should not exceed 5MB", (file) => {
    //         if (!file || typeof file === "string") return true;
    //         return file.size <= 5 * 1024 * 1024; // 5MB
    //       })
    //   )
    //   .min(1, "At least one image is required")
    //   .max(5, "Maximum 5 photos are allowed"),
    city: Yup.string()
      .trim("City cannot include leading or trailing spaces")
      .required("City is required"),
    zipCode: Yup.string()
      .matches(/^[0-9]+$/, "Zipcode must be numeric")
      .min(5, "Zipcode must be at least 5 digits")
      .max(9, "Zipcode must be no more than 9 digits")
      .required("Zipcode is required"),
    address: Yup.string()
      .trim("Address cannot include leading or trailing spaces")
      .required("Address is required"),
    openingHours: Yup.string()
      .trim("Opening hours cannot include leading or trailing spaces")
      .required("Opening hours are required"),
    phoneNumber: Yup.string()
      .matches(
        /^[0-9]{10,15}$/,
        "Phone number must be between 10 and 15 digits"
      )
      .required("Phone number is required"),
    email: Yup.string()
      .trim("Email cannot include leading or trailing spaces")
      .email("Invalid email format")
      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      location: "",
      description: "",
      restaurantAdminId: "",
      country: "",
      state: "",
      city: "",
      zipCode: "",
      address: "",
      openingHours: "",
      phoneNumber: "",
      email: "",
      image: [],
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("location", values.location);
        formData.append("description", values.description);
        formData.append("restaurantAdminId", values.restaurantAdminId);
        formData.append("country", values.country);
        formData.append("state", values.state);
        formData.append("city", values.city);
        formData.append("zipCode", values.zipCode);
        formData.append("address", values.address);
        formData.append("openingHours", values.openingHours);
        formData.append("phoneNumber", values.phoneNumber);
        formData.append("email", values.email);

        values.image.forEach((item) => {
          if (typeof item === "string") {
            formData.append("image[]", item);
          } else {
            formData.append("image[]", item);
          }
        });

        if (id) {
          await dispatch(updateRestaurantById({ id, formData })).unwrap();
        } else {
          // Create new restaurant
          await dispatch(createRestaurant(formData)).unwrap();
          resetForm();
          navigate("/admin/restaurant/list");
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    },
  });

  useEffect(() => {
    if (id) {
      const fetchRestaurantData = async () => {
        try {
          const response = await dispatch(getRestaurantById(id)).unwrap();
          formik.setValues({
            name: response?.restaurant?.name || "",
            location: response?.restaurant?.location || "",
            description: response?.restaurant?.description || "",
            restaurantAdminId: response?.restaurant?.restaurantAdminId || "",
            country: response?.restaurant?.country || "",
            state: response?.restaurant?.state || "",
            city: response?.restaurant?.city || "",
            zipCode: response?.restaurant?.zipCode || "",
            address: response?.restaurant?.address || "",
            openingHours: response?.restaurant?.openingHours || "",
            phoneNumber: response?.restaurant?.phoneNumber || "",
            email: response?.restaurant?.email || "",
            image: response?.restaurant?.image || [],
          });
          setImagePreviews(response?.restaurant?.image || []);
        } catch (error) {
          console.error("Error fetching restaurant data:", error.message);
        }
      };
      fetchRestaurantData();
    }
  }, [id, dispatch]);



  useEffect(() => {
    const fetchRestaurantAdmin = async () => {
      try {
        const data = await RestaurantService.availableResturantAdmin();
        const restaurantAdmins = (data.data || []).filter(
          (user) => user.role === "RestaurantAdmin"
        );
        setAdmins(restaurantAdmins || []);
      } catch (error) {
        console.error("Error fetching admin users:", error.message);
      }
    };
    fetchRestaurantAdmin();
  }, [dispatch, id]);


  const handleImageChange = (event) => {
    const files = Array.from(event.target.files).slice(0, 5);
    const existingUrls = formik.values.image.filter(
      (photo) => typeof photo === "string"
    );
    formik.setFieldValue("image", [...existingUrls, ...files]);
    setImagePreviews([
      ...existingUrls,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const handleRemoveImage = (index) => {
    const updatedPhotos = formik.values.image.filter((_, i) => i !== index);
    formik.setFieldValue("image", updatedPhotos);
    const updatedPreviews = updatedPhotos.map((photo) =>
      typeof photo === "string" ? photo : URL.createObjectURL(photo)
    );
    setImagePreviews(updatedPreviews);
  };

  if (loading) {
    return <CircularLoader />;
  }

  return (
    <div className="pageTemplate">
      <div className="pageTemplate__head">
        <h1 className="headTitle management">
          {id ? "Update Restaurant" : "Add Restaurant"}
        </h1>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item lg={6} sm={6} xs={12}>
            <label className="inputGroup__title">Restaurant Name</label>
            <TextField
              fullWidth
              id="name"
              name="name"
              className="inputGroup__inputField"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid item lg={6} sm={6} xs={12}>
            <label className="inputGroup__title">Location</label>
            <TextField
              fullWidth
              id="location"
              name="location"
              className="inputGroup__inputField"
              value={formik.values.location}
              onChange={formik.handleChange}
              error={formik.touched.location && Boolean(formik.errors.location)}
              helperText={formik.touched.location && formik.errors.location}
            />
          </Grid>
          <Grid item xs={12}>
            <label className="inputGroup__title">Description</label>
            <TextField
              fullWidth
              id="description"
              name="description"
              className="inputGroup__inputField"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
              multiline
              rows={4}
            />
          </Grid>
          <Grid item lg={6} sm={6} xs={12}>
            <label className="inputGroup__title">Email</label>
            <TextField
              fullWidth
              id="email"
              name="email"
              className="inputGroup__inputField"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              rows={4}
            />
          </Grid>
          <Grid item lg={6} sm={6} xs={12}>
            <label className="inputGroup__title">Phone Number</label>
            <TextField
              fullWidth
              id="phoneNumber"
              name="phoneNumber"
              className="inputGroup__inputField"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              error={
                formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
              }
              helperText={
                formik.touched.phoneNumber && formik.errors.phoneNumber
              }
              rows={4}
            />
          </Grid>
          <Grid item lg={6} sm={6} xs={12}>
            <div className="inputGroup">
              <label className="inputGroup__title">Select Admin</label>
              <TextField
                fullWidth
                select
                id="restaurantAdminId"
                name="restaurantAdminId"
                className="inputGroup__inputField"
                value={formik.values.restaurantAdminId}
                onChange={formik.handleChange}
                error={
                  formik.touched.restaurantAdminId &&
                  Boolean(formik.errors.restaurantAdminId)
                }
                helperText={
                  formik.touched.restaurantAdminId &&
                  formik.errors.restaurantAdminId
                }
              >
                {admins.map((admin) => (
                  <MenuItem key={admin?._id} value={admin?._id}>
                    {admin.name ?? admin.firstName}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </Grid>

          <Grid item lg={6} sm={6} xs={12}>
            <label className="inputGroup__title">Country</label>
            <TextField
              fullWidth
              id="country"
              name="country"
              className="inputGroup__inputField"
              value={formik.values.country}
              onChange={formik.handleChange}
              error={formik.touched.country && Boolean(formik.errors.country)}
              helperText={formik.touched.country && formik.errors.country}
            />
          </Grid>
          <Grid item lg={6} sm={6} xs={12}>
            <label className="inputGroup__title">State</label>
            <TextField
              fullWidth
              id="state"
              name="state"
              className="inputGroup__inputField"
              value={formik.values.state}
              onChange={formik.handleChange}
              error={formik.touched.state && Boolean(formik.errors.state)}
              helperText={formik.touched.state && formik.errors.state}
            />
          </Grid>
          <Grid item lg={6} sm={6} xs={12}>
            <label className="inputGroup__title">City</label>
            <TextField
              fullWidth
              id="city"
              name="city"
              className="inputGroup__inputField"
              value={formik.values.city}
              onChange={formik.handleChange}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            />
          </Grid>
          <Grid item lg={6} sm={6} xs={12}>
            <label className="inputGroup__title">Zip Code</label>
            <TextField
              fullWidth
              id="zipCode"
              name="zipCode"
              className="inputGroup__inputField"
              value={formik.values.zipCode}
              onChange={formik.handleChange}
              error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
              helperText={formik.touched.zipCode && formik.errors.zipCode}
            />
          </Grid>
          <Grid item lg={6} sm={6} xs={12}>
            <label className="inputGroup__title">Address</label>
            <TextField
              fullWidth
              id="address"
              name="address"
              className="inputGroup__inputField"
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
          </Grid>
          <Grid item lg={6} sm={6} xs={12}>
            <label className="inputGroup__title">Opening Hours</label>
            <TextField
              fullWidth
              id="openingHours"
              name="openingHours"
              className="inputGroup__inputField"
              value={formik.values.openingHours}
              onChange={formik.handleChange}
              error={
                formik.touched.openingHours &&
                Boolean(formik.errors.openingHours)
              }
              helperText={
                formik.touched.openingHours && formik.errors.openingHours
              }
            />
          </Grid>
          <Grid item xs={12}>
            <div className="customUploader">
              <label className="inputGroup__title">Add Restaurant Photo</label>
              <div
                style={{
                  border:
                    formik.touched.image && formik.errors.image
                      ? "1px solid red"
                      : "1px solid transparent",
                }}
              >
                <Button
                  className="customUploader__field"
                  component="label"
                  role={undefined}
                  variant="contained"
                  startIcon={<Upload />}
                >
                  Drop the image, orclick to Browse
                  <VisuallyHiddenInput
                    type="file"
                    multiple
                    accept="image/jpeg,image/png,image/jpg"
                    onChange={handleImageChange}
                  />
                </Button>
              </div>
              <div className="sliderPreviews">
                <div className="uploaded__List">
                  {imagePreviews.map((preview, index) => (
                    <div className="uploaded__Image" key={index}>
                      <img src={preview} alt={`Slider ${index}`} />
                      <Close
                        className="closeBtn"
                        onClick={() => handleRemoveImage(index)}
                      />
                    </div>
                  ))}
                </div>
                {formik.touched.image && formik.errors.image && (
                  <p className="error_message">{formik.errors.image}</p>
                )}
              </div>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="add_list">
              <Button
                className="PrimaryButton"
                variant="contained"
                fullWidth
                type="submit"
              >
                {id ? "Update Restaurant" : "Add Restaurant"}
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddRestaurant;
