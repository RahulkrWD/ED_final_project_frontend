import React, { useState, useEffect } from "react";
import Layout from "../LayOut/Layout";
import { useLocation } from "react-router-dom";
import axios from "axios";
import styles from "../Details/Details.module.css";
import ReactTab from "../Details/ReactTab";
import MenuList from "../Details/MenuList";

function Details() {
  const [details, setDetails] = useState();
  const { search } = useLocation();

  const [selectedImage, setSelectedImage] = useState(null);
  let restId = search.split("=")[1];
  useEffect(() => {
    async function fetchRestId() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/restaurant/restaurants/${restId}`
        );
        setDetails(response.data[0]);
      } catch (error) {
        console.error("Error fetching restaurant details:", error);
      }
    }

    fetchRestId();
  }, [restId]);

  function hangleImageClick(image) {
    setSelectedImage(image);
  }
  return (
    <Layout title={"Details zomato-app"}>
      <div className={`container p-4 ${styles.container}`}>
        {details ? (
          <>
            <div className={styles.imgArea}>
              {!selectedImage ? (
                <img
                  className={styles.restaurantImg}
                  src={details.restaurant_thumb}
                  alt=""
                />
              ) : (
                <img
                  className={styles.restaurantImg}
                  src={selectedImage}
                  alt=""
                />
              )}
            </div>
            <div className={styles.details}>
              <h5 className={`fs-2 ${styles.title}`}>
                {details.restaurant_name}
              </h5>
              <p>
                {" "}
                <strong>
                  300 customers Say it's "{details.rating_text}" &#129395;
                </strong>
              </p>

              <del>Old price: Rs/- {details.cost + 200}</del>
              <p>
                <strong>New Price: Rs/- {details.cost}</strong>
              </p>
              <div className={styles.imageGallery}>
                {details.image_gallery.map((items, index) => (
                  <img
                    className={styles.showImage}
                    onMouseEnter={() => hangleImageClick(items)}
                    key={index}
                    src={items}
                    alt=""
                  />
                ))}
              </div>
              <center>
                <div className="mt-4">
                  <MenuList heading={details} />
                </div>
              </center>
            </div>
          </>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
      <div className="container">
        {details ? <ReactTab items={details} /> : ""}
      </div>
    </Layout>
  );
}

export default Details;
