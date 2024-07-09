import * as React from "react";
import Navbar from "../../components/Navbar";
import TemporaryDrawer from "../../components/TemporaryDrawer";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Typography,
  TextField,
  AccordionActions,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { ExpandMore, Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { BASE_URL } from "../../../config";
import { ToastAlert } from "../../../utils/toast";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const [showOldPassword, setShowOldPassword] = React.useState(false);
  const handleClickShowOldPassword = () => setShowOldPassword(!showOldPassword);
  const handleMouseDownOldPassword = () => setShowOldPassword(!showOldPassword);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const handleClickShowNewPassword = () => setShowNewPassword(!showNewPassword);
  const handleMouseDownNewPassword = () => setShowNewPassword(!showNewPassword);
  const [userData, setUserData] = React.useState(null);
  const [name, setName] = React.useState(null);
  const [oldPassword, setOldPassword] = React.useState(null);
  const [newPassword, setNewPassword] = React.useState(null);
  const navigate = useNavigate();
  const getUser = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/getuser`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUserData(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    getUser();
  }, []);
  const DeleteAccount = async () => {
    try {
      const response = await axios.delete(`${BASE_URL}/deleteaccount`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      localStorage.removeItem("token");
      navigate("/login");
      ToastAlert("Account Deleted", "success");
    } catch (error) {
      console.log(error);
      const msg = error?.response?.data?.message || error.message;
      ToastAlert(msg, "error");
    }
  };
  const changeUserName = async (name) => {
    const obj = { name };
    try {
      const response = await axios.put(`${BASE_URL}/updatename`, obj, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      getUser();
      ToastAlert("Password Changed", "success");

      console.log(response);
    } catch (error) {
      console.log(error);
      const msg = error?.response?.data?.message || error.message;
      ToastAlert(msg, "error");
    }
  };
  const changePassword = async (oldpw, newpw) => {
    const obj = { oldpw, newpw };
    try {
      const response = await axios.put(`${BASE_URL}/updatepassword`, obj, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      getUser();
      ToastAlert("Password Changed", "success");

      console.log(response);
    } catch (error) {
      console.log(error);
      const msg = error?.response?.data?.message || error.message;
      ToastAlert(msg, "error");
    }
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          paddingTop: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "90%",
            justifyContent: "space-between",
            height: "100vh",
            gap: 1,
          }}
        >
          <TemporaryDrawer />
          <Divider orientation="vertical" />
          <Box
            sx={{
              width: "80%",
              display: "flex",
              flexDirection: "column",
              alignContent: "start",
            }}
          >
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography variant="h6">NAME</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{ display: "flex", flexDirection: "column", gap: 3 }}
              >
                <Typography variant="body2">
                  Current Name : <b>{userData?.name}</b>
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  Change Name :{" "}
                  <TextField
                    size="small"
                    label="Filled"
                    defaultValue={userData?.name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </Typography>
                <AccordionActions>
                  <Button
                    onClick={() => {
                      changeUserName(name);
                    }}
                  >
                    Agree
                  </Button>
                </AccordionActions>
              </AccordionDetails>
            </Accordion>
            <Accordion sx={{ marginTop: 2 }}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography variant="h6">PASSWORD</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{ display: "flex", flexDirection: "column", gap: 3 }}
              >
                <Typography
                  variant="body2"
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  Old password :
                  <TextField
                    label="Filled"
                    type={showOldPassword ? "text" : "password"}
                    onChange={(e) => {
                      setOldPassword(e.target.value);
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment>
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowOldPassword}
                            onMouseDown={handleMouseDownOldPassword}
                          >
                            {showOldPassword ? (
                              <Visibility sx={{ width: 24, height: 24 }} />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  Change password :
                  <TextField
                    label="Filled"
                    type={showNewPassword ? "text" : "password"}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment>
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowNewPassword}
                            onMouseDown={handleMouseDownNewPassword}
                          >
                            {showNewPassword ? (
                              <Visibility sx={{ width: 24, height: 24 }} />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Typography>
                <AccordionActions>
                  <Button
                    onClick={() => {
                      changePassword(oldPassword, newPassword);
                    }}
                  >
                    Change Password
                  </Button>
                </AccordionActions>
              </AccordionDetails>
            </Accordion>
            <Accordion sx={{ marginTop: 2 }}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography variant="h6">DELETE ACCOUNT</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{ display: "flex", flexDirection: "column", gap: 3 }}
              >
                <Typography variant="body1">
                  Are you sure you want to delete account ?
                </Typography>
                <AccordionActions>
                  <Button
                  variant="text"
                  color= "error"
                    onClick={() => {
                      DeleteAccount();
                    }}
                  >
                    Delete Account
                  </Button>
                </AccordionActions>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Account;
