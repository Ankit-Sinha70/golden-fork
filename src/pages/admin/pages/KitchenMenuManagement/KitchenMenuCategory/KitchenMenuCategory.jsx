import { Category, Restore, Search } from "@mui/icons-material";
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
import TotalCountCard from "../../../../../components/Card/TotalCountCard";
import CircularLoader from "../../../../../components/CircularLoader/CircularLoader";
import TableComponent from "../../../../../components/Table/Table";
import {
  deleteCategoryById,
  getAllCategories,
} from "../../../../../redux/slices/menuCategorySlice";
import "./KitchenMenuCategory.scss";

const KitchenMenuCategory = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All")
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);


  const { categories, meta, loading } = useSelector(
    (state) => state.menuCategory
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearch("");
    setFilter("All");
    setCurrentPage(1);
    fetchCategories();
  };

  const openDeleteConfirmationDialog = (row) => {
    setCategoryToDelete(row);
    setOpenDialog(true);
  };

  const closeDeleteConfirmationDialog = () => {
    setOpenDialog(false);
    setCategoryToDelete(null);
  };

  const handleDeleteMenu = async () => {
    if (categoryToDelete) {
      setOpenDialog(false);
      await dispatch(deleteCategoryById(categoryToDelete._id));
      dispatch(getAllCategories({ page: currentPage, limit: itemsPerPage }));
      setCategoryToDelete(null);
    }
  };

  const fetchCategories = () => {
    dispatch(
      getAllCategories({
        page: currentPage,
        limit: itemsPerPage,
        categoryName: search || null,
        isActive: filter !== "All" ? filter : null,
      })
    )
  };

  const handleStatusChange = (e) => {
    setCurrentPage(1);
    setFilter(e.target.value);
  };

  const handleSearchClick = () => {
    setCurrentPage(1);
    fetchCategories();
  };

  useEffect(() => {
    fetchCategories();
  }, [currentPage, itemsPerPage, filter])

  return (
    <>
      {loading ? (
        <div>
          <CircularLoader />
        </div>
      ) : (
        <div className="pageTemplate">
          <div className="pageTemplate__head">
            <h1 className="headTitle ">Menu Categories</h1>
          </div>
          <Grid container spacing={3} xs={12}>
            <Grid item xl={3} md={6}>
              <TotalCountCard
                name={"Total Menu Categories"}
                icon={Category}
                count={meta?.totalCategoryCount}
                month={"This Month"}
              />
            </Grid>
            <Grid item xl={3} md={6}>
              <TotalCountCard
                name={"Total Active Categories Menu"}
                icon={Category}
                count={meta?.totalActiveCategoriesCount}
                month={"This Month"}
              />
            </Grid>
            <Grid item xl={3} md={6}>
              <TotalCountCard
                name={"Total De-active Categories Menu"}
                icon={Category}
                count={meta?.totalDeActiveCategoriesCount}
                month={"This Month"}
              />
            </Grid>
          </Grid>

          <div className="moduleBox table-list">
            <div className="pageTemplate__head mb-0">
              <h2 className="headSubTitle">Menu Categories List</h2>
              <div className="pageTemplate__head__filter">
                <div className="searchbarBox">
                  <input
                    value={search}
                    placeholder="search..."
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <Search onClick={handleSearchClick} />
                </div>
                <Box className="table-head-select">
                  <FormControl fullWidth>
                    <NativeSelect value={filter} onChange={handleStatusChange}>
                      <option value="All">All</option>
                      <option value="Sale">Sale</option>
                      <option value="Rent">Rent</option>
                      <option value="Vacant">Vacant</option>
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
            <TableComponent
              MenuCategoryTable={true}
              data={categories}
              currentPage={currentPage}
              totalPages={meta?.totalPages}
              totalItems={meta?.totalCategoryCount}
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
              {categoryToDelete?.categoryName}? This action cannot be undone.
            </DialogContent>
            <DialogActions className="deleteDialog__action">
              <Button
                onClick={closeDeleteConfirmationDialog}
                className="button button--gray"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteMenu}
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

export default KitchenMenuCategory;
