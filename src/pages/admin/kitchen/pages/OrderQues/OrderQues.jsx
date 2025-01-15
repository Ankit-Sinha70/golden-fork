import React from "react";
import TableComponent from "../../../../../components/Table/Table";

const OrderQues = () => {
  return (
    <div className="pageTemplate">
      <div className="pageTemplate__head">
        <h1 className="headTitle">Order Ques Page</h1>
        <TableComponent OrderQues={true} />
      </div>
    </div>
  );
};

export default OrderQues;
