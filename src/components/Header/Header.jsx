import { Button, Menu, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import User from "../../assets/images/icon/png/userImage.png";
import { ReactComponent as LogoutIcon } from "../../assets/images/icon/svg/logoutIcon.svg";
import { apiLogout, fetchUserById } from "../../redux/slices/authSlice";
import "./Header.scss";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [menuAnchor, setMenuAnchor] = useState(null);
  const { loginUser } = useSelector((state) => state.auth);

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleLogout = async () => {
    try {
      await dispatch(apiLogout());
      navigate("/");
    } catch (e) {
      console.error("Logout error: ", e.message);
    }
    handleMenuClose();
  };

  useEffect(() => {
    dispatch(fetchUserById(userId));
  }, [dispatch, userId]);

  return (
    <div className="mainHeader">
      <div className="mainHeader__profile">
        <Button onClick={handleMenuOpen} className="mainHeader__profile-btn">
          <label>Hello, {loginUser?.username} </label>

          <img
            src={
              loginUser?.profileImage &&
              loginUser?.profileImage !== null &&
              loginUser?.profileImage !== ""
                ? loginUser?.profileImage
                : User
            }
            alt="user"
            className="img-fluid mainHeader__profile-img"
          />
        </Button>
        <Menu
          className="mainHeader__profile-menu"
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
        >
          <MenuItem className="label">Welcome Admin!</MenuItem>

          <MenuItem onClick={handleLogout}>
            <LogoutIcon />
            <p className="dropDown__text">Logout</p>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Header;
