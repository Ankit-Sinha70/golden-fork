import styled from "@emotion/styled";
import { Close, Upload } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  ListItemText,
  MenuItem,
  Step,
  StepLabel,
  Stepper,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import CircularLoader from "../../../../../../components/CircularLoader/CircularLoader";
import {
  addCategory,
  addMultipleCategoryItems,
  getCategoryById,
  updateCategoryById,
} from "../../../../../../redux/slices/menuCategorySlice";
import {
  createMenuItem,
  getAllMenuItems,
} from "../../../../../../redux/slices/menuItemSlice";
import "./KichenMenuCategoryAdd.scss";

const steps = ["Add Category", "Add Items"];

const KichenMenuCategoryAdd = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.menuItem);

  const { CatLoading } = useSelector((state) => state.menuCategory);
  const [activeStep, setActiveStep] = useState(0);
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [showAddItemForm, setShowAddItemForm] = useState(false);

  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
    isAvailable: false,
  });
  const [newItemErrors, setNewItemErrors] = useState({});
  const [image, setImage] = useState(null);

  const [initialValues, setInitialValues] = useState({
    categoryName: "",
    description: "",
    image: null,
  });

  // Fetch Menu Items and Category Details (if editing)
  useEffect(() => {
    dispatch(getAllMenuItems())
      .then((response) => setItems(response.payload?.categoryItems || []))
      .catch((err) => console.error("Error fetching menu items:", err));

    if (id) {
      dispatch(getCategoryById(id))
        .then((response) => {
          const category = response.payload?.category;
          if (category) {
            setInitialValues({
              categoryName: category.categoryName || "",
              description: category.description || "",
            });
            setSelectedItems(category.items.map((item) => item._id) || []);
            setCategoryId(category._id);
          }
        })
        .catch((err) => console.error("Error fetching category details:", err));
    }
  }, [dispatch, id]);

  const validationSchema = Yup.object({
    categoryName: Yup.string()
      .required("Category Name is required")
      .min(3, "Category Name must be at least 3 characters"),
    description: Yup.string()
      .required("Description is required")
      .min(5, "Description must be at least 5 characters"),
  });
  const newItemValidationSchema = Yup.object({
    name: Yup.string().required("Name is required").min(2, "Name is too short"),
    description: Yup.string()
      .required("Description is required")
      .min(5, "Description must be at least 5 characters"),
    price: Yup.number()
      .required("Price is required")
      .min(1, "Price must be greater than zero"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const categoryPayload = {
        categoryName: values.categoryName,
        description: values.description,
      };

      if (id) {
        dispatch(updateCategoryById({ id, categoryPayload }))
          .then(() => setActiveStep((prev) => prev + 1))
          .catch((err) => console.error("Error updating category:", err));
      } else {
        dispatch(addCategory(categoryPayload))
          .then((response) => {
            setCategoryId(response.payload?.category?._id);
            setActiveStep((prev) => prev + 1);
          })
          .catch((err) => console.error("Error creating category:", err));
      }
    },
  });
  const handleSkip = () => {
    navigate("/admin/restaurant");
  };

  const handleFinish = () => {
    const uniqueItems = [...new Set(selectedItems)];
    const payload = {
      categoryId,
      itemIds: uniqueItems,
    };
    dispatch(addMultipleCategoryItems(payload))
      .then(() => navigate("/admin/kitchen-menu/category/list"))
      .catch((err) => console.error("Error adding items to category:", err));
  };

  const handleSelectChange = (event) => {
    const value = event.target.value;
    if (Array.isArray(value)) {
      setSelectedItems(value);
    } else {
      setSelectedItems((prev) => [...new Set([...prev, value])]);
    }
  };

  const handleNewItemSubmit = () => {
    newItemValidationSchema
      .validate(newItem, { abortEarly: false })
      .then(() => {
        const newItemPayload = { ...newItem, categoryId };

        dispatch(createMenuItem(newItemPayload))
          .then(() => {
            setNewItem({
              name: "",
              description: "",
              price: "",
              isAvailable: false,
            });
            setNewItemErrors({});
            setShowAddItemForm(false);

            dispatch(getAllMenuItems())
              .then((response) =>
                setItems(response.payload?.categoryItems || [])
              )
              .catch((err) =>
                console.error("Error fetching updated items:", err)
              );
          })
          .catch((err) => console.error("Error creating menu item:", err));
      })
      .catch((validationError) => {
        const errors = validationError.inner.reduce((acc, error) => {
          acc[error.path] = error.message;
          return acc;
        }, {});
        setNewItemErrors(errors);
      });
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    whiteSpace: "nowrap",
    width: 1,
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      formik.setFieldValue("image", file);
      setImage(URL.createObjectURL(file));
    }
  };
  function capitalizeFirstLetter(string) {
    if (!string) return "N/A";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  return (
    <>
      {loading || CatLoading ? (
        <div>
          <CircularLoader />
        </div>
      ) : (
        <div className="pageTemplate kitchenMenuCategory">
          <div className="pageTemplate__head">
            <h1 className="headTitle">
              {id ? "Edit Category" : "Add Category"}
            </h1>
          </div>

          <Stepper
            className="kitchenMenuCategory__stepper"
            activeStep={activeStep}
            sx={{ mb: 4 }}
          >
            {steps?.map((label, index) => (
              <Step key={index}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <form onSubmit={formik.handleSubmit}>
            {activeStep === 0 && (
              <Grid container spacing={2}>
                <Grid item lg={6} sm={6} xs={12}>
                  <label className="inputGroup__title">Category Name</label>
                  <TextField
                    fullWidth
                    margin="normal"
                    id="categoryName"
                    name="categoryName"
                    className="inputGroup__inputField"
                    value={formik.values.categoryName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.categoryName &&
                      Boolean(formik.errors.categoryName)
                    }
                    helperText={
                      formik.touched.categoryName && formik.errors.categoryName
                    }
                  />
                </Grid>

                <Grid item lg={6} sm={6} xs={12}>
                  <label className="inputGroup__title">Description</label>
                  <TextField
                    fullWidth
                    margin="normal"
                    id="description"
                    name="description"
                    className="inputGroup__inputField"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.description &&
                      Boolean(formik.errors.description)
                    }
                    helperText={
                      formik.touched.description && formik.errors.description
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <div className="customUploader">
                    <label className="inputGroup__title">Add Image</label>
                    <div
                      style={{
                        border:
                          formik.touched.image && formik.errors.image
                            ? "1px solid red"
                            : "1px solid transparent",
                      }}
                    >
                      <Button
                        className="customUploader__field"
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<Upload />}
                      >
                        <span>
                          Drop the image, or <b>click to Browse</b>
                        </span>
                        <VisuallyHiddenInput
                          type="file"
                          accept="image/jpeg,image/png,image/jpg"
                          onChange={handleImageChange}
                        />
                      </Button>
                    </div>
                    {image && (
                      <div className="uploaded__List">
                        <div className="uploaded__Image">
                          <img src={image} alt="Main Preview" />
                          <Close
                            className="closeBtn"
                            onClick={() => {
                              setImage(null);
                              formik.setFieldValue("image", null);
                            }}
                          />
                        </div>
                      </div>
                    )}
                    {formik.touched.image && formik.errors.image && (
                      <p className="error_message">{formik.errors.image}</p>
                    )}
                  </div>
                </Grid>
              </Grid>
            )}

            {activeStep === 1 && (
              <>
                <Grid container spacing={2}>
                  <Grid item lg={6} sm={6} xs={12}>
                    <div className="inputGroup">
                      <label className="inputGroup__title">Menu Items</label>
                      <TextField
                        select
                        id="items-textfield"
                        className="inputGroup__inputField"
                        value={selectedItems}
                        onChange={handleSelectChange}
                        SelectProps={{
                          multiple: true,
                          renderValue: (selected) =>
                            selected
                              .map((id) =>
                                capitalizeFirstLetter(
                                  items.find((item) => item._id === id)?.name ||
                                    id
                                )
                              )
                              .join(", "),
                        }}
                        fullWidth
                        margin="normal"
                      >
                        {items.map((item) => (
                          <MenuItem key={item._id} value={item._id}>
                            <Checkbox
                              checked={selectedItems.indexOf(item._id) > -1}
                            />
                            <ListItemText
                              primary={capitalizeFirstLetter(item.name)}
                            />
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                  </Grid>
                </Grid>
                <div className="btnPart">
                  <Button
                    className="PrimaryButton"
                    onClick={() => setShowAddItemForm(true)}
                  >
                    Add New Item
                  </Button>
                </div>
                {showAddItemForm && (
                  <div>
                    <div className="addCategoryItems">
                      <Grid container spacing={2}>
                        <Grid item lg={6} sm={6} xs={12}>
                          <label className="inputGroup__title">Name</label>
                          <TextField
                            fullWidth
                            value={newItem.name}
                            className="inputGroup__inputField"
                            onChange={(e) =>
                              setNewItem({ ...newItem, name: e.target.value })
                            }
                            error={!!newItemErrors.name}
                            helperText={newItemErrors.name}
                          />
                        </Grid>
                        <Grid item lg={6} sm={6} xs={12}>
                          <label className="inputGroup__title">
                            Description
                          </label>
                          <TextField
                            fullWidth
                            value={newItem.description}
                            className="inputGroup__inputField"
                            onChange={(e) =>
                              setNewItem({
                                ...newItem,
                                description: e.target.value,
                              })
                            }
                            error={!!newItemErrors.description}
                            helperText={newItemErrors.description}
                          />
                        </Grid>
                        <Grid item lg={6} sm={6} xs={12}>
                          <label className="inputGroup__title">Price</label>
                          <TextField
                            className="inputGroup__inputField"
                            fullWidth
                            type="number"
                            value={newItem.price}
                            onChange={(e) =>
                              setNewItem({ ...newItem, price: e.target.value })
                            }
                            error={!!newItemErrors.price}
                            helperText={newItemErrors.price}
                          />
                        </Grid>
                        <Grid
                          item
                          lg={6}
                          sm={6}
                          xs={12}
                          display={"flex"}
                          alignItems={"flex-end"}
                        >
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={newItem.isAvailable}
                                onChange={(e) =>
                                  setNewItem({
                                    ...newItem,
                                    isAvailable: e.target.checked,
                                  })
                                }
                              />
                            }
                            label="Is Available"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <div className="customUploader">
                            <label className="inputGroup__title">
                              Add Item Image
                            </label>
                            <div
                              style={{
                                border: newItemErrors.image
                                  ? "1px solid red"
                                  : "1px solid transparent",
                              }}
                            >
                              <Button
                                className="customUploader__field"
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<Upload />}
                              >
                                <span>
                                  Drop the image, or <b>click to Browse</b>
                                </span>
                                <VisuallyHiddenInput
                                  type="file"
                                  accept="image/jpeg,image/png,image/jpg"
                                  onChange={(event) => {
                                    const file = event.target.files[0];
                                    if (file) {
                                      setNewItem({ ...newItem, image: file });
                                      setImage(URL.createObjectURL(file));
                                    }
                                  }}
                                />
                              </Button>
                            </div>
                            {image && (
                              <div className="uploaded__List">
                                <div className="uploaded__Image">
                                  <img src={image} alt="Item Preview" />
                                  <Close
                                    className="closeBtn"
                                    onClick={() => {
                                      setImage(null);
                                      setNewItem({ ...newItem, image: null });
                                    }}
                                  />
                                </div>
                              </div>
                            )}
                            {newItemErrors.image && (
                              <p className="error_message">
                                {newItemErrors.image}
                              </p>
                            )}
                          </div>
                        </Grid>
                      </Grid>
                      <div className="btnPart">
                        <Button
                          variant="contained"
                          onClick={handleNewItemSubmit}
                          className="PrimaryButton"
                        >
                          Save Item
                        </Button>
                        <Button
                          onClick={() => setShowAddItemForm(false)}
                          className="PrimaryButton button--gray"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
                <Grid item xs={12}>
                  <div className="selectedItemsDisplay">
                    <h3 className="selectedItemsDisplay__title">
                      Selected Items for Category:
                    </h3>
                    {selectedItems.length > 0 ? (
                      <ol>
                        {selectedItems.map((itemId, index) => {
                          const item = items.find(
                            (item) => item._id === itemId
                          );
                          return (
                            <li key={index}>
                              {capitalizeFirstLetter(item.name) ||
                                "Unknown Item"}
                            </li>
                          );
                        })}
                      </ol>
                    ) : (
                      <p>No items selected yet.</p>
                    )}
                  </div>
                </Grid>
              </>
            )}

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
              <div className="Primarydiv button--gray"></div>
              <div>
                {activeStep === 1 ? (
                  <Button
                    color="primary"
                    className="PrimaryButton kitchenMenuCategory__finishBtn"
                    onClick={handleFinish}
                    variant="contained"
                  >
                    Finish
                  </Button>
                ) : (
                  <Button
                    className="PrimaryButton"
                    onClick={formik.handleSubmit}
                    variant="contained"
                  >
                    Next
                  </Button>
                )}
                {activeStep === 1 && (
                  <Button
                    variant="outlined"
                    color="secondary"
                    className="PrimaryButton"
                    sx={{ marginLeft: "15px" }}
                    onClick={handleSkip}
                  >
                    Skip
                  </Button>
                )}
              </div>
            </Box>
          </form>
        </div>
      )}
    </>
  );
};

export default KichenMenuCategoryAdd;
