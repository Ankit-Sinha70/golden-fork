import { People, PeopleAlt, PersonPin, Restore } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  NativeSelect,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as SearchIcon } from "../../../../assets/images/icon/svg/search-icon-table.svg";
import TotalCountCard from "../../../../components/Card/TotalCountCard";
import CircularLoader from "../../../../components/CircularLoader/CircularLoader";
import TableComponent from "../../../../components/Table/Table";
import {
  deleteAdminUserById,
  getAllAdminUsers,
} from "../../../../redux/slices/adminUserSlice";
import "./CustomerManagement.scss";

const CustomerManagement = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [openDialog, setOpenDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const { adminUsers, meta, loading } = useSelector((state) => state.adminUser);

  const handleSearch = () => {
    setCurrentPage(1);
    dispatch(
      getAllAdminUsers({
        role: filterRole !== "All" ? filterRole : null,
        name: search || null,
        status: filterStatus !== "All" ? filterStatus : null,
        page: 1,
        limit: itemsPerPage,
      })
    );
  };

  useEffect(() => {
    dispatch(
      getAllAdminUsers({
        role: filterRole !== "All" ? filterRole : null,
        status: filterStatus !== "All" ? filterStatus : null,
        page: currentPage,
        limit: itemsPerPage,
      })
    );
  }, [dispatch, currentPage, itemsPerPage, filterRole, filterStatus]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const handleFilterRoleChange = (event) => {
    setFilterRole(event.target.value);
    setCurrentPage(1);
  };

  const handleFilterStatusChange = (event) => {
    setFilterStatus(event.target.value);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearch("");
    setFilterRole("All");
    setFilterStatus("All");
    setCurrentPage(1);
    dispatch(
      getAllAdminUsers({
        role: null,
        name: null,
        status: null,
        page: 1,
        limit: itemsPerPage,
      })
    );
  };

  const openDeleteConfirmationDialog = (row) => {
    setUserToDelete(row);
    setOpenDialog(true);
  };

  const closeDeleteConfirmationDialog = () => {
    setOpenDialog(false);
    setUserToDelete(null);
  };

  const handleDelete = async () => {
    if (userToDelete) {
      setOpenDialog(false);
      await dispatch(deleteAdminUserById(userToDelete._id));
      dispatch(
        getAllAdminUsers({
          role: filterRole !== "All" ? filterRole : null,
          status: filterStatus !== "All" ? filterStatus : null,
          page: currentPage,
          limit: itemsPerPage,
        })
      );
      setUserToDelete(null);
    }
  };

  return (
    <>
      {loading ? (
        <div>
          <CircularLoader />
        </div>
      ) : (
        <div className="pageTemplate">
          <div className="pageTemplate__head">
            <h1 className="headTitle">User Management</h1>
          </div>
          <Grid container spacing={3} xs={12}>
            <Grid item xl={3} md={6}>
              <TotalCountCard
                name={"Total Users"}
                icon={People}
                count={meta?.totalUsersCount}
                month={"This Month"}
              />
            </Grid>
            <Grid item xl={3} md={6}>
              <TotalCountCard
                name={"Total Customer"}
                icon={PeopleAlt}
                count={meta?.totalCustomers}
                month={"This Month"}
              />
            </Grid>
            <Grid item xl={3} md={6}>
              <TotalCountCard
                name={"Active Customer"}
                icon={PersonPin}
                count={meta?.activeCustomers}
                month={"This Month"}
              />
            </Grid>
            <Grid item xl={3} md={6}>
              <TotalCountCard
                name={"Active Users"}
                icon={PersonPin}
                count={meta?.activeUsers}
                month={"This Month"}
              />
            </Grid>
          </Grid>

          <div className="moduleBox table-list">
            <div className="pageTemplate__head mb-0">
              <h2 className="headSubTitle">Users List</h2>
              <div className="pageTemplate__head__filter">
                <div className="searchbarBox">
                  <input
                    placeholder="Search by Name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <div onClick={handleSearch} style={{ cursor: "pointer" }}>
                    <SearchIcon />
                  </div>
                </div>
                <Box className="table-head-select">
                  <FormControl fullWidth>
                    <NativeSelect
                      value={filterRole}
                      onChange={handleFilterRoleChange}
                    >
                      <option value="All">All Roles</option>
                      <option value="Customer">Customer</option>
                      <option value="SuperAdmin">SuperAdmin</option>
                      <option value="RestaurantAdmin">Restaurant Admin</option>
                      <option value="KitchenStaff">Kitchen Staff</option>
                    </NativeSelect>
                  </FormControl>
                </Box>
                <Box className="table-head-select">
                  <FormControl fullWidth>
                    <NativeSelect
                      value={filterStatus}
                      onChange={handleFilterStatusChange}
                    >
                      <option value="All">All Status</option>
                      <option value="Activate">Activate</option>
                      <option value="Deactivate">Deactivate</option>
                    </NativeSelect>
                  </FormControl>
                </Box>
                <Restore
                  className="resetFilter"
                  variant="outlined"
                  onClick={handleResetFilters}
                />
              </div>
            </div>

            <div className="user__list">
              <TableComponent
                userTable={true}
                data={adminUsers}
                currentPage={currentPage}
                totalPages={meta?.totalPages}
                totalItems={meta?.totalUsersCount}
                itemsPerPage={itemsPerPage}
                pagination={true}
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleItemsPerPageChange}
                onDeleteRow={openDeleteConfirmationDialog}
              />
            </div>
          </div>

          <Dialog
            open={openDialog}
            onClose={closeDeleteConfirmationDialog}
            className="deleteDialog"
          >
            <DialogTitle
              className="deleteDialog__title"
              id="delete-confirmation-dialog-title"
            >
              Confirm Deletion
            </DialogTitle>
            <DialogContent className="deleteDialog__content">
              Are you sure you want to delete this {userToDelete?.username}?
              This action cannot be undone.
            </DialogContent>
            <DialogActions className="deleteDialog__action">
              <Button
                onClick={closeDeleteConfirmationDialog}
                className="button button--gray"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                className="PrimaryButton"
                variant="contained"
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </>
  );
};

export default CustomerManagement;
