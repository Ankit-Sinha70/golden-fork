import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import CircularLoader from "../../../../../components/CircularLoader/CircularLoader";
import {
  createAdminUser,
  fetchUserId,
  updateAdminUserById,
} from "../../../../../redux/slices/adminUserSlice";
import "./AddUser.scss";

const AddUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibilityToggle = () => {
    setShowPassword((prev) => !prev);
  };

  const { loading } = useSelector((state) => state.adminUser);

  const validationSchema = (isEditMode) =>
    Yup.object({
      firstName: Yup.string()
        .trim("First name cannot include leading or trailing spaces")
        .matches(
          /^[a-zA-Z\s\-]+$/,
          "First name cannot contain numbers or special characters"
        )
        .required("First name is required"),
      lastName: Yup.string()
        .trim("Last name cannot include leading or trailing spaces")
        .matches(
          /^[a-zA-Z\s\-]+$/,
          "Last name cannot contain numbers or special characters"
        )
        .required("Last name is required"),
      email: Yup.string()
        .trim("Email cannot include leading or trailing spaces")
        .matches(
          /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
          "Email must be valid and contain only lowercase letters"
        )
        .required("Email is required"),
      phoneNumber: Yup.string()
        .matches(
          /^[0-9]{10,15}$/,
          "Phone number must be between 10 and 15 digits"
        )
        .required("Phone number is required"),
      username: Yup.string()
        .trim("Username cannot include leading or trailing spaces")
        .required("Username is required"),
      password: Yup.string()
        .matches(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          "Password must be at least 8 characters, include one uppercase letter, one lowercase letter, one number, and one special character"
        )
        .when([], {
          is: () => !isEditMode,
          then: (schema) => schema.required("Password is required"),
        }),
      gender: Yup.string().required("Gender is required"),
      country: Yup.string()
        .trim("Country cannot include leading or trailing spaces")
        .matches(
          /^[a-zA-Z\s\-]+$/,
          "Country cannot contain numbers or special characters"
        )
        .required("Country is required"),
      state: Yup.string()
        .trim("State cannot include leading or trailing spaces")
        .matches(
          /^[a-zA-Z\s\-]+$/,
          "State cannot contain numbers or special characters"
        )
        .required("State is required"),
      city: Yup.string()
        .trim("City cannot include leading or trailing spaces")
        .matches(
          /^[a-zA-Z\s\-]+$/,
          "City cannot contain numbers or special characters"
        )
        .required("City is required"),
      zipCode: Yup.string()
        .matches(/^[0-9]+$/, "Zipcode must be numeric")
        .min(5, "Zipcode must be at least 5 digits")
        .max(9, "Zipcode must be no more than 9 digits")
        .required("Zipcode is required"),
      role: Yup.string().required("A role must be selected"),
      deliveryAddress: Yup.string()
        .trim("Delivery address cannot include leading or trailing spaces")
        .required("Delivery address is required"),
    });

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const response = await dispatch(fetchUserId(id)).unwrap();
          formik.setValues({
            firstName: response.user.firstName || "",
            lastName: response.user.lastName || "",
            email: response.user.email || "",
            phoneNumber: response.user.phoneNumber || "",
            username: response.user.username || "",
            password: "",
            gender: response.user.gender || "",
            country: response.user.country || "",
            state: response.user.state || "",
            city: response.user.city || "",
            zipCode: response.user.zipCode || "",
            role: response.user.role || "",
            deliveryAddress: response.user.deliveryAddress || "",
          });
        } catch (error) {
          console.error("Error fetching user data:", error.message);
        }
      };
      fetchData();
    }
  }, [dispatch, id]);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      username: "",
      password: "",
      gender: "",
      country: "",
      state: "",
      city: "",
      zipCode: "",
      role: "",
      deliveryAddress: "",
    },
    validationSchema: validationSchema(id !== undefined),
    onSubmit: async (values, { resetForm }) => {
      try {
        if (id) {
          await dispatch(
            updateAdminUserById({ id, formData: values })
          ).unwrap();
          navigate("/admin/users/list");
          resetForm();
        } else {
          await dispatch(createAdminUser(values)).unwrap();
          navigate("/admin/users/list");
          resetForm();
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    },
  });

  if (loading) {
    return <CircularLoader />;
  }

  return (
    <div className="pageTemplate">
      <div className="pageTemplate__head">
        <h1 className="headTitle management">
          {id ? "Update User" : "Add User"}
        </h1>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item lg={6} sm={6} xs={12}>
            <div className="inputGroup">
              <label className="inputGroup__title">First Name</label>
              <TextField
                fullWidth
                id="firstName"
                name="firstName"
                className="inputGroup__inputField"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </div>
          </Grid>
          <Grid item lg={6} sm={6} xs={12}>
            <div className="inputGroup">
              <label className="inputGroup__title">Last Name</label>
              <TextField
                fullWidth
                id="lastName"
                name="lastName"
                className="inputGroup__inputField"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </div>
          </Grid>
          <Grid item lg={6} sm={6} xs={12}>
            <div className="inputGroup">
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
              />
            </div>
          </Grid>
          <Grid item lg={6} sm={6} xs={12}>
            <div className="inputGroup">
              <label className="inputGroup__title">Phone Number</label>
              <TextField
                fullWidth
                id="phoneNumber"
                name="phoneNumber"
                className="inputGroup__inputField"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                error={
                  formik.touched.phoneNumber &&
                  Boolean(formik.errors.phoneNumber)
                }
                helperText={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                }
              />
            </div>
          </Grid>
          <Grid item lg={6} sm={6} xs={12}>
            <div className="inputGroup">
              <label className="inputGroup__title">Username</label>
              <TextField
                fullWidth
                id="username"
                name="username"
                className="inputGroup__inputField"
                value={formik.values.username}
                onChange={formik.handleChange}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
              />
            </div>
          </Grid>

          {!id && (
            <Grid item lg={6} sm={6} xs={12}>
              <div className="inputGroup">
                <label className="inputGroup__title">Password</label>
                <TextField
                  fullWidth
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="inputGroup__inputField"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handlePasswordVisibilityToggle}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </Grid>
          )}
          <Grid item lg={6} sm={6} xs={12}>
            <div className="inputGroup">
              <label className="inputGroup__title">Gender</label>
              <TextField
                fullWidth
                select
                id="gender"
                name="gender"
                className="inputGroup__inputField"
                value={formik.values.gender}
                onChange={formik.handleChange}
                error={formik.touched.gender && Boolean(formik.errors.gender)}
                helperText={formik.touched.gender && formik.errors.gender}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </TextField>
            </div>
          </Grid>
          <Grid item lg={6} sm={6} xs={12}>
            <div className="inputGroup">
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
            </div>
          </Grid>
          <Grid item lg={6} sm={6} xs={12}>
            <div className="inputGroup">
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
            </div>
          </Grid>
          <Grid item lg={6} sm={6} xs={12}>
            <div className="inputGroup">
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
            </div>
          </Grid>
          <Grid item lg={6} sm={6} xs={12}>
            <div className="inputGroup">
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
            </div>
          </Grid>
          <Grid item lg={6} sm={6} xs={12}>
            <div className="inputGroup">
              <label className="inputGroup__title">Role</label>
              <TextField
                fullWidth
                select
                id="role"
                name="role"
                className="inputGroup__inputField"
                value={formik.values.role}
                onChange={formik.handleChange}
                error={formik.touched.role && Boolean(formik.errors.role)}
                helperText={formik.touched.role && formik.errors.role}
              >
                <MenuItem value="Admin">Super Admin</MenuItem>
                <MenuItem value="Customer">Customer</MenuItem>
                <MenuItem value="RestaurantAdmin">Resturant Admin</MenuItem>
                <MenuItem value="KitchenAdmin">Kitchen Admin</MenuItem>
              </TextField>
            </div>
          </Grid>
          <Grid item xs={12}>
            <label className="inputGroup__title">Delivery Address</label>
            <TextField
              fullWidth
              id="deliveryAddress"
              name="deliveryAddress"
              className="inputGroup__inputField"
              value={formik.values.deliveryAddress}
              onChange={formik.handleChange}
              error={
                formik.touched.deliveryAddress &&
                Boolean(formik.errors.deliveryAddress)
              }
              helperText={
                formik.touched.deliveryAddress && formik.errors.deliveryAddress
              }
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <div className="add_list">
              <Button
                className="PrimaryButton"
                variant="contained"
                fullWidth
                type="submit"
              >
                {id ? "Update User" : "Add User"}
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddUser;
