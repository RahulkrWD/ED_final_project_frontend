import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import GoogleAuthLogin from "./GoogleAuth/GoogleAuthLogin";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { toast } from "react-toastify";
import Layout from "./LayOut/Layout";

const defaultTheme = createTheme();

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/createUser/login`,
        {
          email,
          password,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        const token = response.data.token;
        localStorage.setItem("authtoken", token);
        const user = response.data.user;
        //  console.log(user);
        localStorage.setItem("user", user.name);
        localStorage.setItem("uniqueId", user.uniqueId);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"Login zomato-app"}>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value.toLowerCase())}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value.toLowerCase())}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleLogin}
              >
                Login
              </Button>
              <center>
                <GoogleOAuthProvider clientId="943812210495-8b302cofk4i6pqhmof6tt6b9gc4bs1vn.apps.googleusercontent.com">
                  <GoogleAuthLogin />
                </GoogleOAuthProvider>
                <br />

                <p>
                  New user, create an account
                  <Link to={"/signup"}>SignUp</Link>
                </p>
              </center>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </Layout>
  );
}
