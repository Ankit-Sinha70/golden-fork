import { Call, Mail } from "@mui/icons-material";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import GoldenForkLogo from "../../../assets/images/icon/svg/Login/MainLogo.svg";

import Facebook from "../../../assets/images/icon/svg/facebook.svg";
import Insta from "../../../assets/images/icon/svg/Insta.svg";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, IconButton, TextField } from "@mui/material";
import OtpInput from "react-otp-input";
import AuthService from "../../../redux/service/AuthService";
import "./ForgotPassword.scss";
import CircularLoader from "../../../components/CircularLoader/CircularLoader";

const emailValidationSchema = Yup.object().shape({
  email: Yup.string()
    .trim("Email cannot include leading or trailing spaces")
    .matches(
      /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
      "Email must be valid and contain only lowercase letters"
    )
    .required("Email is required"),
});

const otpValidationSchema = Yup.object().shape({
  otp: Yup.string()
    ?.length(4, "OTP must be 4 digits")
    .required("OTP is required"),
});

const passwordValidationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm your password"),
});

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [otpError, setOtpError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [generalError, setGeneralError] = useState("");

  // TOGGLE PASSWORD VISIBILITY
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  // HANDLE SENDING OTP
  const handleSendOtp = async (values) => {
    setGeneralError("");
    setEmail(values.email);
    setLoading(true);
    try {
      const response = await AuthService.forgotPassword(values.email);
      if (response.success) {
        setLoading(false);
        setStep(2);
      } else {
        setLoading(false);
        setGeneralError(response.message);
      }
    } catch (err) {
      setGeneralError("Failed to send OTP. Please try again.");
      setLoading(false);
    }
  };

  // HANDLE RESENDING OTP
  const handleResendOtp = async () => {
    setGeneralError("");
    setLoading(true);
    try {
      const response = await AuthService.forgotPassword(email);
      if (response.success) {
        setLoading(false);
        setStep(2);
      } else {
        setLoading(false);
        setGeneralError(response.message);
      }
    } catch (err) {
      setGeneralError("Failed to send OTP. Please try again.");
      setLoading(false);
    }
  };

  // HANDLE OTP VERIFICATION STEP 2
  const handleVerifyOtp = async (values) => {
    setLoading(true);
    setOtpError("");
    try {
      const response = await AuthService.verifyOTP(email, values.otp);
      if (response.success) {
        setLoading(false);
        setStep(3);
      } else {
        setLoading(false);
        setOtpError(response.message);
      }
    } catch (err) {
      setOtpError("Invalid OTP. Please try again.");
      setLoading(false);
    }
  };

  // HANDLE PASSWORD RESET STEP 3
  const handleResetPassword = async (values) => {
    setLoading(true);
    setPasswordError("");
    try {
      const response = await AuthService.resetPassword(email, values.password);
      if (response.success) {
        setLoading(false);
        setStep(4);
      } else {
        setLoading(false);
        setPasswordError(response.message);
      }
    } catch (err) {
      setPasswordError("Failed to reset password. Please try again.");
      setLoading(false);
    }
  };

  if (loading) {
    return <CircularLoader />;
  }

  return (
    <div className="login-container">
      <div className="login-left">
        <h2 className="login-title">Forgot your password? Don’t worry! .</h2>
        <div className="login-vector">
          <img src={GoldenForkLogo} alt="GoldenForkLogo" />
        </div>
        <div className="contactDetail">
          <p>
            <Mail /> info@gmail.com
          </p>
          <p>
            <Call /> +91 1234567892
          </p>
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
        {step === 1 && (
          <Formik
            initialValues={{ email: "" }}
            validationSchema={emailValidationSchema}
            onSubmit={handleSendOtp}
          >
            {({ errors, touched }) => (
              <Form className="forgetPasswordWrapper">
                <h2 className="forgetPasswordWrapper__title">Reset Password</h2>
                <p className="forgetPasswordWrapper__desc">
                  Enter the email associated with your account and we’ll send an
                  OTP.
                </p>
                <div className="inputgroup login">
                  <Field
                    as={TextField}
                    name="email"
                    type="email"
                    fullWidth
                    placeholder="Enter email"
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </div>
                {generalError && (
                  <p className="error_message">{generalError}</p>
                )}
                <Button className="PrimaryButton max-w-100" type="submit">
                  Send OTP
                </Button>
              </Form>
            )}
          </Formik>
        )}

        {step === 2 && (
          <Formik
            initialValues={{ otp: "" }}
            validationSchema={otpValidationSchema}
            onSubmit={handleVerifyOtp}
          >
            {({ values, errors, touched, setFieldValue }) => (
              <Form className="forgetPasswordWrapper">
                <h2 className="forgetPasswordWrapper__title">
                  OTP Verification
                </h2>
                <p className="forgetPasswordWrapper__desc">
                  Enter the OTP code we just sent you
                </p>
                <div className="otpInput-group">
                  <OtpInput
                    value={values.otp}
                    onChange={(otp) => setFieldValue("otp", otp)}
                    numInputs={4}
                    renderSeparator={<span>-</span>}
                    renderInput={(props) => <input {...props} />}
                    isInputNum
                    shouldAutoFocus
                  />
                  {touched.otp && errors.otp && (
                    <div className="error_message">{errors.otp}</div>
                  )}
                  {otpError && <p className="error_message">{otpError}</p>}
                </div>
                <p className="resend-OTP">
                  Didn’t receive the code?{" "}
                  <Button onClick={handleResendOtp}>Resend</Button>
                </p>
                <Button className="PrimaryButton max-w-100" type="submit">
                  Verify
                </Button>
              </Form>
            )}
          </Formik>
        )}

        {step === 3 && (
          <Formik
            initialValues={{ password: "", confirmPassword: "" }}
            validationSchema={passwordValidationSchema}
            onSubmit={handleResetPassword}
          >
            {({ errors, touched }) => (
              <Form className="login-form">
                <h2 className="forgetPasswordWrapper__title">
                  Create New Password
                </h2>

                <div className="input-group">
                  <label className="label">Enter new password</label>
                  <div className="passwordfield">
                    <Field
                      as={TextField}
                      type={showPassword ? "text" : "password"}
                      name="password"
                      variant="outlined"
                      fullWidth
                      placeholder="Enter password"
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                    />
                    <IconButton onClick={togglePasswordVisibility}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </div>
                </div>
                <div className="input-group">
                  <label className="label">Confirm password</label>
                  <div className="passwordfield">
                    <Field
                      as={TextField}
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      variant="outlined"
                      fullWidth
                      placeholder="Confirm password"
                      error={
                        touched.confirmPassword &&
                        Boolean(errors.confirmPassword)
                      }
                      helperText={
                        touched.confirmPassword && errors.confirmPassword
                      }
                    />
                    <IconButton onClick={toggleConfirmPasswordVisibility}>
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </div>
                  {passwordError && <p className="error">{passwordError}</p>}
                </div>

                <Button className="PrimaryButton" type="submit">
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        )}

        {step === 4 && (
          <div className="forgetPasswordWrapper">
            <h2 className="forgetPasswordWrapper__title">Password Changed</h2>
            <p className="forgetPasswordWrapper__desc">
              Your password has been successfully changed. You can now log in
              with your new password.
            </p>
            <Button className="PrimaryButton" href="/">
              Back to login
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
