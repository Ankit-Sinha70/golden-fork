import React, { useEffect } from "react";
import TableComponent from "../../../../../components/Table/Table";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersThunk } from "../../../../../redux/slices/orderSlice";
import CircularLoader from "../../../../../components/CircularLoader/CircularLoader";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrdersThunk({ page: 1, limit: 10 }));
  }, [dispatch]);

  const completedOrders = orders.filter(
    (order) => order.status === "Completed"
  );
  const NewOrder = orders.filter((order) => order.status === "Pending");
  return (
    <div className="pageTemplate">
      <div className="pageTemplate__head">
        <h1 className="headTitle">Completed Order</h1>
        {loading ? (
          <div>
            <CircularLoader />
          </div>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <TableComponent orders={completedOrders} />
        )}

        <h1 className="headTitle">
          New Order
        </h1>
        {loading ? (
          <div>
            <CircularLoader />
          </div>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <TableComponent data={orders} NewOrder={true} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
