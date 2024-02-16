import React, { useState, useEffect } from "react";
import CuisineFilter from "../Listing/CuisineFilter";
import CostFilter from "../Listing/CostFilter";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Pagination } from "@mui/material";
import MealFilter from "../Listing/MealFilter";
import styles from "../Listing/Listing.module.css";
import SortFilter from "../Listing/SortFilter";
import Layout from "../LayOut/Layout";

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

  function setDataFilter(data) {
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
      <div className="container">
        <div className={`${styles.listing}`}>
          <div className={`${styles.filterArea}`}>
            <h5 className={styles.filterHeading}>Filters</h5>
            <div className={styles.filter}>
              <CuisineFilter setCuisine={setDataFilter} />
              <CostFilter setCost={setDataFilter} />
              <SortFilter setSort={setDataFilter} />
            </div>
          </div>
          <center>
            <div className={styles.mealItems}>
              {currentItems.length === 0 ? (
                <h1 className="text-danger">No result found</h1>
              ) : (
                currentItems.map((items, index) => (
                  <MealFilter key={index} listData={items} />
                ))
              )}
              {meal.length > itemsPerPage && (
                <Pagination
                  count={Math.ceil(meal.length / itemsPerPage)}
                  page={currentPage}
                  onChange={handleChangePage}
                  variant="outlined"
                  shape="rounded"
                  className={styles.pagination}
                />
              )}
            </div>
          </center>
        </div>
      </div>
    </Layout>
  );
}

export default Listing;
