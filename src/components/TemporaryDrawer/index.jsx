import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Menu } from "@mui/icons-material";

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer =
    (newOpen = Boolean) =>
    () => {
      setOpen(newOpen);
    };

  const DrawerList = (
    <Box
      sx={{ width: 250, paddingTop: 5 }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <Divider />
      <List>
        {["Profile Details", "Setting"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <Box sx={{ display: "flex", justifyContent: "start" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          height: 50,
        }}
      >
        <Button
          onClick={toggleDrawer(true)}
          sx={{ bgcolor: "#e1f5fe", borderRadius: 3, display: "flex", gap: 1 }}
        >
          <Menu sx={{ width: 24, height: 24 }} /> Account Menu
        </Button>
      </Box>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </Box>
  );
}
