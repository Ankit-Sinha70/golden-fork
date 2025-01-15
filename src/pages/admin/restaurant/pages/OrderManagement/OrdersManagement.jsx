import React from "react";
import TableComponent from "../../../../../components/Table/Table";

const OrdersManagement = () => {
  return (
    <>
      <div className="moduleBox table-list">
        <div className="pageTemplate">
          <h1 className="headSubTitle">Completed Order</h1>
          <TableComponent OrderManagement={true}/>
          <h1 className="headSubTitle">Upcoming Order</h1>
          <TableComponent UpcomingOrder={true}/>
        </div>
      </div>
    </>
  )
};

export default OrdersManagement;
