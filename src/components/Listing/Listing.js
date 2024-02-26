import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Pagination } from "@mui/material";
import Meal from "./Meal";
import styles from "../Listing/Listing.module.css";
import Layout from "../LayOut/Layout";
import Filter from "./Filter";

function Listing() {
  const [meal, setMeal] = useState([]);
  const { mealId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);

  const fetchMeal = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/restaurant/restaurants?mealId=${mealId}`
      );
      setMeal(response.data);
    } catch (err) {
      console.log("Invalid mealId", err);
      setMeal([]);
    }
  };

  function setFilterData(data) {
    setMeal(data);
  }

  useEffect(() => {
    fetchMeal();
  }, [mealId]);

  const itemsPerPage = 2;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = meal.slice(indexOfFirstItem, indexOfLastItem);

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Layout title={"Listing zomato-app"}>
      <div className={`container ${styles.listing}`}>
        <div className={`${styles.filterArea}`}>
          <h5 className={styles.filterHeading}>Filters</h5>
          <div className={styles.filter}>
            <Filter filter={setFilterData} />
          </div>
        </div>

        <div className="meal items">
          {currentItems.length === 0 ? (
            <div className=" p-5">
              <h1 className="text-danger">No result found</h1>
            </div>
          ) : (
            currentItems.map((items, index) => (
              <Meal key={index} listData={items} />
            ))
          )}
          {meal.length > itemsPerPage && (
            <Pagination
              count={Math.ceil(meal.length / itemsPerPage)}
              page={currentPage}
              onChange={handleChangePage}
              variant="outlined"
              shape="rounded"
              className="m-2"
            />
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Listing;
