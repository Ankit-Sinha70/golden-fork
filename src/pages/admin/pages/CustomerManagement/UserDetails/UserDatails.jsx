import { CheckCircle } from "@mui/icons-material";
import { Avatar, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import User from "../../../../../assets/images/icon/png/userImage.png";
import CircularLoader from "../../../../../components/CircularLoader/CircularLoader";
import { fetchUserId } from "../../../../../redux/slices/adminUserSlice";
import "./UserDatails.scss";

const UserDatails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { selectedAdminUser, loading } = useSelector(
    (state) => state.adminUser
  );

  useEffect(() => {
    dispatch(fetchUserId(id));
  }, [dispatch, id]);

  if (loading) {
    return <CircularLoader />;
  }

  function capitalizeFirstLetter(string) {
    if (!string) return " ";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  return (
    <div className="pageTemplate">
      <div className="pageTemplate__head">
        <h1 className="headTitle">Manage User </h1>
      </div>

      <Grid container spacing={2} className="UserDetail">
        <Grid item xs={2} className="UserDetail__leftContents">
          <div className="UserDetail__leftContent">
            <div className="UserDetail__leftContent-img">
              <Avatar
                sx={{ width: 100, height: 100 }}
                src={User}
                alt="Richard Hendricks"
              />
            </div>
            <div className="UserDetail__leftContent-name">
              {selectedAdminUser?.firstName
                ? capitalizeFirstLetter(selectedAdminUser?.firstName)
                : capitalizeFirstLetter(selectedAdminUser?.name)}
              {capitalizeFirstLetter(selectedAdminUser?.lastName)}
            </div>
          </div>
        </Grid>
        <Grid className="UserDetail__rightContents" item xs={10}>
          <div className="UserDetail__rightContent">
            <div className="UserDetail__rightContent_details">
              <div className="UserDetail__rightContent_details-info">
                <span>Email</span>
                <CheckCircle
                  sx={{ color: "green", fontSize: 16, marginLeft: 0 }}
                />
                {selectedAdminUser?.email}
              </div>
              <div className="UserDetail__rightContent_details-info">
                <span>User Id</span>
                {selectedAdminUser?._id}
              </div>
              <div className="UserDetail__rightContent_details-info">
                <span>Full Name</span>
                {capitalizeFirstLetter(selectedAdminUser?.username)}
              </div>
            </div>

            <div className="UserDetail__rightContent_personalInfos">
              <div className="UserDetail__rightContent_personalInfos-aboutDetail">
                <div className="UserDetail__rightContent_personalInfos-topTitle">
                  <h6>Mobile Phone</h6>
                  <a>{selectedAdminUser?.phoneNumber}</a>
                </div>
                <div className="UserDetail__rightContent_personalInfos-topTitle">
                  <h6>Birthdate</h6>
                  <a>19.6.1988 (35)</a>
                </div>
                <div className="UserDetail__rightContent_personalInfos-topTitle">
                  <h6>User Name</h6>
                  <a>{selectedAdminUser?.username}</a>
                </div>
              </div>

              <div className="UserDetail__rightContent_personalInfos-aboutDetail bottom">
                <div className="UserDetail__rightContent_personalInfos-topTitle">
                  <h6>City</h6>
                  <a> {capitalizeFirstLetter(selectedAdminUser?.city)}</a>
                </div>
                <div className="UserDetail__rightContent_personalInfos-topTitle">
                  <h6>Country</h6>
                  <a> {capitalizeFirstLetter(selectedAdminUser?.country)}</a>
                </div>
                <div className="UserDetail__rightContent_personalInfos-topTitle">
                  <h6>Address</h6>
                  <a>
                    {" "}
                    {capitalizeFirstLetter(selectedAdminUser?.deliveryAddress)}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserDatails;
