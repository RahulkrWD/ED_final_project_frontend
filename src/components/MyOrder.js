import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./LayOut/Layout";
import OrderDetails from "./OrderDetails";
import { toast } from "react-toastify";

function MyOrder() {
  const [value, setValue] = useState([]);
  const [deletedOrderId, setDeletedOrderId] = useState(null);
  const uniqueId = localStorage.getItem("uniqueId");

  async function fetchMyorder() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/restaurant/order?id=${uniqueId}`
      );
      setValue(response.data);
    } catch (err) {
      console.log("Error fetching orders", err);
    }
  }

  async function deleteOrder(orderId) {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API}/restaurant/delete/${orderId}`
      );
      setDeletedOrderId(response.data);
      toast.success(response.data.message);
    } catch (err) {
      toast.error("Order Delete Failed", err);
    }
  }

  useEffect(() => {
    fetchMyorder();
  }, [deletedOrderId]);

  return (
    <Layout title={"my-order zomato-app"}>
      <div className="container">
        <center>
          <h3 className="border-bottom border-2 p-1 border-primary">
            order details
          </h3>
        </center>

        <table className="table">
          <thead>
            <tr>
              <th className="text-success">orderId</th>
              <th className="text-success">restaurant</th>
              <th className="text-success">Cost</th>
              <th className="text-success">Actions</th>
            </tr>
          </thead>
          <tbody>
            {value.map((data, index) => (
              <tr key={index}>
                <td>
                  <OrderDetails datas={data} />
                </td>
                <td>{data.restName}</td>
                <td>{data.cost}</td>
                <td>
                  <button
                    className="btn bg-warning fw-bold"
                    onClick={() => deleteOrder(data.orderId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default MyOrder;
