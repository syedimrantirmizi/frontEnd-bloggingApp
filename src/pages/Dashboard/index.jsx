import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../config";
import Navbar from "../../components/Navbar";
import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
import ActionAreaCard from "../../components/ActionAreaCard";

const Dashboard = () => {
  const [postData, setPostData] = useState([]);
  const [userData, setUserData] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    gap: "20px",
    p: 4,
  };
  const getPosts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/getposts`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setPostData(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
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
  const createPost = async () => {
    const obj = {
      title,
      desc,
      userID: userData?.data?.data._id,
    };
    try {
      const response = await axios.post(`${BASE_URL}/createpost`, obj, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      getPosts();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };
  console.log(userData);
  useEffect(() => {
    getPosts();
    getUser();
  }, []);

  return (
    <div
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <Navbar />
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Create Post
          </Typography>
          <TextField
            label="Title"
            variant="outlined"
            sx={{ width: "50%" }}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <TextField
            label="Description"
            variant="outlined"
            sx={{ width: "100%" }}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          />
          <Button variant="contained" onClick={createPost}>
            Create Post
          </Button>
        </Box>
      </Modal>
      <Button onClick={handleOpen} variant="outlined" sx={{ mt: "10px" }}>
        Create Post
      </Button>
      <Grid
        container
        marginTop={3}
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        rowGap={3}
      >
        {postData?.map((value, index) => {
          return (
            <ActionAreaCard
              key={index}
              title={value.title}
              desc={value.desc}
              id={value._id}
              postOwner={value.postOwner}
            />
          );
        })}
      </Grid>
    </div>
  );
};

export default Dashboard;
