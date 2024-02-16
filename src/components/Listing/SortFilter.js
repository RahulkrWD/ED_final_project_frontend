import React from "react";
import styles from "../Listing/Filter.module.css";

function SortFilter() {
  return (
    <>
      <div>
        <div>
          <select className={styles.select}>
            <option>-- Sort --</option>
            <option value="1">Price low to high</option>
            <option value="-1">Price high to low</option>
          </select>
        </div>
        <div className={styles.sortInput}>
          <h6 className="pt-3">Sort</h6>
          <div>
            <input type="radio" name="sort" id="lowToHigh" />
            <label htmlFor="lowToHigh">Price low to high</label>
          </div>
          <div>
            <input type="radio" name="sort" id="highToLow" />
            <label htmlFor="highToLow">Price high to low</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default SortFilter;
