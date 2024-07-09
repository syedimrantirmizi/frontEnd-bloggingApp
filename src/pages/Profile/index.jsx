import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { BASE_URL } from "../../../config";
import { Grid } from "@mui/material";
import ActionAreaCard from "../../components/ActionAreaCard";

const Profile = () => {
  const [postData, setPostData] = useState([]);
  const [userData, setUserData] = useState({});
  const [userID, setUserID] = useState(null);
  const getPosts = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/getspecificpost/${id}`, {
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
      setUserID(response?.data?.data._id);
    } catch (error) {
      console.log(error);
    }
  };
  const deletePost = async (id) => {
    try {
      const obj = {
        userID: userID,
      };
      const response = await axios.post(`${BASE_URL}/deletepost/${id}`, obj, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      getPosts(userID);
    } catch (error) {
      console.log(error);
    }
  };
  const updatePost = async (title, desc, id) => {
    const obj = {
      title,
      desc,
      userID,
    };
    try {
      const response = await axios.put(`${BASE_URL}/updatepost/${id}`, obj, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response);
      getPosts(userID);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
    getPosts(userID);
  }, [userID]);
  return (
    <div>
      <Navbar />
      <Grid
        container
        marginTop={3}
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        rowGap={3}
      >
        {postData?.map((value, index) => {
          const buttons = userData?._id == value.postOwner ? true : false;
          return (
            <ActionAreaCard
              key={index}
              title={value.title}
              desc={value.desc}
              id={value._id}
              postOwner={value.postOwner}
              buttons={buttons}
              deletePost={deletePost}
              updatePost={updatePost}
            />
          );
        })}
      </Grid>
    </div>
  );
};

export default Profile;
