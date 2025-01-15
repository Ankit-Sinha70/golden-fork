import { Call, Mail, RemoveRedEye, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  IconButton,
  Snackbar,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Facebook from "../../../assets/images/icon/svg/facebook.svg";
import Insta from "../../../assets/images/icon/svg/Insta.svg";
import GoldenForkLogo from "../../../assets/images/icon/svg/Login/MainLogo.svg";

import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { login } from "../../../redux/slices/authSlice";
import "./Login.scss";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const dispatch = useDispatch();

  const { isRole, loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();

  const initialEmail = localStorage.getItem("email") || "";

  const validationSchema = Yup.object({
    email: Yup.string()
      .trim("Email cannot include leading or trailing spaces")
      .matches(
        /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
        "Email must be valid and contain only lowercase letters"
      )
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  useEffect(() => {
    if (error) {
      setOpenSnackbar(true);
    }
  }, [error]);

  useEffect(() => {
    if (isAuthenticated) {
      if (isRole === "SuperAdmin") {
        navigate("/admin");
      } else if (isRole === "RestaurantAdmin") {
        navigate("/admin/restaurant");
      } else if (isRole === "KitchenStaff") {
        navigate("/admin/kitchen");
      }
    }
  }, [isAuthenticated, isRole, navigate]);

  return (
    <div className="login-container">
      <div className="login-left">
        <h2 className="login-title">Welcome to Golden Fork restaurant</h2>

        <div className="login-vector">
          <img src={GoldenForkLogo} alt="GoldenForkLogo" />
        </div>
        <div className="contactDetail">
          <a className="contactDetail__logo" href="/">
            <Mail /> info@gmail.com
          </a>
          <a className="contactDetail__logo" href="/">
            <Call /> +91 1234567892
          </a>
        </div>
        <ul className="social-icons">
          <li>
            <a className="social-icon" href="/">
              <img src={Facebook} height="20" width="20" alt="/" />
            </a>
          </li>
          <li>
            <a className="social-icon" href="/">
              <img src={Insta} height="20" width="20" alt="/" />
            </a>
          </li>
        </ul>
      </div>
      <div className="login-right">
        <Formik
          initialValues={{
            email: initialEmail,
            password: "",
            rememberMe: !!initialEmail,
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            if (values.rememberMe) {
              localStorage.setItem("email", values.email);
            } else {
              localStorage.removeItem("email");
            }
            dispatch(login(values));
          }}
        >
          {({ errors, touched, handleChange, handleBlur, values }) => (
            <Form className="login-form">
              <div className="input-group login">
                <h2 className="forgetPasswordWrapper__title">Sign In</h2>
                <label className="label">Email</label>
                <Field
                  as={TextField}
                  name="email"
                  variant="outlined"
                  fullWidth
                  placeholder="Enter email"
                  error={touched.email && Boolean(errors.email)}
                  helperText={
                    <ErrorMessage
                      name="email"
                      component="span"
                      className="error-text"
                    />
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  autoComplete="email"
                />
              </div>
              <div className="input-group login">
                <label className="label">Password</label>
                <div className="passwordfield">
                  <Field
                    as={TextField}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    variant="outlined"
                    fullWidth
                    placeholder="Enter password"
                    error={touched.password && Boolean(errors.password)}
                    helperText={
                      <ErrorMessage
                        name="password"
                        component="span"
                        className="error-text"
                      />
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    autoComplete="current-password"
                  />
                  <IconButton onClick={handlePasswordToggle}>
                    {showPassword ? <RemoveRedEye /> : <VisibilityOff />}
                  </IconButton>
                </div>
              </div>
              <div className="options">
                <FormControlLabel
                  control={
                    <Checkbox
                      name="rememberMe"
                      onChange={handleChange}
                      checked={values.rememberMe}
                    />
                  }
                  label="Remember me"
                />
                <a className="forgetPassword" href="/forgot-password">
                  Forgot Password
                </a>
              </div>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                className="PrimaryButton max-w-100 loginBtn"
              >
                {loading ? <CircularProgress size={24} /> : "Sign In"}
              </Button>
            </Form>
          )}
        </Formik>
      </div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;
