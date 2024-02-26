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
      <div className={styles.inputFilter}>
        {/* Cuisine filter */}
        <div className="cuisine filter">
          <h6>Cuisine</h6>

          <input
            type="radio"
            name="cuisine"
            id="all"
            value=""
            onChange={handleCuisineChange}
          />
          <label className={styles.labelAnim} htmlFor="all">
            All
          </label>
          <br />
          <input
            type="radio"
            name="cuisine"
            id="north indian"
            value="1"
            onChange={handleCuisineChange}
          />
          <label className={styles.labelAnim} htmlFor="north indian">
            North Indian
          </label>
          <br />

          <input
            type="radio"
            name="cuisine"
            id="south indian"
            value="2"
            onChange={handleCuisineChange}
          />
          <label className={styles.labelAnim} htmlFor="south indian">
            South Indian
          </label>
          <br />

          <input
            type="radio"
            name="cuisine"
            id="chinese"
            value="3"
            onChange={handleCuisineChange}
          />
          <label className={styles.labelAnim} htmlFor="chinese">
            Chinese
          </label>
          <br />

          <input
            type="radio"
            name="cuisine"
            id="fast food"
            value="4"
            onChange={handleCuisineChange}
          />
          <label className={styles.labelAnim} htmlFor="fast food">
            Fast Food
          </label>
          <br />

          <input
            type="radio"
            name="cuisine"
            id="street food"
            value="5"
            onChange={handleCuisineChange}
          />
          <label className={styles.labelAnim} htmlFor="street food">
            Street Food
          </label>
        </div>

        {/* Cost filter */}
        <div className="cost filter">
          <h6 className="pt-3">Cost For Two</h6>

          <input
            type="radio"
            name="cost"
            id="500"
            value="1-500"
            onChange={handleCostChange}
          />
          <label className={styles.labelAnim} htmlFor="500">
            Less than 500
          </label>
          <br />

          <input
            type="radio"
            name="cost"
            id="1000"
            value="501-1000"
            onChange={handleCostChange}
          />
          <label className={styles.labelAnim} htmlFor="1000">
            500 to 1000
          </label>
          <br />

          <input
            type="radio"
            name="cost"
            id="1500"
            value="1001-1500"
            onChange={handleCostChange}
          />
          <label className={styles.labelAnim} htmlFor="1500">
            1000 to 1500
          </label>
          <br />

          <input
            type="radio"
            name="cost"
            id="2000"
            value="1501-2000"
            onChange={handleCostChange}
          />
          <label className={styles.labelAnim} htmlFor="2000">
            1500 to 2000
          </label>
          <br />

          <input
            type="radio"
            name="cost"
            id="2000+"
            value="2001-3000"
            onChange={handleCostChange}
          />
          <label className={styles.labelAnim} htmlFor="2000+">
            2000+
          </label>
          <br />
        </div>

        {/* Sort filter */}
        <div className="cost filter">
          <h6 className="pt-3">Sort</h6>

          <input
            type="radio"
            name="sort"
            id="lowToHigh"
            value="asc"
            onChange={handleSortChange}
          />
          <label className={styles.labelAnim} htmlFor="lowToHigh">
            Price low to high
          </label>
          <br />

          <input
            type="radio"
            name="sort"
            id="highToLow"
            value="desc"
            onChange={handleSortChange}
          />
          <label className={styles.labelAnim} htmlFor="highToLow">
            Price high to low
          </label>
        </div>
      </div>

      {/* Responsive Filter  */}

      <div className={`dropdown ${styles.dropDownFilter}`}>
        <h4 data-bs-toggle="dropdown">Filters / Sort</h4>
        <ul className={`dropdown-menu ${styles.dropDownList}`}>
          {/* Cuisine filter */}
          <div className="cuisine filter">
            <h6>Cuisine</h6>

            <input
              type="radio"
              name="cuisine"
              id="all"
              value=""
              onChange={handleCuisineChange}
            />
            <label htmlFor="all" className={styles.labelAnim}>
              All
            </label>
            <br />
            <input
              type="radio"
              name="cuisine"
              id="north indian"
              value="1"
              onChange={handleCuisineChange}
            />
            <label className={styles.labelAnim} htmlFor="north indian">
              North Indian
            </label>
            <br />

            <input
              type="radio"
              name="cuisine"
              id="south indian"
              value="2"
              onChange={handleCuisineChange}
            />
            <label className={styles.labelAnim} htmlFor="south indian">
              South Indian
            </label>
            <br />

            <input
              type="radio"
              name="cuisine"
              id="chinese"
              value="3"
              onChange={handleCuisineChange}
            />
            <label className={styles.labelAnim} htmlFor="chinese">
              Chinese
            </label>
            <br />

            <input
              type="radio"
              name="cuisine"
              id="fast food"
              value="4"
              onChange={handleCuisineChange}
            />
            <label className={styles.labelAnim} htmlFor="fast food">
              Fast Food
            </label>
            <br />

            <input
              type="radio"
              name="cuisine"
              id="street food"
              value="5"
              onChange={handleCuisineChange}
            />
            <label className={styles.labelAnim} htmlFor="street food">
              Street Food
            </label>
          </div>

          {/* Cost filter */}
          <div className="cost filter">
            <h6 className="pt-3">Cost For Two</h6>

            <input
              type="radio"
              name="cost"
              id="500"
              value="1-500"
              onChange={handleCostChange}
            />
            <label className={styles.labelAnim} htmlFor="500">
              Less than 500
            </label>
            <br />

            <input
              type="radio"
              name="cost"
              id="1000"
              value="501-1000"
              onChange={handleCostChange}
            />
            <label className={styles.labelAnim} htmlFor="1000">
              500 to 1000
            </label>
            <br />

            <input
              type="radio"
              name="cost"
              id="1500"
              value="1001-1500"
              onChange={handleCostChange}
            />
            <label className={styles.labelAnim} htmlFor="1500">
              1000 to 1500
            </label>
            <br />

            <input
              type="radio"
              name="cost"
              id="2000"
              value="1501-2000"
              onChange={handleCostChange}
            />
            <label className={styles.labelAnim} htmlFor="2000">
              1500 to 2000
            </label>
            <br />

            <input
              type="radio"
              name="cost"
              id="2000+"
              value="2001-3000"
              onChange={handleCostChange}
            />
            <label className={styles.labelAnim} htmlFor="2000+">
              2000+
            </label>
            <br />
          </div>

          {/* Sort filter */}
          <div className="cost filter">
            <h6 className="pt-3">Sort</h6>

            <input
              type="radio"
              name="sort"
              id="lowToHigh"
              value="asc"
              onChange={handleSortChange}
            />
            <label className={styles.labelAnim} htmlFor="lowToHigh">
              Price low to high
            </label>
            <br />

            <input
              type="radio"
              name="sort"
              id="highToLow"
              value="desc"
              onChange={handleSortChange}
            />
            <label className={styles.labelAnim} htmlFor="highToLow">
              Price high to low
            </label>
          </div>
        </ul>
      </div>
    </div>
  );
}

export default Filter;
