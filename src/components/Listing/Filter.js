import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styles from "./Filter.module.css";
import { toast } from "react-toastify";

function Filter({ filter }) {
  const { mealId } = useParams();
  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [selectedCost, setSelectedCost] = useState("");
  const [selectedSort, setSelectedSort] = useState("");

  const handleCuisineChange = (e) => {
    setSelectedCuisine(e.target.value);
    filterData(e.target.value, selectedCost, selectedSort);
  };

  const handleCostChange = (e) => {
    setSelectedCost(e.target.value);
    filterData(selectedCuisine, e.target.value, selectedSort);
  };

  const handleSortChange = (e) => {
    setSelectedSort(e.target.value);
    filterData(selectedCuisine, selectedCost, e.target.value);
  };

  const filterData = async (cuisine, cost, sort) => {
    try {
      let lcost;
      let hcost;
      if (cost) {
        [lcost, hcost] = cost.split("-").map(Number);
      }

      const response = await axios.get(
        `${process.env.REACT_APP_API}/restaurant/filter/${mealId}?cuisineId=${cuisine}&sort=${sort}&lcost=${lcost}&hcost=${hcost}`
      );

      filter(response.data);
    } catch (error) {
      toast.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      {/* Cuisine filter */}
      <div className={styles.cuisineInput}>
        <h6>Cuisine</h6>
        <div>
          <input
            type="radio"
            name="cuisine"
            id="all"
            value=""
            onChange={handleCuisineChange}
          />
          <label htmlFor="all">All</label>
        </div>
        <div>
          <input
            type="radio"
            name="cuisine"
            id="north indian"
            value="1"
            onChange={handleCuisineChange}
          />
          <label htmlFor="north indian">North Indian</label>
        </div>
        <div>
          <input
            type="radio"
            name="cuisine"
            id="south indian"
            value="2"
            onChange={handleCuisineChange}
          />
          <label htmlFor="south indian">South Indian</label>
        </div>
        <div>
          <input
            type="radio"
            name="cuisine"
            id="chinese"
            value="3"
            onChange={handleCuisineChange}
          />
          <label htmlFor="chinese">Chinese</label>
        </div>
        <div>
          <input
            type="radio"
            name="cuisine"
            id="fast food"
            value="4"
            onChange={handleCuisineChange}
          />
          <label htmlFor="fast food">Fast Food</label>
        </div>
        <div>
          <input
            type="radio"
            name="cuisine"
            id="street food"
            value="5"
            onChange={handleCuisineChange}
          />
          <label htmlFor="street food">Street Food</label>
        </div>
      </div>

      {/* Cost filter */}
      <div className={styles.costInput}>
        <h6 className="pt-3">Cost For Two</h6>
        <div>
          <input
            type="radio"
            name="cost"
            id="500"
            value="1-500"
            onChange={handleCostChange}
          />
          <label htmlFor="500">Less than 500</label>
        </div>
        <div>
          <input
            type="radio"
            name="cost"
            id="1000"
            value="501-1000"
            onChange={handleCostChange}
          />
          <label htmlFor="1000">500 to 1000</label>
        </div>
        <div>
          <input
            type="radio"
            name="cost"
            id="1500"
            value="1001-1500"
            onChange={handleCostChange}
          />
          <label htmlFor="1500">1000 to 1500</label>
        </div>
        <div>
          <input
            type="radio"
            name="cost"
            id="2000"
            value="1501-2000"
            onChange={handleCostChange}
          />
          <label htmlFor="2000">1500 to 2000</label>
        </div>
        <div>
          <input
            type="radio"
            name="cost"
            id="2000+"
            value="2001-3000"
            onChange={handleCostChange}
          />
          <label htmlFor="2000+">2000+</label>
        </div>
      </div>

      {/* Sort filter */}
      <div className={styles.sortInput}>
        <h6 className="pt-3">Sort</h6>
        <div>
          <input
            type="radio"
            name="sort"
            id="lowToHigh"
            value="asc"
            onChange={handleSortChange}
          />
          <label htmlFor="lowToHigh">Price low to high</label>
        </div>
        <div>
          <input
            type="radio"
            name="sort"
            id="highToLow"
            value="desc"
            onChange={handleSortChange}
          />
          <label htmlFor="highToLow">Price high to low</label>
        </div>
      </div>

      {/* Responsive Filter  */}
      {/* Cuisine filter */}
      <div>
        <select className={styles.select} onChange={handleCuisineChange}>
          <option>-- Cuisine --</option>
          <option value="">All</option>
          <option value="1">North Indian</option>
          <option value="2">South Indian</option>
          <option value="3">Chinese</option>
          <option value="4">Fast Food</option>
          <option value="5">Street Food</option>
        </select>
      </div>

      {/* Cost filter */}
      <div>
        <select className={styles.select} onChange={handleCostChange}>
          <option>-- Cost For Two --</option>
          <option value="1-500">Less than 500</option>
          <option value="501-1000">500 to 1000</option>
          <option value="1001-1500">1000 to 1500</option>
          <option value="1501-2000">1500 to 2000</option>
          <option value="20001-3000">2000+</option>
        </select>
      </div>

      {/* Sort filter */}
      <div>
        <select className={styles.select} onChange={handleSortChange}>
          <option>-- Sort --</option>
          <option value="asc">Price low to high</option>
          <option value="desc">Price high to low</option>
        </select>
      </div>
    </div>
  );
}

export default Filter;
