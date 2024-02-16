import React from "react";
import styles from "./stylesheet/NavBar.module.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function NavBar() {
  const user = localStorage.getItem("user");
  const uniqueId = localStorage.getItem("uniqueId");

  function handleLogout() {
    localStorage.removeItem("authtoken");
    localStorage.removeItem("user");
    toast.success("Logout Successfull");
  }

  return (
    <nav
      className={`nav d-flex justify-content-around p-3 bg-dark ${styles.nav}`}
    >
      <div className="title-name d-flex">
        <Link to={"/"} className={`m-2 ${styles.title}`}>
          Zomato App
        </Link>
      </div>
      <div>
        {user ? (
          <>
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-primary fw-bold dropdown-toggle p-2 m-2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Hi, {user.split(" ")[0]}
              </button>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to={`/profile/${uniqueId}`}>
                    Profile
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to={"/MyOrder"}>
                    My Order
                  </Link>
                </li>
              </ul>
            </div>

            <Link
              to={"/login"}
              onClick={handleLogout}
              className={`${styles.logOutBtn} m-2 btn text-white`}
            >
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link
              to={"/login"}
              className={`${styles.loginBtn} m-1 btn bg-warning `}
            >
              Login
            </Link>
            <Link
              to={"/signup"}
              className={` m-1 btn text-white ${styles.signupBtn}`}
            >
              Create an account
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
