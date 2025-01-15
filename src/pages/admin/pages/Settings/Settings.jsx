import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { Avatar, Button, IconButton, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import User from "../../../../assets/images/icon/png/userImage.png";
import CircularLoader from "../../../../components/CircularLoader/CircularLoader";
import { updateAdminUserById } from "../../../../redux/slices/adminUserSlice";
import { fetchUserById } from "../../../../redux/slices/authSlice";
import "./Settings.scss";

const Settings = () => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  const { loginUser, loading } = useSelector((state) => state.auth);

  // const [profileImage, setProfileImage] = useState(null);
  // const [profileImageError, setProfileImageError] = useState("");

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserById(userId));
    }
  }, [dispatch, userId]);

  // useEffect(() => {
  //   if (loginUser?.profileImage) {
  //     setProfileImage(loginUser?.profileImage);
  //   }
  // }, [loginUser]);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .trim("Email cannot include leading or trailing spaces")
      .matches(
        /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
        "Email must be valid and contain only lowercase letters"
      )
      .required("Email is required"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, "Phone must be a number")
      .required("Phone is required"),
    username: Yup.string().required("Username is required"),
    country: Yup.string().required("Country is required"),
    state: Yup.string().required("State is required"),
    city: Yup.string().required("City is required"),
    zipCode: Yup.string()
      .matches(/^[0-9]+$/, "Zipcode must be a number")
      .required("Zipcode is required"),
    // reasonForJoining: Yup.string().required("Reason for joining is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: loginUser?.name || "",
      email: loginUser?.email || "",
      phoneNumber: loginUser?.phoneNumber || "",
      username: loginUser?.username || "",
      country: loginUser?.country || "",
      state: loginUser?.state || "",
      city: loginUser?.city || "",
      zipCode: loginUser?.zipCode || "",
      // reasonForJoining: loginUser?.reasonForJoining || "",
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });

      // if (profileImage instanceof File) {
      //   formData.append("profileImage", profileImage);
      // }

      // const payload = { ...values, profileImage };
      const payload = { ...values };

      dispatch(updateAdminUserById({ id: userId, userData: payload }))
        .unwrap()
        .then(() => {
          dispatch(fetchUserById(userId));
        })
        .catch((error) => {
          console.error("Error deleting contact:", error);
        });
    },
  });

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     if (file.size > 5 * 1024 * 1024) {
  //       setProfileImageError("File size should be less than 5MB");
  //       return;
  //     }
  //     const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  //     if (!allowedTypes.includes(file.type)) {
  //       setProfileImageError("Only JPG, PNG, or JPEG files are allowed");
  //       return;
  //     }
  //     setProfileImageError("");
  //     setProfileImage(file);
  //   }
  // };

  if (loading) {
    return <CircularLoader />;
  }

  return (
    <div className="pageTemplate">
      <div className="pageTemplate__head">
        <h1 className="headTitle">Settings</h1>
      </div>
      <div className="settingForm">
        <form onSubmit={formik.handleSubmit}>
          <div className="settingForm__profileContainer">
            <input
              type="file"
              id="profileImageInput"
              accept="image/*"
              style={{ display: "none" }}
              // onChange={handleImageChange}
            />
            <label htmlFor="profileImageInput" className="inputGroup__title">
              <IconButton component="span">
                <Avatar
                  src={
                    // profileImage
                    //   ? profileImage instanceof File
                    //     ? URL.createObjectURL(profileImage)
                    //     : profileImage
                    //   : ""
                    User
                  }
                  alt="Profile"
                  sx={{ width: 100, height: 100 }}
                >
                  {/* {!profileImage && <AddAPhotoIcon />} */}
                  <AddAPhotoIcon />
                </Avatar>
              </IconButton>
            </label>
            {/* {profileImageError && (
              <p className="error_text">{profileImageError}</p>
            )} */}
          </div>
          <div className="two_col_field_container">
            <div className="single_field_container">
              <label className="inputGroup__title">Name</label>
              <TextField
                fullWidth
                name="name"
                placeholder="Name"
                className="inputGroup__inputField"
                variant="outlined"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </div>

            <div className="single_field_container">
              <label className="inputGroup__title">Email</label>
              <TextField
                fullWidth
                name="email"
                 className="inputGroup__inputField"
                placeholder="Email"
                type="email"
                variant="outlined"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </div>
          </div>

          <div className="two_col_field_container">
            <div className="single_field_container">
              <label className="inputGroup__title">Phone</label>
              <TextField
                fullWidth
                name="phoneNumber"
                placeholder="Phone"
                variant="outlined"
                 className="inputGroup__inputField"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.phoneNumber &&
                  Boolean(formik.errors.phoneNumber)
                }
                helperText={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                }
              />
            </div>

            <div className="single_field_container">
              <label className="inputGroup__title">Username</label>
              <TextField
                fullWidth
                name="username"
                placeholder="Username"
                variant="outlined"
                 className="inputGroup__inputField"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
              />
            </div>
          </div>

          <div className="two_col_field_container">
            <div className="single_field_container">
              <label className="inputGroup__title">Country</label>
              <TextField
                fullWidth
                name="country"
                placeholder="Country"
                className="inputGroup__inputField"
                variant="outlined"
                value={formik.values.country}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.country && Boolean(formik.errors.country)}
                helperText={formik.touched.country && formik.errors.country}
              />
            </div>

            <div className="single_field_container">
              <label className="inputGroup__title">State</label>
              <TextField
                fullWidth
                name="state"
                className="inputGroup__inputField"
                placeholder="State"
                variant="outlined"
                value={formik.values.state}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.state && Boolean(formik.errors.state)}
                helperText={formik.touched.state && formik.errors.state}
              />
            </div>
          </div>

          <div className="two_col_field_container">
            <div className="single_field_container">
              <label className="inputGroup__title">City</label>
              <TextField
                fullWidth
                name="city"
                placeholder="City"
                className="inputGroup__inputField"
                variant="outlined"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
              />
            </div>

            <div className="single_field_container">
              <label className="inputGroup__title">Zipcode</label>
              <TextField
                fullWidth
                name="zipCode"
                placeholder="Zipcode"
                className="inputGroup__inputField"
                variant="outlined"
                value={formik.values.zipCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
                helperText={formik.touched.zipCode && formik.errors.zipCode}
              />
            </div>
          </div>

          {/* <div className="single_field_container reason_comment_textarea">
            <label className="inputGroup__title">Reason for Joining</label>
            <TextField
              fullWidth
              name="reasonForJoining"
              placeholder="Reason for Joining"
              variant="outlined"
              multiline
              rows={4}
              value={formik.values.reasonForJoining}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.reasonForJoining &&
                Boolean(formik.errors.reasonForJoining)
              }
              helperText={
                formik.touched.reasonForJoining &&
                formik.errors.reasonForJoining
              }
            />
          </div> */}

          <div className="formCard--btnPart">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: "20px" }}
              className="PrimaryButton"
            >
              Update
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
