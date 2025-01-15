import { Close, Pending, People, Reply, Restore, Search } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import TotalCountCard from "../../../../components/Card/TotalCountCard";
import CircularLoader from "../../../../components/CircularLoader/CircularLoader";
import TableComponent from "../../../../components/Table/Table";
import {
  deleteContactUsById,
  getAllContactUs,
  sendReply,
} from "../../../../redux/slices/contactUsSlice";
import "./ContactUs.scss";

const ContactUs = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [replyDialog, setReplyDialog] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [contactId, setContactId] = useState(null);

  useEffect(() => {
    dispatch(
      getAllContactUs({
        page: currentPage,
        limit: itemsPerPage,
        search: search || null,
      })
    );
  }, [dispatch, currentPage, itemsPerPage, filter]);

  const handleSearchClick = () => {
    setCurrentPage(1);
      dispatch(
        getAllContactUs({
        page: currentPage,
        limit: itemsPerPage,
        name: search || null,
      })
    );
  };

  const handleResetFilters = () => {
    setSearch("");
    setCurrentPage(1);
    dispatch(
      getAllContactUs({
        page: 1,
        limit: itemsPerPage,
        search: "",
      })
    );;
  };

  const { contactUsList, meta, loading } = useSelector(
    (state) => state.contactus
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
    setContactToDelete(row);
    setOpenDialog(true);
  };

  const closeDeleteConfirmationDialog = () => {
    setOpenDialog(false);
    setContactToDelete(null);
  };

  const handleDelete = async () => {
    if (contactToDelete) {
      setOpenDialog(false);
      await dispatch(deleteContactUsById(contactToDelete._id));
      dispatch(
        getAllContactUs({ page: currentPage, limit: itemsPerPage, filter })
      );
      setContactToDelete(null);
    }
  };

  const handleSendReply = (contactId) => {
    setContactId(contactId);
    setReplyDialog(true);
  };

  const handleReplySubmit = (contact, message) => {
    dispatch(sendReply({ id: contact?._id, sendReply: message }));
  };

  const ReplyDialog = ({ open, onClose, onSubmit }) => {
    const initialValues = { message: "" };
    const validationSchema = Yup.object({
      message: Yup.string()
        .min(10, "Message must be at least 10 characters")
        .required("Message is required"),
    });

    if (loading) {
      return <CircularLoader />;
    }

    return (
      <Dialog className="AddCategoryModel" open={open}>
        <div className="dialog">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              onSubmit(contactId, values.message);
              setSubmitting(false);
              resetForm();
              onClose();
            }}
          >
            {({ isSubmitting }) => (
              <Form className="contactUs-form">
                <DialogContent className="dialog__form">
                  <div className="dialog__form_header">
                    <h3>Send Reply</h3>
                    <Close className="svg" onClick={onClose} />
                  </div>
                  <Grid
                    item
                    lg={6}
                    sm={6}
                    xs={12}
                    className="reason_comment_textarea"
                  >
                    <label className="inputGroup__title">Message</label>
                    <Field
                      as={TextField}
                      id="message"
                      name="message"
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={4}
                      helperText={<ErrorMessage name="message" />}
                      error={Boolean(<ErrorMessage name="message" />)}
                    />
                  </Grid>
                </DialogContent>
                <DialogActions className="dialog__btn">
                  <Button
                    type="submit"
                    className="PrimaryButton"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                  >
                    Send
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </div>
      </Dialog>
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
            <h1 className="headTitle management">Conatct Us Management</h1>
          </div>
          <Grid container spacing={3} xs={12}>
            <Grid item xl={3} md={6}>
              <TotalCountCard
                name={"Total Contact"}
                icon={People}
                count={meta?.totalContactUs}
                month={"This Month"}
              />
            </Grid>
            <Grid item xl={3} md={6}>
              <TotalCountCard
                name={"Total Reverted"}
                icon={Reply}
                count={meta?.totalReplied}
                month={"This Month"}
              />
            </Grid>
            <Grid item xl={3} md={6}>
              <TotalCountCard
                name={"Pending Request"}
                icon={Pending}
                count={meta?.totalPending}
                month={"This Month"}
              />
            </Grid>
          </Grid>

          <div className="moduleBox table-list">
            <div className="pageTemplate__head">
              <h2 className="headSubTitle">Contact List</h2>
              <div className="pageTemplate__head__filter">
                <div className="searchbarBox">
                  <input
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <Search  onClick={handleSearchClick}
                    style={{ cursor: "pointer" }} />
                </div>
                <Restore
                  variant="outlined"
                  onClick={handleResetFilters}
                  className="resetFilter"
                />
              </div>
            </div>
            <TableComponent
              ContactUs={true}
              data={contactUsList}
              currentPage={currentPage}
              totalPages={meta?.totalPages}
              totalItems={meta?.totalContactUs}
              itemsPerPage={itemsPerPage}
              pagination={true}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
              onEditRow={handleSendReply}
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
              {contactToDelete?.name} ? This action cannot be undone.
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

          {replyDialog && (
            <ReplyDialog
              open={replyDialog}
              onClose={() => setReplyDialog(false)}
              onSubmit={handleReplySubmit}
            />
          )}
        </div>
      )}
    </>
  );
};

export default ContactUs;
