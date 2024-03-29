import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Listing from "./components/Listing/Listing";
import Details from "./components/Details/Details";
import PlaceOrder from "./components/PlaceOrder/PlaceOrder";
import Login from "./components/Login";
import Signup from "./components/Signup";
import MyOrder from "./components/MyOrder";
import Profile from "./components/profile/Profile";
import PageNotFound from "./components/PageNotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/:mealtype/:mealId" element={<Listing />} />
        <Route exact path="/details" element={<Details />} />
        <Route exact path="/placeOrder" element={<PlaceOrder />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/MyOrder" element={<MyOrder />} />
        <Route exact path="/profile/:id" element={<Profile />} />
        <Route exact path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
