import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { BASE_URL } from "../../../config";
import { ToastAlert } from "../../../utils/toast";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShow, setPasswordShow] = useState(false);
  const navigate = useNavigate();

  const Loginhandler = async (e) => {
    e.preventDefault();
    try {
      const obj = {
        email,
        password,
      };
      const response = await axios.post(`${BASE_URL}/login`, obj);
      ToastAlert("Logged in", "success");
      console.log(response);
      localStorage.setItem("token", response?.data?.token);
      navigate("/dashboard");
    } catch (error) {
      const msg = error?.response?.data?.message || error.message;
      ToastAlert(msg, "error");
    }
  };
  return (
    <Box
      height="100vh"
      width="100vw"
      sx={{
        background: "#2196f3",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          border: 1,
          borderColor: "lightgray",
          boxShadow: 3,
          background: "white",
          padding: 15,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        onSubmit={Loginhandler}
        component={"form"}
      >
        <Typography
          variant="h1"
          gutterBottom
          sx={{ color: "#2196f3", fontWeight: "medium", userSelect: "none" }}
        >
          Log in
        </Typography>

        <Box sx={{ padding: "5px" }}>
          <TextField
            label="Email"
            variant="outlined"
            sx={{ width: "400px" }}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Box>
        <Box sx={{ padding: "5px" }}>
          <TextField
            type={passwordShow ? "text" : "password"}
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ width: "400px" }}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  sx={{ cursor: "pointer" }}
                  onClick={() => setPasswordShow(!passwordShow)}
                >
                  {!passwordShow ? <VisibilityOff /> : <Visibility />}
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box sx={{ padding: "5px", textAlign: "right", width: "390px" }}>
          <Link
            component={RouterLink}
            to="/"
            sx={{ typography: "button", textAlign: "right", fontSize: "15px" }}
          >
            Dont have an account?
          </Link>
        </Box>

        <Box sx={{ padding: "5px" }}>
          <Button
            variant="contained"
            sx={{ width: "400px", height: "50px" }}
            type="submit"
          >
            Signup
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
