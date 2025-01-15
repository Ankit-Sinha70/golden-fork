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

import TotalCountCard from "../../../../../../components/Card/TotalCountCard";
import {
  People,
  PeopleAlt,
  PersonPin,
  Restore,
  Search,
} from "@mui/icons-material";
import {
  deleteTableById,
} from "../../../../../../redux/slices/tableSlice";
import CircularLoader from "../../../../../../components/CircularLoader/CircularLoader";
import TableComponent from "../../../../../../components/Table/Table";
import { getRestaurantById } from "../../../../../../redux/slices/restaurantSlice";
import ".././TablesManagement.scss";
const TablesManagement = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // const restaurantId = localStorage.getItem("userId")
  const restaurantId = "6760011babab277965bfabd0";

  useEffect(() => {
    dispatch(
      getRestaurantById(
        restaurantId,
       )
    );
  }, [dispatch]);

  const { restaurant, meta, loading } = useSelector(
    (state) => state.restaurant
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setCurrentPage(1);
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
      const id = userToDelete
      await dispatch(deleteTableById(id));
      dispatch(
        getRestaurantById(restaurantId)
      );
      setUserToDelete(null);
    }
  };

  const handleSearchClick = () => {
    setCurrentPage(1);
    fetchTableList();
  };

  const fetchTableList = () => {
    dispatch(
      getRestaurantById({
        page: currentPage,
        limit: itemsPerPage,
        name: search || null,
        status: filter !== "All" ? filter : null,
      })
    )
  };


  const handleResetFilters = () => {
    setSearch("");
    setFilter("All");
    setCurrentPage(1);
   fetchTableList();
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
            <h1 className="headTitle management">Table Management</h1>
          </div>
          <Grid container spacing={3} xs={12}>
            <Grid item xl={3} md={6}>
              <TotalCountCard
                name={"Total Table"}
                icon={People}
                count={meta?.totalTableCount}
                month={"This Month"}
              />
            </Grid>
            <Grid item xl={3} md={6}>
              <TotalCountCard
                name={"Total Customer"}
                icon={PeopleAlt}
                count={"1,593"}
                month={"This Month"}
              />
            </Grid>
            <Grid item xl={3} md={6}>
              <TotalCountCard
                name={"Active Customer"}
                icon={PersonPin}
                count={"1,593"}
                month={"This Month"}
              />
            </Grid>
            <Grid item xl={3} md={6}>
              <TotalCountCard
                name={"Active Users"}
                icon={PersonPin}
                count={"1,593"}
                month={"This Month"}
              />
            </Grid>
          </Grid>

          <div className="moduleBox table-list">
            <div className="pageTemplate__head table-head">
              <h1 className="headTitle">Table List</h1>
              <div className="pageTemplate__head__filter">
                <div className="searchbarBox">
                  <input
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <Search onClick={handleSearchClick} />
                </div>
                <Box className="table-head-select" sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <NativeSelect value={filter} onChange={handleFilterChange}>
                      <option value="All">All</option>
                      <option value="Open">Open</option>
                      <option value="Close">Close</option>
                    </NativeSelect>
                  </FormControl>
                </Box>

                <Restore
                  variant="outlined"
                  onClick={handleResetFilters}
                  sx={{ marginLeft: "10px" }}
                />
              </div>
            </div>
            <TableComponent
              TableManagement={true}
              data={restaurant?.tables}
              currentPage={currentPage}
              totalPages={meta?.totalPages}
              totalItems={meta?.totalTableCount}
              itemsPerPage={itemsPerPage}
              pagination={true}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
              onDeleteRow={openDeleteConfirmationDialog}
            />
          </div>

          <Dialog
            open={openDialog}
            onClose={closeDeleteConfirmationDialog}
            className="delete-dialog"
          >
            <DialogTitle id="delete-confirmation-dialog-title">
              Confirm Deletion
            </DialogTitle>
            <DialogContent>
              Are you sure you want to delete the User Name :{" "}
              {userToDelete?.username} ? This action cannot be undone.
            </DialogContent>
            <DialogActions>
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

export default TablesManagement;
