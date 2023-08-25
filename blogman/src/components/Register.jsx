/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { MyContext } from "../context/StateContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Form from "react-bootstrap/Form";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const Register = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [status, setStatus] = useState(false);
  const { user, setUser, isAuth } = useContext(MyContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus((prev) => !prev);

    setUser(() => ({
      name: name,
      email: email,
    }));

    try {
      const response = await fetch("http://localhost:3000/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: firstname + lastname,
          email: email,
          password: pass,
        }),
      });

      const data = await response.json();

      if (data.status === 409) {
        toast.error("User already exists. Please login", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.success(`Welcome ${name}`, {
          position: toast.POSITION.TOP_CENTER,
        });
        localStorage.setItem("token", data.token);
        localStorage.setItem("isAuth", true);
        window.location.reload();
      }

      setEmail("");
      setFirstName("");
      setLastName("");
      setPass("");
    } catch (error) {
      toast.error("Some error happened", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
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
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handlePassChange = (e) => {
    setPass(e.target.value);
  };

  if (isAuth) {
    return <Navigate replace to="/allposts" />;
  } else {
    // ...
    return (
      <>
        <Container component="main" maxWidth="xs">
          <ToastContainer />
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
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    onChange={handleFirstNameChange}
                    value={firstname}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    onChange={handleLastNameChange}
                    value={lastname}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={handleEmailChange}
                    value={email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={handlePassChange}
                    value={pass}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <a href="/login" className="form-link">
                    Login here
                  </a>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </>
    );
  }
};

export default Register;
