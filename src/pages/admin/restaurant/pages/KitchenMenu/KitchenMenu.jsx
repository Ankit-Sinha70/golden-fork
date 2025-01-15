import { Search, Restore } from "@mui/icons-material";
import { Box, FormControl, Grid, NativeSelect } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomerIcon from "../../../../../assets/images/icon/png/customerIcon.png";
import TotalCountCard from "../../../../../components/Card/TotalCountCard";
import CircularLoader from "../../../../../components/CircularLoader/CircularLoader";
import TableComponent from "../../../../../components/Table/Table";
import { getMenuById } from "../../../../../redux/slices/menuSlice";

const KitchenMenu = () => {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [openDialog, setOpenDialog] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { meta, loading, menu } = useSelector((state) => state.menu);

  const dispatch = useDispatch();
  // const restaurantId = localStorage.getItem("userId");
  const restaurantId = "67612823600454dbb14b7390";

  const handleSearchClick = () => {
    setCurrentPage(1);
    if (restaurantId) {
      dispatch(
        getMenuById({
          id: restaurantId,
          name: search || null,
          status: status === "All" ? status : null,
          page: currentPage,
          limit: itemsPerPage,
        })
      );
    }
  };
  useEffect(() => {
    if (restaurantId) {
      dispatch(
        getMenuById(restaurantId)
      );
    }
  }, [dispatch, restaurantId]);

  const handleResetFilters = () => {
    setSearch("");
    setFilterStatus("All");
    setCurrentPage(1);
    dispatch(
      getMenuById({
        name: null,
        status: null,
        page: 1,
        limit: itemsPerPage,
      })
    );
  };


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

  return (
    <div className="pageTemplate">
      {/* <div className="pageTemplate__head">
        <h1 className="headTitle management">Kitchen Menu Management</h1>
      </div> */}
      <Grid container spacing={3} xs={12}>
        <Grid item xl={3} md={6}>
          <TotalCountCard
            name={"Total Restaurant"}
            Icons={CustomerIcon}
            count={meta?.totalRestaurantCount}
            month={"This Month"}
          />
        </Grid>
        <Grid item xl={3} md={6}>
          <TotalCountCard
            name={"Active Restaurant"}
            Icons={CustomerIcon}
            count={"1,593"}
            month={"This Month"}
          />
        </Grid>
        <Grid item xl={3} md={6}>
          <TotalCountCard
            name={"Total Table"}
            Icons={CustomerIcon}
            count={"1,593"}
            month={"This Month"}
          />
        </Grid>
        <Grid item xl={3} md={6}>
          <TotalCountCard
            name={"Total Available Table"}
            Icons={CustomerIcon}
            count={"1,593"}
            month={"This Month"}
          />
        </Grid>
      </Grid>
      {loading ? (
        <CircularLoader />
      ) : (
        <div className="moduleBox table-list">
          <div className="pageTemplate__head table-head">
            <h1 className="headTitle mb-0 res-list">Restaurant Kitchen Menu List</h1>
            <div className="pageTemplate__head__filter">
              <div className="searchbarBox">
                <input
                  placeholder="search..."
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Search
                  onClick={handleSearchClick}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <Box className="table-head-select">
                <FormControl fullWidth>
                  <NativeSelect
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="All">All</option>
                    <option value="Sale">Open</option>
                    <option value="Rent">Close</option>
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
            MenuTable2={true}
            data={[menu]}
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
      )}
    </div>
  );
};

export default KitchenMenu;
