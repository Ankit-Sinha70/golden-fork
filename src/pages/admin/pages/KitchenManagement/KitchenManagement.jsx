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
import React, { useCallback, useEffect, useState } from "react";
import TotalCountCard from "../../../../components/Card/TotalCountCard";
import { Book, Kitchen, Restore, Search } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import CircularLoader from "../../../../components/CircularLoader/CircularLoader";
import TableComponent from "../../../../components/Table/Table";
import {
  getAllKitchens,
  deleteKitchenById,
} from "../../../../redux/slices/kitchenSlice";

const KitchenManagement = () => {
  const dispatch = useDispatch();
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [propertyToDelete, setPropertyToDelete] = useState(null);
  const { kitchens, meta, loading } = useSelector((state) => state.kitchen);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const openDeleteConfirmationDialog = (row) => {
    setPropertyToDelete(row);
    setOpenDialog(true);
  };

  const closeDeleteConfirmationDialog = () => {
    setOpenDialog(false);
    setPropertyToDelete(null);
  };


  useEffect(() => {
    const filters = {
      page: currentPage,
      limit: itemsPerPage,
      name: search || null,
      isActive:status !== "All" ? status : null,
    };
    dispatch(getAllKitchens(filters));
  }, [currentPage, itemsPerPage, status]);

  const handleDeleteProperty = async () => {
    if (propertyToDelete) {
      try {
        await dispatch(deleteKitchenById(propertyToDelete._id)).unwrap();
        closeDeleteConfirmationDialog();
        dispatch(
          getAllKitchens({
            page: currentPage,
            limit: itemsPerPage,
            name: search || null,
            status: status !== "All" ? status : null,
          })
        );
      } catch (error) {
        console.error("Failed to delete kitchen:", error);
      }
    }
  };

  const handleResetFilters = () => {
    setSearch("");
    setStatus("All");
    setCurrentPage(1);
    dispatch(
      getAllKitchens({
        page: 1,
        limit: itemsPerPage,
        search: "",
        isActive: undefined,
      })
    );;
  };

  const handleStatusChange = (e) => {
    setCurrentPage(1);
    setStatus(e.target.value);
  };

  const handleSearchClick = () => {
    setCurrentPage(1);
      dispatch(
      getAllKitchens({
        page: currentPage,
        limit: itemsPerPage,
        name: search || null,
        isActive: status === "All" ? undefined : status === "Active",
      })
    );
  };

  return (
    <>
      {loading ? (
        <CircularLoader />
      ) : (
        <div className="pageTemplate">
          <div className="pageTemplate__head">
            <h1 className="headTitle management">Kitchen Management</h1>
          </div>
          <Grid container spacing={3} xs={12}>
            <Grid item xl={3} md={6}>
              <TotalCountCard
                name={"Total Kitchen"}
                icon={Kitchen}
                count={meta?.totalKitchenCount}
                month={"This Month"}
              />
            </Grid>
            <Grid item xl={3} md={6}>
              <TotalCountCard
                name={"Active Kitchen"}
                icon={Kitchen}
                count={meta?.totalActiveKitchenCount}
                month={"This Month"}
              />
            </Grid>
            <Grid item xl={3} md={6}>
              <TotalCountCard
                name={"Total Orders"}
                icon={Book}
                count={0}
                month={"This Month"}
              />
            </Grid>
            <Grid item xl={3} md={6}>
              <TotalCountCard
                name={"Active Orders"}
                icon={Book}
                count={0}
                month={"This Month"}
              />
            </Grid>
          </Grid>

          <div className="moduleBox table-list">
            <div className="pageTemplate__head mb-0">
              <h2 className="headSubTitle">Kitchen List </h2>
              <div className="pageTemplate__head__filter">
                <div className="searchbarBox">
                  <input
                    placeholder="Search by Name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <Search
                    onClick={handleSearchClick}
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <Box className="table-head-select">
                  <FormControl fullWidth>
                    <NativeSelect value={status} onChange={handleStatusChange}>
                      <option value="All">All</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </NativeSelect>
                  </FormControl>
                </Box>

                <Restore
                  variant="outlined"
                  onClick={handleResetFilters}
                  className="resetFilter"
                  sx={{cursor:"pointer"}}
                />
              </div>
            </div>
            <TableComponent
              KitchenManagement={true}
              data={kitchens}
              currentPage={currentPage}
              totalPages={meta?.totalPages}
              totalItems={meta?.totalProperties}
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
              Are you sure you want to delete this kitchen? This action cannot
              be undone.
            </DialogContent>
            <DialogActions>
              <Button
                onClick={closeDeleteConfirmationDialog}
                className="button button--gray"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteProperty}
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

export default KitchenManagement;
