import { Button, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import CircularLoader from "../../../../../../components/CircularLoader/CircularLoader";
import {
  createTable,
  getTableById,
  updateTableById,
} from "../../../../../../redux/slices/tableSlice";

const AddTable = () => {
  const params = useParams();
  const tablesId = params;
  const tableId = tablesId.id;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.restaurant);
  const restaurantId = "6760011babab277965bfabd0";
  // const restaurantId = localStorage.getItem("userId");

  // Validation schema
  const validationSchema = Yup.object({
    // restaurantId: Yup.string().required("Restaurant ID is required"),
    tableNumber: Yup.string().required("Table number is required"),
    capacity: Yup.number()
      .required("Capacity is required")
      .positive("Capacity must be a positive number")
      .integer("Capacity must be an integer"),
  });

  const formik = useFormik({
    initialValues: {
      restaurantId: restaurantId || "",
      tableNumber: "",
      capacity: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const obj = {
          restaurantId: values.restaurantId,
          tableNumber: values.tableNumber,
          capacity: values.capacity,
        };
        // const formData = new FormData();
        // formData.append("restaurantId", values.restaurantId);
        // formData.append("tableNumber", values.tableNumber);
        // formData.append("capacity", values.capacity);

        if (tableId) {
          const response = dispatch(
            updateTableById({ id: tableId, formData: obj })
          );
          if (response) {
            await dispatch(getTableById(tableId));
            resetForm();
            navigate("/admin/restaurant/table-management/list");
          }
        } else {
          obj.restaurantId = values.restaurantId;
          const response = await dispatch(createTable(obj)).unwrap();
          if (response) {
            resetForm();
            navigate("/admin/restaurant/table-management/list");
          }
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    },
  });

  useEffect(() => {
    if (tableId) {
      const fetchTableData = async () => {
        try {
          const response = await dispatch(getTableById(tableId)).unwrap();
          console.log("response", response);
          if (response) {
            formik.setValues({
              tableNumber: response.table.tableNumber,
              capacity: response.table.capacity,
            });
          }
        } catch (error) {
          console.error("Error fetching table data:", error.message);
        }
      };
      fetchTableData();
    }
  }, []);

  if (loading) {
    return <CircularLoader />;
  }

  return (
    <div className="pageTemplate">
      <div className="pageTemplate__head">
        <h1 className="headTitle management">
          {tableId ? "Update Table" : "Add Table"}
        </h1>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          {!tableId && (
            <Grid item lg={6} sm={6} xs={12}>
              <label className="inputGroup__title">Restaurant ID</label>
              <TextField
                fullWidth
                id="restaurantId"
                name="restaurantId"
                type="text"
                className="inputGroup__inputField"
                value={formik.values.restaurantId}
                onChange={formik.handleChange}
                error={
                  formik.touched.restaurantId &&
                  Boolean(formik.errors.restaurantId)
                }
                helperText={
                  formik.touched.restaurantId && formik.errors.restaurantId
                }
                disabled
              />
            </Grid>
          )}

          <Grid item lg={6} sm={6} xs={12}>
            <label className="inputGroup__title">Table Number</label>
            <TextField
              fullWidth
              id="tableNumber"
              name="tableNumber"
              className="inputGroup__inputField"
              type="text"
              value={formik.values.tableNumber}
              onChange={formik.handleChange}
              error={
                formik.touched.tableNumber && Boolean(formik.errors.tableNumber)
              }
              helperText={
                formik.touched.tableNumber && formik.errors.tableNumber
              }
            />
          </Grid>

          <Grid item lg={6} sm={6} xs={12}>
            <label className="inputGroup__title">Capacity</label>
            <TextField
              fullWidth
              id="capacity"
              name="capacity"
              className="inputGroup__inputField"
              type="number"
              value={formik.values.capacity}
              onChange={formik.handleChange}
              error={formik.touched.capacity && Boolean(formik.errors.capacity)}
              helperText={formik.touched.capacity && formik.errors.capacity}
            />
          </Grid>

          <Grid item xs={12}>
            <div className="add_list">
              <Button
                // style={{marginTop:"50px"}}
                className="PrimaryButton"
                variant="contained"
                fullWidth
                type="submit"
              >
                {tableId ? "Update Table" : "Add Table"}
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddTable;
