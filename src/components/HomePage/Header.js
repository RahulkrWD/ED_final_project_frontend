import React from "react";
import styles from "../HomePage/Header.module.css";
import Search from "../HomePage/Search";
import NavBar from "../LayOut/NavBar";

function Header() {
  return (
    <>
      <header className={styles.bgImg}>
        <NavBar />
        <center className={styles.container}>
          <div className="web-site logo">
            <h1 className={styles.titleLogo}>e!</h1>
          </div>
          <h1 className={`text-white m-2 p-2`}>
            Find the best Restaurants, cafes, and bars
          </h1>
          <Search />
        </center>
      </header>
    </>
  );
}

export default Header;
