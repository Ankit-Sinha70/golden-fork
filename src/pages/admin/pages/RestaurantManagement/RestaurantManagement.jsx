import {
  LocalDining,
  Restaurant,
  Restore,
  TableBarTwoTone,
  TableRestaurant,
} from "@mui/icons-material";
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
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as SearchIcon } from "../../../../assets/images/icon/svg/search-icon-table.svg";
import TotalCountCard from "../../../../components/Card/TotalCountCard";
import CircularLoader from "../../../../components/CircularLoader/CircularLoader";
import TableComponent from "../../../../components/Table/Table";
import {
  deleteRestaurantById,
  getAllRestaurants
} from "../../../../redux/slices/restaurantSlice";
import "./RestaurantManagement.scss";

const RestaurantManagement = () => {
  const dispatch = useDispatch();

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [selectedDate, setSelectedDate] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [restaurantToDelete, setRestaurantToDelete] = useState(null);

  useEffect(() => {
    fetchRestaurants();
  }, [dispatch, currentPage, itemsPerPage, status]);

  const { restaurants, totalAvailableTableCount, meta, loading } = useSelector(
    (state) => state.restaurant
  );

  const fetchRestaurants = () => {
    dispatch(
      getAllRestaurants({
        page: currentPage,
        limit: itemsPerPage,
        name: search || null,
        status: status !== "All" ? status : null,
        date: selectedDate || null,
      })
    )
  };

  const handleSearchClick = () => {
    setCurrentPage(1);
    fetchRestaurants();
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    setCurrentPage(1);
    // fetchRestaurants();
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    setCurrentPage(1);
    fetchRestaurants();
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const openDeleteConfirmationDialog = (restaurant) => {
    setRestaurantToDelete(restaurant);
    setOpenDeleteDialog(true);
  };

  const closeDeleteConfirmationDialog = () => {
    setOpenDeleteDialog(false);
    setRestaurantToDelete(null);
  };

  const handleDeleteRestaurant = async () => {
    try {
      await dispatch(deleteRestaurantById(restaurantToDelete?._id)).unwrap();
      fetchRestaurants();
      closeDeleteConfirmationDialog();
    } catch (error) {
      console.error("Error deleting restaurant:", error);
      closeDeleteConfirmationDialog();
    }
  };

  const handleResetFilters = () => {
    setSearch("");
    setStatus("All");
    setSelectedDate("");
    setCurrentPage(1);

    fetchRestaurants();
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
            <h1 className="headTitle">Restaurant Management</h1>
          </div>
          <Grid container spacing={3} xs={12}>
            <Grid item xl={3} md={6}>
              <TotalCountCard
                name={"Total Restaurant"}
                icon={LocalDining}
                count={meta?.totalRestaurantCount}
                month={"This Month"}
              />
            </Grid>
            <Grid item xl={3} md={6}>
              <TotalCountCard
                name={"Active Restaurant"}
                icon={Restaurant}
                count={meta?.totalActiveRestaurantCount}
                month={"This Month"}
              />
            </Grid>
            <Grid item xl={3} md={6}>
              <TotalCountCard
                name={"Total Table"}
                icon={TableRestaurant}
                count={meta?.totalTableCount}
                month={"This Month"}
              />
            </Grid>
            <Grid item xl={3} md={6}>
              <TotalCountCard
                name={"Total Available Table"}
                icon={TableBarTwoTone}
                count={
                  totalAvailableTableCount !== null
                    ? totalAvailableTableCount
                    : 0
                }
                month={"Today"}
              />
            </Grid>
          </Grid>

          <div className="moduleBox table-list">
            <div className="pageTemplate__head mb-0">
              <h2 className="headSubTitle">Restaurant List</h2>
              <div className="pageTemplate__head__filter">
                <div className="searchbarBox">
                  <input
                    placeholder="Search by Name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <SearchIcon
                    onClick={handleSearchClick}
                    style={{ cursor: "pointer" }}
                  />
                </div>

                <Box className="table-head-select">
                  <FormControl fullWidth>
                    <NativeSelect value={status} onChange={handleStatusChange}>
                      <option value="All">All</option>
                      <option value="open">Open</option>
                      <option value="closed">Closed</option>
                    </NativeSelect>
                  </FormControl>
                </Box>
                <div className="date-management">
                  <TextField
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                  />
                </div>
                <Restore
                  className="resetFilter"
                  variant="outlined"
                  onClick={handleResetFilters}
                />
              </div>
            </div>
            <TableComponent
              RestaurantManagement={true}
              data={restaurants}
              currentPage={currentPage}
              totalPages={meta?.totalPages}
              totalItems={meta?.totalActiveRestaurantCount}
              itemsPerPage={itemsPerPage}
              pagination={true}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
              onDeleteRow={openDeleteConfirmationDialog}
            />
          </div>

          <Dialog
            open={openDeleteDialog}
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
              Are you sure you want to delete this{" "}
              {restaurantToDelete?.name} ? This action cannot be undone.
            </DialogContent>
            <DialogActions className="deleteDialog__action">
              <Button
                onClick={closeDeleteConfirmationDialog}
                className="button button--gray"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteRestaurant}
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

export default RestaurantManagement;
