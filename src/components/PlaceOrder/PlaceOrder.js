import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import Layout from "../LayOut/Layout";
import styles from "./PlaceOrder.module.css"; // Ensure correct path for styles

function PlaceOrder() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [signature, setSignature] = useState("");
  const [cost, setCost] = useState(""); // Use state for cost
  const restaurantName = sessionStorage.getItem("restaurant");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authtoken");
    if (!token) {
      navigate("/login");
    }

    // Fetch cost from sessionStorage and set it in state
    const totalPrice = sessionStorage.getItem("totalPrice");
    setCost(totalPrice);
  }, [navigate]); // Added dependency array for useEffect

  const handlePayment = async () => {
    try {
      const orderId = Math.floor(Math.random() * 100000 + 100000);
      const orderItems = sessionStorage.getItem("menu");
      const uniqueId = localStorage.getItem("uniqueId");

      const response = await axios.post(
        `${process.env.REACT_APP_API}/restaurant/placeOrder`,
        {
          orderId,
          name,
          email,
          phone,
          address,
          cost,
          restName: restaurantName,
          orderItems,
          uniqueId,
        }
      );

      if (response.data.success) {
        const order = response.data.order;
        const script = document.createElement("script");
        script.src = process.env.REACT_APP_RAZORPAY_URL;
        script.async = true;
        script.onload = () => initializeRazorpay(order);
        document.body.appendChild(script);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const initializeRazorpay = (order) => {
    const options = {
      key: process.env.REACT_APP_RAZORPAY_ID_KEY,
      amount: cost * 100,
      email: email,
      currency: "INR",
      name: "Zomato App",
      description: "Test Payment",
      handler: function (response) {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
          response;
        setPaymentId(razorpay_payment_id);
        setSignature(razorpay_signature);

        axios
          .post(`${process.env.REACT_APP_API}/restaurant/payment/capture`, {
            payment_id: razorpay_payment_id,
            order_id: razorpay_order_id,
            signature: razorpay_signature,
          })
          .then((res) => {
            toast(res.data.message);
            navigate("/myOrder");
          })
          .catch((error) => {
            console.error("Payment failed:", error);
          });
      },
    };

    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();
  };

  return (
    <div>
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
            <button className="btn text-bg-success" onClick={handlePayment}>
              Click
            </button>
          </center>
        </div>
      </Layout>
    </div>
  );
}

export default PlaceOrder;
