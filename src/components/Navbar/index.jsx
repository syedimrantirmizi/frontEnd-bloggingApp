import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const pages = ["Home", "Profile"];
const settings = ["Account", "Dashboard", "Logout"];
function Navbar({ id }) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigator = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1,cursor: "pointer" }} onClick={() => {
              navigator("/dashboard");
            }} />
          <Typography
            variant="h6"
            noWrap
            onClick={() => {
              navigator("/dashboard");
            }}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer"
            }}
          >
            BLOG APP
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => {
                switch (page) {
                  case "Home":
                    return (
                      <MenuItem
                        key={page}
                        onClick={() => {
                          handleCloseNavMenu, navigator("/dashboard");
                        }}
                      >
                        <Typography textAlign="center">{page}</Typography>
                      </MenuItem>
                    );
                    break;
                  case "Profile":
                    return (
                      <MenuItem
                        key={page}
                        onClick={() => {
                          handleCloseNavMenu, navigator(`/profile`);
                        }}
                      >
                        <Typography textAlign="center">{page}</Typography>
                      </MenuItem>
                    );
                    break;

                  default:
                    break;
                }
              })}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1,cursor: "pointer" }} onClick={() => {
              navigator("/dashboard");
            }} />
          <Typography
            variant="h5"
            noWrap
            onClick={() => {
              navigator("/dashboard");
            }}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer"
            }}
          >
            BLOG APP
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => {
              switch (page) {
                case "Home":
                  return (
                    <MenuItem
                      key={page}
                      onClick={() => {
                        handleCloseNavMenu;
                        navigator("/dashboard");
                      }}
                    >
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  );

                case "Profile":
                  return (
                    <MenuItem
                      key={page}
                      onClick={() => {
                        handleCloseNavMenu;
                        navigator(`/profile`);
                      }}
                    >
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  );

                default:
                  break;
              }
            })}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => {
                switch (setting) {
                  case "Account":
                    return (
                      <MenuItem
                        key={setting}
                        onClick={() => {
                          handleCloseUserMenu;
                          navigator("/account");
                        }}
                      >
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    );

                  case "Dashboard":
                    return (
                      <MenuItem
                        key={setting}
                        onClick={() => {
                          handleCloseUserMenu;
                          navigator("/dashboard");
                        }}
                      >
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    );

                  case "Logout":
                    return (
                      <MenuItem
                        key={setting}
                        onClick={() => {
                          handleCloseUserMenu;
                          navigator("/");
                        }}
                      >
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    );

                  default:
                    break;
                }
              })}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
