import * as React from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Tooltip from "@mui/material/Tooltip";
import Navbar from "../../Components/Navbar";

import {
  Logo,
  Cat,
  Homee,
  Logout,
  Notification,
  Remove,
  Search,
  Settings,
  Switch,
  Transfer,
  View,
  Wallet,
  Profile,
  Profile2,
  Calender,
  HomeeWhitee,
  FeeedWhite,
  WalletTrasn,
  SearchWhite,
  GameProfile,
  SettingsWhite,
  Copy_Adress,
  Cat_Bg,
} from "../../assets/index";
import "../../pages/home/dash.css";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { getGridUtilityClass } from "@mui/material";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { BorderAll } from "@mui/icons-material";
import { io } from "socket.io-client";
import Store from "../../store";
import { useSelector } from "react-redux";
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
const list = [
  {
    img: Homee,
    text: ["Home"],
    after: HomeeWhitee,
  },
  {
    img: View,
    text: ["Feed", "createTask"],
    after: FeeedWhite,
  },
  {
    img: Wallet,
    text: ["Wallet"],
    after: WalletTrasn,
  },
  {
    img: Search,
    text: ["OpenSea"],
    after: SearchWhite,
  },
];
export default function DashBoard() {
  const location = useLocation();

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [ComponenNamee, setComponenNamee] = React.useState("Home");
  const userData = useSelector((state) => state.userData);
  const navigate = useNavigate();
  useEffect(() => {
    setComponenNamee(location.pathname.split("/dashboard/")[1]);
    const socket = io("http://localhost:3000");
    Store.dispatch({ type: "change-data", name: "socket", value: socket });
    socket.on("connected", (data) => {
      socket.on("supported-servers-changed", (data) => {
        Store.dispatch({
          name: "supportedServers",
          type: "change-data",
          value: data,
        });
      });
      socket.on("data_monitored", (action) => {
        socket.emit("get-data");
      });

      socket.on("userData-changed", (data) => {
        Store.dispatch({ name: "userData", type: "change-data", value: data });
      });
      socket.on("task-created", (action) => {
        navigate(`/dashboard/editTask/${action}`);
      });

      socket.emit("get-supported-servers");
      socket.emit("get-data");
    });
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  // const leveel = (index,item) =>{

  // }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {location.pathname !== "/dashboard/Home" &&
        location.pathname !== "/dashboard/Wallet" && (
          <AppBar position="fixed" open={open}>
            <Navbar
              open={open}
              handleDrawerOpen={handleDrawerOpen}
              ComponenNamee={ComponenNamee}
            />
          </AppBar>
        )}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader sx={{ padding: 0, marginRight: 0 }}>
          {/* <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton> */}

          <IconButton
            color="inherit"
            aria-label="open drawer"
            // onClick={handleDrawerOpen}
            edge="start"
            className="LOGOO"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <img src={Logo} />
          </IconButton>
        </DrawerHeader>
        {/* <Divider /> */}
        <List>
          {list.map((item, index) => (
            <ListItem key={index} disablePadding sx={{ display: "block" }}>
              <Link to={`/dashboard/${item.text[0]}`}>
                {/* <Tooltip
                  title={item.text[0]}
                  placement="right-start"
                  componentsProps={{
                    tooltip: {
                      color: "red",
                      sx: {
                        backgroundColor: "#F5F4F6",
                        color: "#A0A1A9",
                        borderRadius: "50px",
                        padding: "10px 20px",
                        fontSize: "14px",
                      },
                    },
                  }}
                > */}
                <Tooltip
                  title={item.text[0]}
                  placement="right"
                  componentsProps={{
                    tooltip: {
                      sx: {
                        backgroundColor: "#F5F4F6",
                        color: "#A0A1A9",
                        borderRadius: "10px",
                        paddingLeft: "12px",
                        paddingRight: "12px",
                        // fontSize: '16px',
                      },
                    },
                  }}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                    className={
                      item.text.some(
                        (text) => `/dashboard/${text}` === location.pathname
                      )
                        ? "backlogg"
                        : ""
                    }
                    onClick={() => {
                      setComponenNamee(item.text[0]);
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={
                          item.text.some(
                            (text) => `/dashboard/${text}` === location.pathname
                          )
                            ? item.after
                            : item.img
                        }
                      ></img>
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text[0]}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </Tooltip>
              </Link>
            </ListItem>
          ))}
        </List>
        {/* <Divider /> */}
        <List>
          <Link to="/dashboard/Settings">
            <ListItem disablePadding sx={{ display: "block" }}>
              <Tooltip
                title="Settings"
                placement="right-start"
                componentsProps={{
                  tooltip: {
                    sx: {
                      backgroundColor: "#F5F4F6",
                      color: "#A0A1A9",
                      borderRadius: "10px",
                      // padding: '10px 20px',
                      // fontSize: '16px',
                    },
                  },
                }}
              >
                <ListItemButton
                  className={
                    location.pathname == `/dashboard/Settings`
                      ? "backlogg"
                      : "seeetingss"
                  }
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  onClick={() => {
                    setComponenNamee("Settings");
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={
                        location.pathname == `/dashboard/Settings`
                          ? SettingsWhite
                          : Settings
                      }
                    ></img>
                  </ListItemIcon>
                  <ListItemText
                    primary="Settings"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </Tooltip>
            </ListItem>
          </Link>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <span className="proffillee">
                  {" "}
                  <img
                    src={userData.discord_avatar}
                    style={{ borderRadius: "50%" }}
                  ></img>
                </span>
                <span className="proffileeOb">
                  <img className="opss" src={GameProfile}></img>
                </span>
              </ListItemIcon>
              <ListItemText primary="Profile" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          height: "100vh",
          paddingTop: 0,
          paddingRight: 0,
          paddingBottom: 0,
          display: "flex",
          flexDirection: "column",
          maxWidth: "calc(100% - 65px)",
        }}
      >
        {location.pathname !== "/dashboard/Home" &&
          location.pathname !== "/dashboard/Wallet" && <DrawerHeader />}
        <div
          className="Main_content"
          style={{
            height:
              location.pathname === "/dashboard/Settings"
                ? "unset"
                : location.pathname === "/dashboard/Home" ||
                  location.pathname === "/dashboard/Wallet"
                ? "100%"
                : "calc(100% - 64px)",
          }}
        >
          <Outlet />
        </div>
      </Box>
    </Box>
  );
}
