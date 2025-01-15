import {
  Add,
  Close,
  Delete,
  Edit,
  ExpandMore,
  People,
  Restore,
  Search,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  Grid,
  Grid2,
  NativeSelect,
  TextField,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import TotalCountCard from "../../../../components/Card/TotalCountCard";
import CircularLoader from "../../../../components/CircularLoader/CircularLoader";
import Pagination from "../../../../components/Pagination/Pagination";
import {
  createCMSPage,
  deleteCMSPage,
  getAllCMSPages,
  updateCMSPage,
} from "../../../../redux/slices/cmsSlice";
import "./CMSManagement.scss";

const CMSManagement = () => {
  const dispatch = useDispatch();
  const { cmsPages, meta, loading } = useSelector((state) => state.cms);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCMSPage, setSelectedCMSPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEdit, setIsEdit] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  useEffect(() => {
    dispatch(getAllCMSPages());
  }, [dispatch]);

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required("Title is required")
      .min(3, "Title must be at least 3 characters"),
    content: Yup.string()
      .required("Content is required")
      .min(10, "Content must be at least 10 characters"),
    slug: Yup.string()
      .required("Slug is required")
      .matches(
        /^[a-z0-9-]+$/,
        "Slug must contain only lowercase letters, numbers, or hyphens"
      )
      .min(3, "Slug must be at least 3 characters"),
  });

  const handleSubmit = (values, { resetForm }) => {
    if (isEdit) {
      dispatch(
        updateCMSPage({ pageId: selectedCMSPage._id, formData: values })
      ).then(() => {
        dispatch(getAllCMSPages({ page, limit: itemsPerPage }));
        setDialogOpen(false);
        resetForm();
      });
    } else {
      dispatch(createCMSPage(values)).then(() => {
        dispatch(getAllCMSPages({ page, limit: itemsPerPage }));
        setDialogOpen(false);
        resetForm();
      });
    }
  };


  const handleOpenDialog = (cmsPage) => {
    setDialogOpen(true);
    if (cmsPage) {
      setIsEdit(true);
      setSelectedCMSPage(cmsPage);
    } else {
      setIsEdit(false);
      setSelectedCMSPage(null);
    }
  };

  const handleDeleteCMSPage = (pageId) => {
    dispatch(deleteCMSPage(pageId)).then(() => {
      dispatch(getAllCMSPages({ page, limit: itemsPerPage }));
    });
  };

  const fetchRestaurants = () => {
    dispatch(
      getAllCMSPages({
        page: currentPage,
        limit: itemsPerPage,
        title: search || null,
        status: filter !== "All" ? filter : null,
      })
    )
  };

    const handleResetFilters = () => {
      setSearch("");
      setFilter("All");
      dispatch(
        getAllCMSPages({
          page: 1,
          limit: itemsPerPage,
          search: "",
        })
      );;
    };


  const handleSearchClick = () => {
    setCurrentPage(1);
    fetchRestaurants();
  };

  useEffect(() => {
    fetchRestaurants();
  }, [dispatch, currentPage, itemsPerPage]);

  return (
    <>
      {loading ? (
        <div>
          <CircularLoader />
        </div>
      ) : (
        <div className="pageTemplate">
          <div className="pageTemplate__head">
            <h1 className="headTitle">CMS Management</h1>
          </div>
          <Grid container spacing={3} xs={12}>
            <Grid item xl={3} md={6}>
              <TotalCountCard
                name={"Total CMS Page"}
                icon={People}
                count={meta?.totalCmsPageCount}
                month={"This Month"}
              />
            </Grid>
          </Grid>

          <div className="moduleBox table-list">
            <div className="pageTemplate__head mb-0">
              <h1 className="headTitle">CMS Page Management</h1>
              <div className="pageTemplate__head__filter">
                <Button
                  className="PrimaryButton"
                  onClick={() => handleOpenDialog(null)}
                >
                  <Add />
                  Add CMS
                </Button>
                <div className="searchbarBox">
                  <input
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <Search  onClick={handleSearchClick}
                    style={{ cursor: "pointer" }} />
                </div>
                {/* <Box className="table-head-select">
                  <FormControl fullWidth>
                    <NativeSelect value={filter} onChange={handleFilterChange}>
                      <option value="All">All</option>
                      <option value="Customer">Customer</option>
                      <option value="SuperAdmin">SuperAdmin</option>
                      <option value="RestaurantAdmin">RestaurantAdmin</option>
                      <option value="KitchenStaff">KitchenStaff</option>
                    </NativeSelect>
                  </FormControl>
                </Box> */}
                <Restore variant="outlined" className="resetFilter" onClick={handleResetFilters} />
              </div>
            </div>
            <div className=" cms">
              <div className="cms__content">
                <div className="cms__questions">
                  {cmsPages?.map((item, key) => (
                    <>
                      <Accordion key={item._id}>
                        <AccordionSummary
                          expandIcon={<ExpandMore />}
                          aria-controls="panel1-content"
                          id="panel1-header"
                        >
                          <div className="cms__accordion">
                            <div> {item?.title}</div>
                            <div className="btnPart">
                              <Edit
                                className="btnPart-edit"
                                onClick={() => handleOpenDialog(item)}
                              />
                              <Delete
                                className="btnPart-delete"
                                onClick={() => handleDeleteCMSPage(item?._id)}
                              />
                            </div>
                          </div>
                        </AccordionSummary>
                        <AccordionDetails key={key}>
                          <div>
                            <p>
                              <strong>Title:</strong> {item?.title}
                            </p>
                            <p>
                              <strong>Content:</strong> {item?.content}
                            </p>
                            <p>
                              <strong>Slug:</strong> {item?.slug}
                            </p>
                          </div>
                        </AccordionDetails>
                      </Accordion>
                    </>
                  ))}
                </div>
                {cmsPages?.length > 10 ? (
                  <Pagination
                    currentPage={page}
                    totalPages={meta?.totalPages}
                    totalItems={meta?.totalFaq}
                    itemsPerPage={itemsPerPage}
                    onPageChange={(newPage) => setPage(newPage)}
                    onItemsPerPageChange={(newItemsPerPage) => {
                      setItemsPerPage(newItemsPerPage);
                      setPage(1);
                    }}
                    label={"CMS Pages out of"}
                  />
                ) : null}
              </div>
            </div>
          </div>

          <Dialog className="AddCategoryModel AddfaqModel" open={dialogOpen}>
            <Formik
              initialValues={{
                title: selectedCMSPage?.title || "",
                content: selectedCMSPage?.content || "",
                slug: selectedCMSPage?.slug || "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <div className="dialog">
                  <Form>
                    <DialogContent className="dialog__form">
                      <div className="dialog__form_header">
                        <h3>{isEdit ? "Edit CMS Page" : "Create CMS Page"}</h3>
                        <Close
                          className="svg"
                          onClick={() => setDialogOpen(false)}
                        />
                      </div>
                      <Grid2
                        className="dialog__form-editFaqs"
                        container
                        spacing={2}
                      >
                        <Grid2 item lg={6} sm={6} xs={12}>
                          <div className="inputGroup__inputField">
                            <label className="inputGroup__title">Title</label>
                            <Field
                              as={TextField}
                              name="title"
                              placeholder="Title"
                              className="inputGroup__field"
                              fullWidth
                              margin="normal"
                              error={touched.title && !!errors.title}
                              helperText={touched.title && errors.title}
                              style={{ margin: "0" }}
                            />
                          </div>
                        </Grid2>
                        <Grid2 item lg={6} sm={6} xs={12}>
                          <div className="inputGroup__inputField">
                            <label className="inputGroup__title">Content</label>
                            <Field
                              as={TextField}
                              name="content"
                              placeholder="Content"
                              className="inputGroup__field"
                              fullWidth
                              margin="normal"
                              error={touched.content && !!errors.content}
                              helperText={touched.content && errors.content}
                              style={{ margin: "0" }}
                            />
                          </div>
                        </Grid2>
                      </Grid2>
                      <Grid2
                        item
                        lg={6}
                        sm={6}
                        xs={12}
                        className="reason_comment_textarea"
                      >
                        <div className="inputGroup__inputField">
                          <label className="inputGroup__title">Slug</label>
                          <Field
                            as={TextField}
                            name="slug"
                            placeholder="Slug"
                            fullWidth
                            multiline
                            rows={4}
                            margin="normal"
                            error={touched.slug && !!errors.slug}
                            helperText={touched.slug && errors.slug}
                            style={{ margin: "0" }}
                          />
                        </div>
                      </Grid2>

                      <DialogActions className="dialog__btn">
                        <Button
                          className="PrimaryButton"
                          type="submit"
                          variant="contained"
                        >
                          {isEdit ? "Update" : "Add"}
                        </Button>
                        <Button
                          className="PrimaryButton"
                          variant="outlined"
                          onClick={() => {
                            setDialogOpen(false);
                            setSelectedCMSPage(null);
                          }}
                        >
                          Cancel
                        </Button>
                      </DialogActions>
                    </DialogContent>
                  </Form>
                </div>
              )}
            </Formik>
          </Dialog>
        </div>
      )}
    </>
  );
};

export default CMSManagement;
