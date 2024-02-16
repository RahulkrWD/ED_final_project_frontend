import React, { useEffect, useState } from "react";
import styles from "../HomePage/Quicksearch.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

function QuickSearch() {
  const [quickSearch, setQuickSearch] = useState([]);

  async function fetchQuickSearch() {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/restaurant/quicksearch`
      );
      setQuickSearch(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchQuickSearch();
  }, []);

  return (
    <>
      <div className={`container mt-5`}>
        <h1 className={`${styles.heading}`}>Quick Searches</h1>
        <p className={`${styles.tag} mt-3`}>
          Discover restaurants by type of meal
        </p>
        <div className={`${styles.cardFlex}`}>
          {quickSearch.map((data) => (
            <Link
              key={data.mealtype_id}
              className={`card ${styles.card}`}
              to={`/${data.mealtype}/${data.mealtype_id}`}
            >
              <div>
                <img
                  src={data.meal_image}
                  className={`card-img-top ${styles.image}`}
                  alt=""
                />
              </div>

              <div className={`card-body`}>
                <h5 className={`card-title ${styles.mealType}`}>
                  {data.mealtype}
                </h5>
                <p className={`card-text ${styles.description}`}>
                  {data.content}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default QuickSearch;
