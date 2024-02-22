import React, { useState, useEffect } from "react";
import styles from "../PlaceOrder/PlaceOrder.module.css";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../LayOut/Layout";

function PlaceOrder() {
  const restaurantName = sessionStorage.getItem("restaurant");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const orderId = Math.floor(Math.random() * 100000 + 100000);

  const cost = sessionStorage.getItem("totalPrice");
  const restName = sessionStorage.getItem("restaurant");
  const orderItems = sessionStorage.getItem("menu");
  const uniqueId = localStorage.getItem("uniqueId");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authtoken");
    if (!token) {
      navigate("/login");
    }
  });

  async function fetchData() {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/restaurant/placeOrder`,
        {
          orderId,
          name,
          email,
          phone,
          address,
          cost,
          restName,
          orderItems,
          uniqueId,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/Myorder");
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error("Order not Placed", err);
    }
  }

  return (
    <Layout title={"place-order zomato-app"}>
      <div className={`container ${styles.container}`}>
        <div className="restaurant-name">
          <h3> Order for {restaurantName}</h3>
          <hr />
        </div>
        <div className={styles.details}>
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Name"
            variant="outlined"
          />
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
          />
          <TextField
            label="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            variant="outlined"
          />
          <TextField
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            variant="outlined"
          />
        </div>
        <center>
          <button className="btn text-bg-success" onClick={fetchData}>
            Click
          </button>
        </center>
      </div>
    </Layout>
  );
}

export default PlaceOrder;
