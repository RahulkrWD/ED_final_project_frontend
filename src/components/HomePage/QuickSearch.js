import React, { useEffect, useState } from "react";
import styles from "../HomePage/Quicksearch.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

function QuickSearch() {
  const [quickSearch, setQuickSearch] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchQuickSearch() {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/restaurant/quicksearch`
      );
      setQuickSearch(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching quick search:", err);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchQuickSearch();
  }, []);

  return (
    <div className="container">
      <h1 className={styles.heading}>Quick Searches</h1>
      <p className="mt-3" style={{ color: "#8c96ab", fontSize: "18px" }}>
        Discover restaurants by type of meal
      </p>
      <div className={styles.cardFlex}>
        {loading ? (
          <center style={{ minHeight: "40vh" }}>
            <h2 className="text-danger">Loading data....</h2>
          </center>
        ) : (
          quickSearch.map((data) => (
            <Link
              key={data.mealtype_id}
              className={`${styles.card}`}
              to={`/${data.mealtype}/${data.mealtype_id}`}
            >
              <div className="image">
                <img
                  src={data.meal_image}
                  className={`card-img-top ${styles.image}`}
                  alt=""
                />
              </div>
              <div className={`card-body p-3`}>
                <h5 className="card-title" style={{ color: "#192f60" }}>
                  {data.mealtype}
                </h5>
                <p
                  className="card-text"
                  style={{
                    lineHeight: "25px",
                    color: "#8c96ab",
                    marginTop: "5px",
                  }}
                >
                  {data.content}
                </p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default QuickSearch;
