import React from "react";
import { Link } from "react-router-dom";
import styles from "../Listing/Meal.module.css";

function Meal({ listData }) {
  return (
    <div className={`${styles.mealFilter} container`}>
      <div className={styles.img}>
        <img className={styles.img} src={listData.restaurant_thumb} alt="" />
      </div>

      <div className={styles.titles}>
        <Link
          to={`/details?restId=${listData.restaurant_id}`}
          className={styles.restaurantName}
        >
          {listData.restaurant_name}
        </Link>
        <p>{listData.address}</p>
        <span className={styles.rating}>{listData.rating_text} </span>
        <p>{`Price:- Rs ${listData.cost}`}</p>

        <div className="mealTypes">
          <span className={`badge text-bg-primary ${styles.mealName}`}>
            {listData.mealTypes[0].mealtype_name}
          </span>
          <span className={` badge text-bg-info ${styles.mealname}`}>
            {listData.mealTypes[1].mealtype_name}
          </span>
        </div>

        <div className="cuisines">
          <span className={`badge text-bg-danger ${styles.cuisines}`}>
            {listData.cuisines[0].cuisine_name}
          </span>
          <span className={`badge text-bg-warning ${styles.cuisines}`}>
            {listData.cuisines[1].cuisine_name}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Meal;
