import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../config";
import Navbar from "../../components/Navbar";
import { Box, Grid, Typography } from "@mui/material";
import ActionAreaCard from "../../components/ActionAreaCard";

const Dashboard = () => {
  const [postData, setPostData] = useState([]);
  const [userData, setUserData] = useState(null);
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
  
  useEffect(() => {
    getPosts();
    getUser();
  }, []);
  return (
    <div>
      <Navbar />

      <Grid
        container
        marginTop= {3}
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        rowGap={3}
      >
        {postData?.map((value, index) => {
          console.log(value);
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
