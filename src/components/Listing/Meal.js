import React from "react";
import { Link } from "react-router-dom";
import styles from "../Listing/Meal.module.css";

function Meal({ listData }) {
  return (
    <div className={`${styles.mealFilter}`}>
      <div className="d-flex">
        <div className="image p-2">
          <img className={styles.img} src={listData.restaurant_thumb} alt="" />
        </div>
        <div className="title address p-2">
          <Link
            to={`/details?restId=${listData.restaurant_id}`}
            className={styles.restaurantName}
          >
            {listData.restaurant_name}
          </Link>
          <p className="mt-2">{listData.address}</p>
          <span className="">{listData.rating_text} </span>
        </div>
      </div>
      <hr />
      <div className="meal details m-3">
        <p>
          CUISINES:
          <span className=" fw-bold p-1">
            {listData.cuisines[0].cuisine_name}{" "}
          </span>
          |
          <span className=" fw-bold p-1">
            {listData.cuisines[1].cuisine_name}
          </span>
        </p>
        <p>
          {" "}
          COST FOR TWO: <strong className="p-1">{listData.cost}</strong>
        </p>
      </div>
    </div>
  );
}

export default Meal;
