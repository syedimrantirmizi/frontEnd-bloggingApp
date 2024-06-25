import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, CardActionArea, Modal, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { BASE_URL } from "../../../config";
import { useState } from "react";

export default function ActionAreaCard({
  title,
  desc,
  id,
  postOwner,
  buttons = null,
  deletePost,updatePost
}) {
  const [newTitle, setnewTitle] = useState(null);
  const [newDesc, setnewDesc] = useState(null);
  const [open, setOpen] = useState(false);
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

  return (
    <Card sx={{ minWidth: 345 }} id={id} postowner={postOwner}>
      <CardActionArea sx={{ p: "10px" }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {desc}
          </Typography>
        </CardContent>
        {buttons ? (
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="outlined"
              onClick={() => {
                deletePost(id);
              }}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
            <Button
              variant="outlined"
              onClick={handleOpen}
              startIcon={<EditIcon />}
            >
              Edit
            </Button>
            <Modal open={open} onClose={handleClose}>
              <Box sx={style}>
                <Typography variant="h6" component="h2">
                  Edit Post
                </Typography>
                <TextField
                  label="Title"
                  variant="outlined"
                  sx={{ width: "50%" }}
                  defaultValue={title}
                  onChange={(e) => {
                    setnewTitle(e.target.value);
                  }}
                />
                <TextField
                  label="Description"
                  variant="outlined"
                  sx={{ width: "100%" }}
                  defaultValue={desc}
                  onChange={(e) => {
                    setnewDesc(e.target.value);
                  }}
                />
                <Button variant="contained" onClick={()=>{updatePost(newTitle,newDesc,id)}}>Edit Post</Button>
              </Box>
            </Modal>
          </Box>
        ) : null}
      </CardActionArea>
    </Card>
  );
}
