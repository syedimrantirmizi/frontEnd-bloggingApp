import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { BASE_URL } from "../../../config";
import { ToastAlert } from "../../../utils/toast";
import { Bounce, toast } from "react-toastify";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  const SignupHandler = async (e) => {
    e.preventDefault();
    try {
      const obj = {
        name,
        email,
        password,
        phoneNumber,
      };
      const response = await axios.post(`${BASE_URL}/signup`, obj);
      console.log(response);
      ToastAlert("Succesfully Signed Up", "success");
      navigate("/otp", { state: { email } });
    } catch (error) {
        const msg = error?.response?.data?.message || error.message ;
      ToastAlert(msg, "error");
    }
  };
  const [passwordShow, setPasswordShow] = useState(false);

  return (
    <Box
      height="100vh"
      width= "100vw"
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
          boxShadow : 3,
          background : "white",
          padding: 15,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        onSubmit={SignupHandler}
        component={"form"}
      >
        <Typography
          variant="h1"
          gutterBottom
          sx={{ color: "#2196f3", fontWeight: "medium",userSelect:"none" }}
        >
          Sign up
        </Typography>

        <Box sx={{ padding: "5px" }}>
          <TextField
            label="Full Name"
            variant="outlined"
            sx={{ width: "400px" }}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </Box>

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

        <Box sx={{ padding: "5px" }}>
          <TextField
            label="Phonenumber"
            variant="outlined"
            sx={{ width: "400px" }}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
          />
        </Box>
        <Box sx={{ padding: "5px", textAlign: "right", width: "390px" }}>
          <Link
            component={RouterLink}
            to="/login"
            sx={{ typography: "button", textAlign: "right", fontSize: "15px" }}
          >
Already have an account?
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

export default Signup;
