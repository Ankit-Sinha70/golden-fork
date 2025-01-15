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
import TotalCountCard from "../../../../components/Card/TotalCountCard";
import CircularLoader from "../../../../components/CircularLoader/CircularLoader";
import TableComponent from "../../../../components/Table/Table";

import { Restore, TableRestaurant } from "@mui/icons-material";
// import { ReactComponent as AddIcon } from "../../../../assets/images/icon/svg/addIcon.svg";
import { ReactComponent as SearchIcon } from "../../../../assets/images/icon/svg/search-icon-table.svg";
import {
  deleteTableById,
  getAllTables,
} from "../../../../redux/slices/tableSlice";
import "./TableManagement.scss";
const TableManagement = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [openDialog, setOpenDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [table, setTable] = useState([
    { id: 1, tableNumber: "T1", allocatedTo: null },
    { id: 2, tableNumber: "T2", allocatedTo: "John Doe" },
    { id: 3, tableNumber: "T3", allocatedTo: null },
    { id: 4, tableNumber: "T4", allocatedTo: "Jane Smith" },
  ]);
  const [allocationName, setAllocationName] = useState("");
  const [allocatingTable, setAllocatingTable] = useState(null);

  const handleAllocateTable = () => {
    if (allocatingTable && allocationName.trim()) {
      setTable((prevTables) =>
        prevTables.map((table) =>
          table.id === allocatingTable.id
            ? { ...table, allocatedTo: allocationName }
            : table
        )
      );
      setAllocatingTable(null);
      setAllocationName("");
    }
  };

  const handleDeallocateTable = (id) => {
    setTable((prevTables) =>
      prevTables.map((table) =>
        table.id === id ? { ...table, allocatedTo: null } : table
      )
    );
  };

  const filteredTables = table.filter((table) => {
    const matchesSearch = search
      ? table.tableNumber.toLowerCase().includes(search.toLowerCase())
      : true;
    const matchesFilter =
      filter === "All"
        ? true
        : filter === "Allocated"
        ? !!table.allocatedTo
        : !table.allocatedTo;
    return matchesSearch && matchesFilter;
  });

  useEffect(() => {
    dispatch(
      getAllTables({
        page: currentPage,
        limit: itemsPerPage,
        name: search || null,
        restaurantStatus: filter !== "All" ? filter : null,
      })
    );
  }, [dispatch, currentPage, itemsPerPage, filter]);

  const { tables, meta, loading } = useSelector((state) => state.table);

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
      await dispatch(deleteTableById(userToDelete._id));
      dispatch(
        getAllTables({ page: currentPage, limit: itemsPerPage, filter })
      );
      setUserToDelete(null);
    }
  };

  const handleSearchClick = () => {
    setCurrentPage(1);
    fetchRestaurants();
  };

  const fetchRestaurants = () => {
    dispatch(
      getAllTables({
        page: currentPage,
        limit: itemsPerPage,
        restaurantName: search || null,
        restaurantStatus: filter !== "All" ? filter : null,
      })
    );
  };

  const handleResetFilters = () => {
    setSearch("");
    setFilter("All");
    dispatch(
      getAllTables({
        page: 1,
        limit: itemsPerPage,
        search: "",
        restaurantStatus: undefined,
      })
    );
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
                icon={TableRestaurant}
                count={meta?.totalTableCount}
                month={"This Month"}
              />
            </Grid>
            <Grid item xl={3} md={6}>
              <TotalCountCard
                name={"Total Customer"}
                icon={TableRestaurant}
                count={"1,593"}
                month={"This Month"}
              />
            </Grid>
            <Grid item xl={3} md={6}>
              <TotalCountCard
                name={"Active Customer"}
                icon={TableRestaurant}
                count={"1,593"}
                month={"This Month"}
              />
            </Grid>
            <Grid item xl={3} md={6}>
              <TotalCountCard
                name={"Active Users"}
                icon={TableRestaurant}
                count={"1,593"}
                month={"This Month"}
              />
            </Grid>
          </Grid>

          <div className="moduleBox table-list">
            <div className="pageTemplate__head">
              <h2 className="headSubTitle">Table List</h2>
              <div className="pageTemplate__head__filter">
                <div className="searchbarBox">
                  <input
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <SearchIcon onClick={handleSearchClick} />
                </div>
                <Box className="table-head-select">
                  <FormControl fullWidth>
                    <NativeSelect
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                    >
                      <option value="All">All</option>
                      <option value="Allocated">Allocated</option>
                      <option value="Unallocated">Unallocated</option>
                    </NativeSelect>
                  </FormControl>
                </Box>
                <Box className="table-head-select">
                  <FormControl fullWidth>
                    <NativeSelect value={filter} onChange={handleFilterChange}>
                      <option value="All">All</option>
                      <option value="Open">Open</option>
                      <option value="Close">Close</option>
                    </NativeSelect>
                  </FormControl>
                </Box>
                <Restore
                  className="resetFilter"
                  variant="outlined"
                  sx={{ cursor: "pointer" }}
                  onClick={handleResetFilters}
                />
              </div>
            </div>
            <TableComponent
            
              TableManagement={true}
              totalItems={filteredTables.length}
              data={filteredTables}
              currentPage={currentPage}
              totalPages={meta?.totalPages}
              // totalItems={meta?.totalTableCount}
              itemsPerPage={itemsPerPage}
              pagination={true}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
              onDeleteRow={openDeleteConfirmationDialog}
              renderRow={(row) => (
                <tr key={row.id}>
                  <td>{row.tableNumber}</td>
                  <td>{row.allocatedTo || "Not Allocated"}</td>
                  <td>
                    {!row.allocatedTo ? (
                      <button onClick={() => setAllocatingTable(row)}>
                        Allocate
                      </button>
                    ) : (
                      <button onClick={() => handleDeallocateTable(row.id)}>
                        Deallocate
                      </button>
                    )}
                  </td>
                </tr>
              )}
            />
          </div>

          <Dialog
            open={!!allocatingTable}
            onClose={() => setAllocatingTable(null)}
          >
            <DialogTitle>Allocate Table</DialogTitle>
            <DialogContent>
              <p>Table: {allocatingTable?.tableNumber}</p>
              <input
                type="text"
                placeholder="Enter Name/Order ID"
                value={allocationName}
                onChange={(e) => setAllocationName(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setAllocatingTable(null)}>Cancel</Button>
              <Button onClick={handleAllocateTable} variant="contained">
                Allocate
              </Button>
            </DialogActions>
          </Dialog>

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
              Are you sure you want to delete this {userToDelete?.username} ?
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

export default TableManagement;
