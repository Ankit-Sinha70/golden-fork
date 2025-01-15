import { Shortcut, Visibility } from "@mui/icons-material";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import MenuImage from "../../assets/images/icon/jpeg/Table/menu.jpg";
import RestaurantImage from "../../assets/images/icon/jpeg/Table/Restaurant.jpg";
import PropertyImage from "../../assets/images/icon/png/property.jpg";
import User from "../../assets/images/icon/png/userImage.png";
import { ReactComponent as DeleteIcon } from "../../assets/images/icon/svg/delete-icon.svg";
import { ReactComponent as EditIcon } from "../../assets/images/icon/svg/edit-icon.svg";
import Pagination from "../Pagination/Pagination";
import "./Table.scss";

const TableComponent = ({
  data,
  KitchenManagement,
  totalItems,
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  onEditRow,
  onDeleteRow,
  RestaurantManagement,
  MenuTable,
  MenuItem,
  action = true,
  pagination,
  userTable,
  tableBooking,
  OrderManagement,
  UpcomingOrder,
  CompletedOrder,
  NewOrder,
  OrderQues,
  ContactUs,
  TableManagement,
  UserReport,
  MenuCategoryTable,
  MenuTable2,
}) => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  function formatDateTime(isoString) {
    if (!isoString) return "N/A";
    const date = new Date(isoString);
    if (isNaN(date.getTime())) {
      console.error("Invalid date value:", isoString); 
      return "Invalid Date";
    }
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
      timeStyle: "short",
    })?.format(date);
  }

  function capitalizeFirstLetter(string) {
    if (!string) return "N/A";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  return (
    <div className="tableCard">
      <TableContainer>
        <Table aria-label="Property Table">
          <TableHead>
            <TableRow>
              {RestaurantManagement ? (
                <>
                  <TableCell>Restaurant Name</TableCell>
                  <TableCell>Restaurant Address</TableCell>
                  <TableCell>Restaurant Status</TableCell>
                  <TableCell>Restaurant Location</TableCell>
                  <TableCell>Restaurant Contact</TableCell>

                  <TableCell>Restaurant Open Hours</TableCell>
                  {/* <TableCell>Available Tables</TableCell> */}
                  <TableCell>Restaurant Image</TableCell>
                  <TableCell>Last Update </TableCell>
                  <TableCell sx={{ borderLeft: "solid 1px #6D7379" }}>
                    Action
                  </TableCell>
                </>
              ) : KitchenManagement ? (
                <>
                  <TableCell>Kitchen Name</TableCell>
                  <TableCell>Kitchen/Restaurant Location</TableCell>
                  <TableCell>Kithen/Restaurant Address</TableCell>
                  <TableCell>Kitchen/Restaurant Status</TableCell>
                  <TableCell>Kitchen Image</TableCell>
                  <TableCell>Last Update </TableCell>
                  <TableCell sx={{ borderLeft: "solid 1px #6D7379" }}>
                    Action
                  </TableCell>
                </>
              ) : MenuTable ? (
                <>
                  <TableCell>Menu Name</TableCell>
                  <TableCell>Menu Categories</TableCell>
                  <TableCell>Menu Item</TableCell>
                  <TableCell>Restaurant Name</TableCell>
                  <TableCell>Menu Status</TableCell>
                  <TableCell>Restaurant Location </TableCell>
                  <TableCell>Restaurant Contact</TableCell>
                  <TableCell>Restaurant Status</TableCell>
                  <TableCell>Total Menu Item</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Last Update </TableCell>

                  {action && (
                    <TableCell style={{ width: "100px" }}>Action</TableCell>
                  )}
                </>
              ) : MenuTable2 ? (
                <>
                  <TableCell>Menu Name</TableCell>
                  <TableCell>Menu Categories</TableCell>
                  <TableCell>Restaurant Name</TableCell>
                  <TableCell>Menu Status</TableCell>
                  <TableCell>Restaurant Location </TableCell>
                  <TableCell>Restaurant Contact</TableCell>
                  <TableCell>Restaurant Status</TableCell>
                  <TableCell>Total Menu Item</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Last Update </TableCell>

                  {action && (
                    <TableCell style={{ width: "100px" }}>Action</TableCell>
                  )}
                </>
              ) : userTable ? (
                <>
                  <TableCell>Image</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Verified User </TableCell>
                  <TableCell>Country</TableCell>
                  <TableCell>Last Update </TableCell>
                  <TableCell sx={{ borderLeft: "solid 1px #6D7379" }}>
                    Action
                  </TableCell>
                </>
              ) : UserReport ? (
                <>
                  <TableCell>Email</TableCell>
                  <TableCell>Created At</TableCell>
                </>
              ) : tableBooking ? (
                <>
                  <TableCell>User detail</TableCell>
                  <TableCell>Table no</TableCell>
                  <TableCell>Order detail</TableCell>
                  <TableCell>Date and time</TableCell>
                  <TableCell sx={{ borderLeft: "solid 1px #6D7379" }}>
                    Action
                  </TableCell>
                </>
              ) : OrderManagement ? (
                <>
                  <TableCell>Order number</TableCell>
                  <TableCell>Item details</TableCell>
                  <TableCell>Users detail</TableCell>
                  <TableCell>Total amount of that order</TableCell>
                  <TableCell>Payment details</TableCell>
                  <TableCell sx={{ borderLeft: "solid 1px #6D7379" }}>
                    Action
                  </TableCell>
                </>
              ) : UpcomingOrder ? (
                <>
                  <TableCell>Order number</TableCell>
                  <TableCell>Item details</TableCell>
                  <TableCell>Users detail</TableCell>
                  <TableCell>Total amount of that order</TableCell>
                  <TableCell>Payment details</TableCell>
                  <TableCell>Order type</TableCell>
                  <TableCell sx={{ borderLeft: "solid 1px #6D7379" }}>
                    Action
                  </TableCell>
                </>
              ) : CompletedOrder ? (
                <>
                  <TableCell>Customer Name</TableCell>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Date/Time Completed</TableCell>
                  <TableCell>Total Amount</TableCell>
                  <TableCell>Number of Items</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Delivery Agent</TableCell>
                  <TableCell>Instructions</TableCell>
                  <TableCell sx={{ borderLeft: "solid 1px #6D7379" }}>
                    Action
                  </TableCell>
                </>
              ) : NewOrder ? (
                <>
                  <TableCell>Customer Name</TableCell>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Date/Time Created</TableCell>
                  <TableCell>Estimated Preparation Time</TableCell>
                  <TableCell>Total Amount</TableCell>
                  <TableCell>Number of Items</TableCell>
                  <TableCell>Delivery Address</TableCell>
                  <TableCell>Delivery Agent</TableCell>
                  <TableCell>Special Instructions</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell sx={{ borderLeft: "solid 1px #6D7379" }}>
                    Action
                  </TableCell>
                </>
              ) : OrderQues ? (
                <>
                  <TableCell>Number</TableCell>
                  <TableCell>Order details</TableCell>
                  <TableCell>Start Order</TableCell>
                  <TableCell>Complete Order</TableCell>
                  <TableCell sx={{ borderLeft: "solid 1px #6D7379" }}>
                    Action
                  </TableCell>
                </>
              ) : TableManagement ? (
                <>
                  <TableCell>Available Table No </TableCell>
                  <TableCell>Available Capacity </TableCell>
                  <TableCell>Restaurant Name</TableCell>
                  <TableCell>Restaurant Status</TableCell>
                  <TableCell>Restaurant Location</TableCell>
                  <TableCell>Restaurant Contact</TableCell>
                  <TableCell>Available Booking Slots</TableCell>
                  <TableCell>Restaurant Image</TableCell>
                  <TableCell>Last Update </TableCell>
                  <TableCell sx={{ borderLeft: "solid 1px #6D7379" }}>
                    Action
                  </TableCell>
                </>
              ) : MenuItem ? (
                <>
                  <TableCell>Menu Categories</TableCell>
                  <TableCell>Name </TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Is Available</TableCell>
                  <TableCell>Restaurant Name</TableCell>
                  <TableCell>Restaurant Location</TableCell>
                  <TableCell>Restaurant Image</TableCell>
                  <TableCell>Last Update </TableCell>
                  <TableCell sx={{ borderLeft: "solid 1px #6D7379" }}>
                    Action
                  </TableCell>
                </>
              ) : MenuCategoryTable ? (
                <>
                  <TableCell>Categories Name</TableCell>
                  <TableCell>Categories Items </TableCell>
                  <TableCell>Categories Image</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Last Update </TableCell>
                  <TableCell sx={{ borderLeft: "solid 1px #6D7379" }}>
                    Action
                  </TableCell>
                </>
              ) : (
                ContactUs && (
                  <>
                    <TableCell>Name</TableCell>
                    <TableCell>Subject</TableCell>
                    <TableCell>Message topic </TableCell>
                    <TableCell>Message </TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Contact</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell sx={{ borderLeft: "solid 1px #6D7379" }}>
                      Action
                    </TableCell>
                  </>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data?.length > 0 ? (
              data.map((row, index) => {
                return (
                  <TableRow key={index}>
                    {RestaurantManagement ? (
                      <>
                        <TableCell>
                          {capitalizeFirstLetter(row?.name)}
                        </TableCell>
                        <TableCell>
                          {capitalizeFirstLetter(row?.address)}
                        </TableCell>
                        <TableCell>
                          <span
                            className="chip"
                            style={{
                              background:
                                row?.status === "Close"
                                  ? "#5CC18433"
                                  : "#E9676733",
                              color:
                                row?.status === "Open" ? "#5CC184" : "#E96767",
                            }}
                          >
                            {row?.status}
                          </span>
                        </TableCell>
                        <TableCell>{row?.location || "N/A"}</TableCell>
                        <TableCell className="tableCard__contact">
                          <span>Email:{row?.email || "N/A"}</span>
                          <span>Phone No:{row?.phoneNumber || "N/A"}</span>
                        </TableCell>

                        <TableCell>
                          {formatDateTime(row?.openingHours) || "N/A"}
                        </TableCell>
                        {/* <TableCell>{row?.availableTable || "N/A"}</TableCell> */}
                        <TableCell>
                          <div className="propertyHeading coupon_list_img">
                            <img
                              src={row?.image || RestaurantImage}
                              alt="property"
                              className="propertyHeading__img"
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          {formatDateTime(row?.updatedAt) || "N/A"}
                        </TableCell>
                        <TableCell sx={{ borderLeft: "solid 1px #6D7379" }}>
                          <div className="action_btn_container">
                            <IconButton
                              onClick={() =>
                                navigate(`/admin/restaurant/edit/${row?._id}`)
                              }
                              color="primary"
                              className="edit_action"
                            >
                              <EditIcon />
                            </IconButton>

                            <IconButton
                              onClick={() =>
                                navigate(`/admin/restaurant/view/${row?._id}`)
                              }
                              className="edit_action"
                              style={{ color: "#c29671" }}
                            >
                              <Visibility />
                            </IconButton>

                            <IconButton
                              onClick={() => onDeleteRow(row)}
                              color="secondary"
                              className="delete_action"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </div>
                        </TableCell>
                      </>
                    ) : KitchenManagement ? (
                      <>
                        <TableCell>
                          {capitalizeFirstLetter(row?.name || "N/A")}
                        </TableCell>
                        <TableCell>
                          {row?.restaurantId?.location || "N/A"}
                        </TableCell>
                        <TableCell>
                          {capitalizeFirstLetter(
                            row?.restaurantId?.address || "N/A"
                          )}
                        </TableCell>

                        <TableCell>
                          <span
                            className="chip"
                            style={{
                              background:
                                row?.status === "Active"
                                  ? "#5CC18433"
                                  : "#E9676733",
                              color:
                                row?.status === "Rent" ? "#5CC184" : "#E96767",
                            }}
                          >
                            {row?.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="propertyHeading coupon_list_img">
                            <img
                              src={row?.couponImage || MenuImage}
                              alt="property"
                              className="propertyHeading__img"
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          {formatDateTime(row?.updatedAt) || "N/A"}
                        </TableCell>

                        <TableCell>
                          <div className="action_btn_container">
                            {/* {row.createdBy === userId ? ( */}
                            <IconButton
                              onClick={() =>
                                navigate(`/admin/kitchen/add/${row._id}`)
                              }
                              color="primary"
                              className="edit_action"
                            >
                              <EditIcon />
                            </IconButton>
                            {/* ) : null} */}
                            <IconButton
                              onClick={() =>
                                navigate(`/admin/properties/details/${row._id}`)
                              }
                              className="edit_action"
                              style={{ color: "#c29671" }}
                            >
                              <Visibility />
                            </IconButton>
                            <IconButton
                              onClick={() => onDeleteRow(row)}
                              color="secondary"
                              className="delete_action"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </div>
                        </TableCell>
                      </>
                    ) : MenuTable ? (
                      <>
                        <TableCell>
                          {capitalizeFirstLetter(row?.name || "N/A")}
                        </TableCell>
                        <TableCell>
                          {row?.categories?.length > 0
                            ? row.categories.map((category, index) => (
                                <div key={index}>
                                  {index + 1}.{" "}
                                  {capitalizeFirstLetter(
                                    category?.categoryName
                                  )}
                                </div>
                              ))
                            : "N/A"}
                        </TableCell>
                        <TableCell>
                          {row?.categories?.length > 0
                            ? row.categories.map((category, categoryIndex) => (
                                <Paper
                                  key={categoryIndex}
                                  elevation={2} 
                                  style={{
                                    marginBottom: "10px",
                                    padding: "10px",
                                    minWidth: "150px", 
                                    width: "auto",
                                  }}
                                >
                                  {category?.items?.length > 0 ? (
                                    category.items.map((item, itemIndex) => (
                                      <div key={item._id || itemIndex}>
                                        {itemIndex + 1}.{" "}
                                        {capitalizeFirstLetter(
                                          item?.name || "N/A"
                                        )}
                                      </div>
                                    ))
                                  ) : (
                                    <div>No Items Available</div>
                                  )}
                                </Paper>
                              ))
                            : "N/A"}
                        </TableCell>
                        
                        <TableCell>
                          {capitalizeFirstLetter(row?.restaurant || "N/A")}
                        </TableCell>
                        <TableCell>
                          {row?.isActive === "Active"
                            ? "Active"
                            : "De-Active" || "N/A"}
                        </TableCell>
                        <TableCell>
                          {capitalizeFirstLetter(row?.location || "N/A")}
                        </TableCell>
                        <TableCell>Email : {row?.email || "N/A"}</TableCell>
                        <TableCell>
                          <span
                            className="chip"
                            style={{
                              color:
                                row?.status === "active"
                                  ? "#5CC184"
                                  : "#E96767",
                              padding: "0px",
                            }}
                          >
                            {row?.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          {row?.categories?.length > 0
                            ? row.categories.reduce(
                                (total, category) =>
                                  total + category.items.length,
                                0
                              )
                            : "N/A"}
                        </TableCell>
                        <TableCell>
                          <div className="propertyHeading coupon_list_img">
                            <img
                              src={row?.image || MenuImage}
                              alt="property"
                              className="propertyHeading__img"
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          {formatDateTime(row?.updatedAt) || "N/A"}
                        </TableCell>
                        {action && (
                          <TableCell>
                            <div className="action_btn_container">
                              <IconButton
                                onClick={() =>
                                  navigate(
                                    `/admin/kitchen-menu/edit/${row?.id}`
                                  )
                                }
                                color="primary"
                                className="edit_action"
                              >
                                <EditIcon />
                              </IconButton>

                              <IconButton
                                onClick={() =>
                                  navigate(
                                    `/admin/kitchen-menu/view/${row?.id}`
                                  )
                                }
                                className="edit_action"
                                style={{ color: "#c29671" }}
                              >
                                <Visibility />
                              </IconButton>
                              <IconButton
                                onClick={() => onDeleteRow(row)}
                                className="delete_action"
                                color="secondary"
                              >
                                <DeleteIcon />
                              </IconButton>
                            </div>
                          </TableCell>
                        )}
                      </>
                    ) : MenuTable2 ? (
                      <>
                        <TableCell>
                          {capitalizeFirstLetter(row?.menuName || "N/A")}
                        </TableCell>
                        <TableCell>
                          {row?.categories?.length > 0
                            ? row.categories.map((category, index) => (
                                <div key={index}>
                                  {index + 1}.{" "}
                                  {capitalizeFirstLetter(
                                    category?.categoryName
                                  )}
                                </div>
                              ))
                            : "N/A"}
                        </TableCell>
                        <TableCell>
                          {" "}
                          {capitalizeFirstLetter(
                            row?.restaurantId.name || "N/A"
                          )}
                        </TableCell>

                        <TableCell>
                          {capitalizeFirstLetter(row?.status || "N/A")}
                        </TableCell>

                        <TableCell>
                          {capitalizeFirstLetter(
                            row?.restaurantId.location || "N/A"
                          )}
                        </TableCell>

                        <TableCell>
                          {row?.restaurantId.phoneNumber || "N/A"}
                        </TableCell>

                        <TableCell>
                          <span
                            className="chip"
                            style={{
                              background:
                                row?.status === "active"
                                  ? "#5CC18433"
                                  : "#E9676733",
                              color:
                                row?.status === "active"
                                  ? "#5CC184"
                                  : "#E96767",
                              padding: "0px",
                            }}
                          >
                            {capitalizeFirstLetter(
                              row?.restaurantId.status || "N/A"
                            )}
                          </span>
                        </TableCell>

                        <TableCell>
                          {row?.restaurantId.items > 0 || "N/A"}
                        </TableCell>

                        <TableCell>
                          <div className="propertyHeading coupon_list_img">
                            <img
                              src={row?.image || MenuImage}
                              alt="property"
                              className="propertyHeading__img"
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          {formatDateTime(row?.updatedAt) || "N/A"}
                        </TableCell>

                        {action && (
                          <TableCell>
                            <div className="action_btn_container">
                              {/* <IconButton
                                onClick={() => onEditRow(row)}
                                color="primary"
                                className="edit_action"
                              >
                                <EditIcon />
                              </IconButton> */}

                              <IconButton
                                onClick={() =>
                                  navigate(
                                    `/admin/kitchen-menu/view/${row?._id}`
                                  )
                                }
                                className="edit_action"
                                style={{ color: "#c29671" }}
                              >
                                <Visibility />
                              </IconButton>
                              <IconButton
                                onClick={() => onDeleteRow(row?._id)}
                                className="delete_action"
                                color="secondary"
                              >
                                <DeleteIcon />
                              </IconButton>
                            </div>
                          </TableCell>
                        )}
                      </>
                    ) : userTable ? (
                      <>
                        <TableCell>
                          <div className="propertyHeading coupon_list_img">
                            <img
                              src={row?.couponImage || User}
                              alt="property"
                              className="propertyHeading__img"
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          {row?.firstName && row?.lastName
                            ? `${row.firstName} ${row.lastName}`
                            : "N/A"}
                        </TableCell>
                        <TableCell>
                          {row?.email || "N/A"} {row?.phoneNumber}
                        </TableCell>

                        <TableCell>{row?.role || "N/A"}</TableCell>
                        <TableCell>{row?.status || "N/A"}</TableCell>
                        <TableCell>{row?.isEmailVerified || "N/A"}</TableCell>
                        <TableCell>{row?.country || "N/A"}</TableCell>

                        <TableCell>
                          {formatDateTime(row?.updatedAt || "N/A")}
                        </TableCell>

                        <TableCell sx={{ borderLeft: "solid 1px #6D7379" }}>
                          <div className="action_btn_container">
                            <>
                              <IconButton
                                onClick={() =>
                                  navigate(`/admin/user/edit/${row?._id}`)
                                }
                                color="primary"
                                className="edit_action"
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                onClick={() => onDeleteRow(row)}
                                color="secondary"
                                className="delete_action"
                              >
                                <DeleteIcon />
                              </IconButton>
                            </>

                            <IconButton
                              onClick={() =>
                                navigate(`/admin/user/view/${row?._id}`)
                              }
                              className="edit_action"
                              style={{ color: "#c29671" }}
                            >
                              <Visibility />
                            </IconButton>
                          </div>
                        </TableCell>
                      </>
                    ) : UserReport ? (
                      <>
                        <TableCell>{row?.email}</TableCell>
                        <TableCell>{row?.createdAt}</TableCell>
                      </>
                    ) : tableBooking ? (
                      <>
                        <TableCell>User detail</TableCell>
                        <TableCell>User detail</TableCell>
                        <TableCell>User detail</TableCell>
                        <TableCell>User detail</TableCell>
                        <TableCell>User detail</TableCell>
                      </>
                    ) : OrderManagement ? (
                      <>
                        <TableCell>User detail</TableCell>
                        <TableCell>User detail</TableCell>
                        <TableCell>User detail</TableCell>
                        <TableCell>User detail</TableCell>
                        <TableCell>User detail</TableCell>
                      </>
                    ) : UpcomingOrder ? (
                      <>
                        <TableCell>User detail</TableCell>
                        <TableCell>User detail</TableCell>
                        <TableCell>User detail</TableCell>
                        <TableCell>User detail</TableCell>
                        <TableCell>User detail</TableCell>
                      </>
                    ) : CompletedOrder ? (
                      <>
                        <TableCell>User detail</TableCell>
                        <TableCell>User detail</TableCell>
                        <TableCell>User detail</TableCell>
                        <TableCell>User detail</TableCell>
                        <TableCell>User detail</TableCell>
                        <TableCell>User detail</TableCell>
                        <TableCell>User detail</TableCell>
                        <TableCell>User detail</TableCell>
                      </>
                    ) : NewOrder ? (
                      <>
                        <TableCell>User detail</TableCell>
                        <TableCell>User detail</TableCell>
                        <TableCell>User detail</TableCell>
                        <TableCell>User detail</TableCell>
                        <TableCell>User detail</TableCell>
                        <TableCell>User detail</TableCell>
                        <TableCell>User detail</TableCell>
                        <TableCell>User detail</TableCell>
                        <TableCell>User detail</TableCell>
                        <TableCell>User detail</TableCell>
                      </>
                    ) : OrderQues ? (
                      <>
                        <TableCell>User detail</TableCell>
                        <TableCell>User detail</TableCell>
                        <TableCell>User detail</TableCell>
                        <TableCell>User detail</TableCell>
                      </>
                    ) : TableManagement ? (
                      <>
                        <TableCell>
                          {row?.tableNumber || row?.tableNumber}
                        </TableCell>
                        <TableCell>{row?.capacity || row?.capacity}</TableCell>
                        <TableCell>
                          {capitalizeFirstLetter(
                            row?.restaurantId?.name || row?.name || "N/A"
                          )}
                        </TableCell>

                        <TableCell>
                          <span
                            className="chip"
                            style={{
                              background:
                                row?.status === "Close"
                                  ? "#5CC18433"
                                  : "#E9676733",
                              color:
                                row?.status === "Open" ? "#E96767" : "#5CC184",
                            }}
                          >
                            {row?.restaurantId?.status || row?.status || "N/A"}
                          </span>
                        </TableCell>
                        <TableCell>
                          {capitalizeFirstLetter(
                            row?.restaurantId?.location ||
                              row?.location ||
                              "N/A"
                          )}
                        </TableCell>
                        <TableCell className="tableCard__contact">
                          <span>
                            Email:
                            {row?.restaurantId?.email || row?.email || "N/A"}
                          </span>
                          <span>
                            Phone No:
                            {row?.restaurantId?.phoneNumber ||
                              row?.phoneNumber ||
                              "N/A"}
                          </span>
                        </TableCell>

                        <TableCell>{row?.availableTable || "N/A"}</TableCell>
                        <TableCell>
                          <div className="propertyHeading coupon_list_img">
                            <img
                              src={row?.image || RestaurantImage}
                              alt="property"
                              className="propertyHeading__img"
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          {formatDateTime(row?.updatedAt) || "N/A"}
                        </TableCell>
                        <TableCell sx={{ borderLeft: "solid 1px #6D7379" }}>
                          <div className="action_btn_container">
                            {row?.createdBy === userId ? (
                              <IconButton
                                onClick={() =>
                                  navigate(
                                    `/admin/restaurant/table-management/add/${row?._id}`
                                  )
                                }
                                color="primary"
                                className="edit_action"
                              >
                                <EditIcon />
                              </IconButton>
                            ) : null}

                            <IconButton
                              onClick={() =>
                                navigate(`/admin/restaurant/view/${row?._id}`)
                              }
                              className="edit_action"
                              style={{ color: "#c29671" }}
                            >
                              <Visibility />
                            </IconButton>

                            <IconButton
                              onClick={() => onDeleteRow(row?._id)}
                              color="secondary"
                              className="delete_action"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </div>
                        </TableCell>
                      </>
                    ) : MenuItem ? (
                      <>
                        <TableCell>
                          {row?.category ? row.category : "N/A"}
                        </TableCell>

                        <TableCell>
                          {capitalizeFirstLetter(row?.name || "N/A")}
                        </TableCell>
                        <TableCell>
                          {capitalizeFirstLetter(row?.description || "N/A")}
                        </TableCell>
                        <TableCell>{row?.price || "N/A"}</TableCell>

                        <TableCell>{row?.isAvailable || "N/A"}</TableCell>

                        <TableCell>
                          <span
                            className="chip"
                            style={{
                              // background:
                              //   row?.status === "active"
                              //     ? "#5CC18433"
                              //     : "#E9676733",
                              color:
                                row?.status === "active"
                                  ? "#5CC184"
                                  : "#E96767",
                              padding: "0px",
                            }}
                          >
                            {row?.restaurantId?.status}
                          </span>
                        </TableCell>
                        <TableCell>{row?.items?.length || "N/A"}</TableCell>

                        <TableCell>
                          <div className="propertyHeading coupon_list_img">
                            <img
                              src={row?.couponImage || MenuImage}
                              alt="property"
                              className="propertyHeading__img"
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          {formatDateTime(row?.updatedAt) || "N/A"}
                        </TableCell>

                        {action && (
                          <TableCell>
                            <div className="action_btn_container">
                              <IconButton
                                onClick={() => onEditRow(row)}
                                color="primary"
                                className="edit_action"
                              >
                                <EditIcon />
                              </IconButton>

                              <IconButton
                                onClick={() => onDeleteRow(row?._id)}
                                className="delete_action"
                                color="secondary"
                              >
                                <DeleteIcon />
                              </IconButton>
                            </div>
                          </TableCell>
                        )}
                      </>
                    ) : MenuCategoryTable ? (
                      <>
                        <TableCell>
                          {capitalizeFirstLetter(
                            row?.categoryName ? row.categoryName : "N/A"
                          )}
                        </TableCell>

                        <TableCell>

                          {row?.items && row.items.length > 0
                            ? row.items.map((item,index) => (
                              <Paper
                                  key={index}
                                  elevation={2} 
                                  style={{
                                    marginBottom: "10px",
                                    padding: "10px",
                                    minWidth: "150px", 
                                    width: "auto",
                                  }}
                                >
                                <div key={item._id}>
                                  {capitalizeFirstLetter(item.name)} -{" "}
                                  {capitalizeFirstLetter(item.description) ||
                                    "No Description"}
                                </div>
                                </Paper>
                              ))
                            : "No Items"}
                        </TableCell>
                        <TableCell>
                          <div className="propertyHeading">
                            <img
                              src={row?.mainPhoto || PropertyImage}
                              alt="property"
                              className="propertyHeading__img"
                            />
                            <h5 className="propertyHeading__name">
                              {row?.propertyName || "N/A"}
                            </h5>
                          </div>
                        </TableCell>
                        <TableCell>
                          {capitalizeFirstLetter(row?.description || "N/A")}
                        </TableCell>

                        <TableCell>
                          {formatDateTime(row?.updatedAt) || "N/A"}
                        </TableCell>

                        {action && (
                          <TableCell>
                            <div className="action_btn_container">
                              <IconButton
                                onClick={() =>
                                  navigate(
                                    `/admin/kitchen-menu/category/edit/${row?._id}`
                                  )
                                }
                                color="primary"
                                className="edit_action"
                              >
                                <EditIcon />
                              </IconButton>

                              <IconButton
                                onClick={() => onDeleteRow(row)}
                                className="delete_action"
                                color="secondary"
                              >
                                <DeleteIcon />
                              </IconButton>

                              <IconButton
                                onClick={() =>
                                  navigate(
                                    `/admin/kitchen-menu/category/view/${row?._id}`
                                  )
                                }
                                className="edit_action"
                                style={{ color: "#c29671" }}
                              >
                                <Visibility />
                              </IconButton>
                            </div>
                          </TableCell>
                        )}
                      </>
                    ) : ContactUs ? (
                      <>
                        <TableCell>{row?.name || "N/A"}</TableCell>
                        <TableCell>{row?.subject || "N/A"}</TableCell>
                        <TableCell>{row?.messageTitle}</TableCell>
                        <TableCell>{row?.message || "N/A"}</TableCell>
                        <TableCell>{row?.email || "N/A"}</TableCell>
                        <TableCell>{row?.contactNo || "N/A"}</TableCell>
                        <TableCell>
                          {formatDateTime(row?.updatedAt) || "N/A"}
                        </TableCell>

                        <TableCell sx={{ borderLeft: "solid 1px #6D7379" }}>
                          <div className="action_btn_container">
                            <IconButton color="primary" className="edit_action">
                              <Shortcut
                                sx={{
                                  height: "18px",
                                  width: "18px",
                                  color: "#c29671",
                                }}
                                onClick={() => onEditRow(row)}
                              />
                            </IconButton>
                            <IconButton
                              onClick={() => onDeleteRow(row)}
                              color="secondary"
                              className="delete_action"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </div>
                        </TableCell>
                      </>
                    ) : null}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={12} align="center">
                  No data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {pagination === true && totalItems >= 9 ? (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          label={
            RestaurantManagement
              ? "Restaurant out of"
              : KitchenManagement
              ? "Kitchen out of"
              : MenuTable
              ? "Menu out of"
              : userTable
              ? "User Out of "
              : TableManagement
              ? "Table out of "
              : MenuCategoryTable
              ? "Category Menu Out of "
              : ContactUs
              ? "Contact us out of"
              : null
          }
        />
      ) : null}
    </div>
  );
};

export default TableComponent;
