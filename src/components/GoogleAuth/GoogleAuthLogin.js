import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function GoogleAuthLogin() {
  const navigate = useNavigate();

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse?.credential);
      const name = decoded.name;
      const email = decoded.email;
      const response = await axios.post(
        `${process.env.REACT_APP_API}/createUser/googleAuth/login`,
        {
          name,
          email,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        const token = response.data.token;
        const user = response.data.user;
        localStorage.setItem("authtoken", token);
        localStorage.setItem("user", user.name);
        localStorage.setItem("uniqueId", user.uniqueId);
        sessionStorage.getItem("restaurant")
          ? navigate("/placeOrder")
          : navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error during Google login:", error);

      if (error.response) {
        toast.log("response data", error.response.data);
      }
    }
  };
  return (
    <>
      <GoogleLogin
        onSuccess={handleGoogleLogin}
        onError={() => {
          toast.error("Google Signup Failed");
        }}
      />
    </>
  );
}

export default GoogleAuthLogin;
