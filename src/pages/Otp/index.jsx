import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../config";
import { ToastAlert } from "../../../utils/toast";

const Otp = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();
  useEffect(() => {
    if (!state?.email) {
      navigate("/");
    }
  }, []);
  const OTPhandler = async (e) => {
    e.preventDefault();
    try {
      const otpObj = {
        email: state?.email,
        otp,
      };
      const response = await axios.post(`${BASE_URL}/otpverify`, otpObj);
      ToastAlert("successfully Verified", "success");
      navigate("/login");
    } catch (error) {
      console.log(error);
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
        onSubmit={OTPhandler}
        component={"form"}
      >
        <Typography
          variant="h1"
          gutterBottom
          sx={{ color: "#2196f3", fontWeight: "medium", width: "100%" }}
        >
          One Time Password
        </Typography>

        <Box sx={{ padding: "5px" }}>
          <TextField
            label="One Time Password"
            variant="outlined"
            sx={{ width: "400px" }}
            onChange={(e) => {
              setOtp(e.target.value);
            }}
          />
        </Box>
        <Box sx={{ padding: "5px" }}>
          <Button
            variant="contained"
            sx={{ width: "400px", height: "50px" }}
            type="submit"
          >
            Verify
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Otp;
