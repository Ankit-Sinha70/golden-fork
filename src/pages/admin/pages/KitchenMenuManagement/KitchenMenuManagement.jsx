import { MenuBook, Restore } from "@mui/icons-material";
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
  deleteMenuById,
  getAllMenus,
} from "../../../../redux/slices/menuSlice";
import "./KitchenMenuManagement.scss";

const KitchenMenuManagement = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [menuToDelete, setMenuToDelete] = useState(null);

  useEffect(() => {
    const filters = {
      page: currentPage,
      limit: itemsPerPage,
      isActive: filter === "All" ? undefined : filter === "Active",
    };
    dispatch(getAllMenus(filters));
  }, [dispatch, currentPage, itemsPerPage, filter]);

  const { menus, meta, loading } = useSelector((state) => state.menu);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    dispatch(
      getAllMenus({
        page: 1,
        limit: itemsPerPage,
        menuName: search,
        isActive: filter === "All" ? undefined : filter === "Active",
      })
    );
  };

  const resetFilters = () => {
    setSearch("");
    setFilter("All");
    setCurrentPage(1);
    dispatch(
      getAllMenus({
        page: 1,
        limit: itemsPerPage,
        search: "",
        isActive: undefined,
      })
    );
  };

  const processedMenus =
    menus?.map((menu) => ({
      id: menu?._id,
      name: menu?.menuName,
      categories: menu?.categories,
      restaurant: menu?.restaurantId?.name || "N/A",
      isActive: menu?.isActive ? "Active" : "Inactive",
      email: menu?.restaurantId?.email || "N/A",
      location: menu?.restaurantId?.location || "N/A",
      status: menu?.restaurantId?.status || "N/A",
      createdAt: menu.createdAt,
      updatedAt: menu.updatedAt,
    })) || [];

  const handleDelete = async () => {
    if (menuToDelete) {
      setOpenDialog(false);
      await dispatch(deleteMenuById(menuToDelete.id));
      dispatch(
        getAllMenus({
          page: 1,
          limit: itemsPerPage,
          menuName: search,
          isActive: filter === "All" ? undefined : filter === "Active",
        })
      );
      setOpenDialog(false);
      setMenuToDelete(null);
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
            <h1 className="headTitle">Kitchen Menu Management</h1>
          </div>
          <Grid container spacing={3} xs={12}>
            <Grid item xl={3} md={6}>
              <TotalCountCard
                name={"Total Menu"}
                icon={MenuBook}
                count={meta?.totalMenuCount}
                month={"This Month"}
              />
            </Grid>
            <Grid item xl={3} md={6}>
              <TotalCountCard
                name={"Active Menu"}
                icon={MenuBook}
                count={meta?.totalActiveMenuCount}
                month={"This Month"}
              />
            </Grid>
            <Grid item xl={3} md={6}>
              <TotalCountCard
                name={"De-active Menu"}
                icon={MenuBook}
                count={meta?.totalDeActiveMenuCount}
                month={"This Month"}
              />
            </Grid>
          </Grid>

          <div className="moduleBox table-list">
            <div className="pageTemplate__head mb-0">
              <h2 className="headSubTitle">Kitchen Menu List</h2>
              <div className="pageTemplate__head__filter">
                <div className="searchbarBox">
                  <input
                    value={search}
                    placeholder="Search by menu name..."
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <SearchIcon onClick={handleSearch} />
                </div>
                <Box className="table-head-select">
                  <FormControl fullWidth>
                    <NativeSelect
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                    >
                      <option value="All">All</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </NativeSelect>
                  </FormControl>
                </Box>
                <Restore className="resetFilter" onClick={resetFilters} />
              </div>
            </div>
            <TableComponent
              MenuTable={true}
              data={processedMenus}
              currentPage={currentPage}
              totalPages={meta?.totalPages}
              totalItems={meta?.totalMenuCount}
              itemsPerPage={itemsPerPage}
              pagination={true}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
              onDeleteRow={(row) => {
                setMenuToDelete(row);
                setOpenDialog(true);
              }}
            />
          </div>

          <Dialog
            open={openDialog}
            onClose={() => {
              setOpenDialog(false);
              setMenuToDelete(null);
            }}
            className="deleteDialog"
          >
            <DialogTitle
              className="deleteDialog__title"
              id="delete-confirmation-dialog-title"
            >
              Confirm Deletion
            </DialogTitle>
            <DialogContent className="deleteDialog__content">
              Are you sure you want to delete this menu
              {menuToDelete?.name}? This action cannot be undone.
            </DialogContent>
            <DialogActions className="deleteDialog__action">
              <Button
                onClick={() => {
                  setOpenDialog(false);
                  setMenuToDelete(null);
                }}
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

export default KitchenMenuManagement;
