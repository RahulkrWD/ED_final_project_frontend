import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./profile.module.css";
import EditProfile from "./EditProfile";
import Layout from "../LayOut/Layout";

function Profile() {
  const [profiles, setProfile] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/createUser/profile/${id}`
        );
        setProfile(response.data);
      } catch (err) {
        console.log("Invalid", err);
      }
    }

    fetchProfile();
  }, [id]);

  return (
    <Layout title={"profile zomato-app"}>
      <center className="mt-4">
        <div className={`${styles.profileCard}`}>
          {profiles ? (
            <div>
              <h5>{profiles.name}</h5>
              <div className={`${styles.cardHeader}`}>
                <div className={`${styles.pic}`}>
                  <img className={styles.picImg} src="" alt="" />
                </div>
                <div className="text-white mt-2">{profiles.email}</div>

                {profiles.phone ? (
                  <p className="text-white">
                    <i className={`fa-solid fa-phone m-2`}></i>
                    {profiles.phone}
                  </p>
                ) : null}
              </div>
              <EditProfile />
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </center>
    </Layout>
  );
}

export default Profile;
