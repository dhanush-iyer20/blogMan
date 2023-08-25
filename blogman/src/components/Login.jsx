/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useContext, useState } from "react";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import { MyContext } from "../context/StateContext";
import { ToastContainer, toast } from "react-toastify";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [status, setStatus] = useState(false);
  const { user, setUser, isAuth } = useContext(MyContext);
  function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }
  const handleSubmit = async (e) => {
    setStatus((prev) => {
      return !prev;
    });
    e.preventDefault();
    setUser(() => ({
      email: email,
    }));
    try {
      // Send a POST request to the server

      const response = await fetch("http://localhost:3000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: pass,
        }),
      });
      const data = await response.json();
      if (data.error === "Invalid credentials") {
        toast.error("Invalid credentials", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.success(`Welcome back`, {
          position: toast.POSITION.TOP_CENTER,
        });
        localStorage.setItem("token", data.token);
        localStorage.setItem("isAuth", true);
        window.location.reload();
      }
      setEmail("");
      setPass("");
    } catch (error) {
      toast.error("Some error happened", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value); // Update the email state when input value changes
  };
  const handlePassChange = (e) => {
    setPass(e.target.value); // Update the email state when input value changes
  };
  if (isAuth) {
    return <Navigate replace to="/allposts" />;
  } else {
    return (
      <>
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
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleEmailChange}
                value={email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handlePassChange}
                value={pass}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  Don't have an account? <a href="/register">Register here</a>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </>
    );
  }
};

export default Login;
