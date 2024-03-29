import * as React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Loader } from "../../assets";
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
import "react-toastify/dist/ReactToastify.css";
import DiscordUserPicture from "../../assets/usericon.png";

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
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";

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
    link: "home",
    text: ["Home"],
    after: HomeeWhitee,
  },
  {
    img: View,
    link: "feed",
    text: ["Feed", "createTask", "editTask/"],
    after: FeeedWhite,
  },
  {
    img: Wallet,
    link: "wallet",
    text: ["Wallet"],
    after: WalletTrasn,
  },
  {
    img: Search,
    link: "opensea",
    text: ["OpenSea"],
    after: SearchWhite,
  },
];
var isDev___ = true;
export default function DashBoard() {
  const location = useLocation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [ComponenNamee, setComponenNamee] = React.useState("");
  const userData = useSelector((state) => state.userData);
  function capitalizeFirstLetter(string) {
    if (typeof string != "string") {
      return string;
    }
    var stringCapitalized =
      string?.charAt(0)?.toUpperCase() + string?.slice(1) || null || string;

    return stringCapitalized;
  }

  var isComingsoon =
    ComponenNamee.toLowerCase() == "home" ||
    ComponenNamee.toLowerCase() == "opensea" ||
    ComponenNamee.toLowerCase() == "wallet";
  // const tasksChanges = useSelector((state) => state.tasksChanges);
  useEffect(() => {
    var pageName = location.pathname.slice(1);
    if (pageName && pageName.indexOf("/") != -1) {
      if (pageName.indexOf("editTask") != -1) {
        if (userData.user_id != null) {
          var taskId = pageName.split("/")[1];
          pageName =
            userData.tasks?.filter((e) => e.task_id == taskId)?.[0]?.name || "";
        } else {
          pageName = "Edit Task";
        }
      }
      setComponenNamee(capitalizeFirstLetter(pageName));
    } else if (pageName.toLowerCase() == "createtask") {
      setComponenNamee("Create Task");
    } else {
      setComponenNamee(capitalizeFirstLetter(pageName));
    }
  }, [userData, location]);
  useEffect(() => {
    const socket = io(
      `${isDev___ ? window.location.host : "https://dashboard.penguplatform.com"
      }`
    );
    dispatch({ type: "change-data", name: "socket", value: socket });
    socket.on("connected", (action) => {
      dispatch({
        name: "userData",
        type: "change-data",
        value: action.data.userData,
      });
      dispatch({
        name: "supportedServers",
        type: "change-data",
        value: action.data.supportedServers,
      });

      socket.on("supported-servers-changed", (data) => {
        dispatch({
          name: "supportedServers",
          type: "change-data",
          value: data,
        });
      });
      socket.on("data-monitored", (action) => {
        socket.emit("req-data-monitored", action);
      });

      socket.on("userData-changed", (action) => {
        dispatch({
          name: "userData",
          type: "change-data",
          value: action.data,
        });
      });
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
    <div
      style={
        userData.verified != true
          ? {
            height: "100vh",
            width: "100vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }
          : {}
      }
    >
      {userData.user_id == null ? (
        <img src={Loader} style={{ height: "300px" }} alt="" />
      ) : (
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar
            position="fixed"
            open={open}
            sx={{
              ...(isComingsoon
                ? { filter: "blur(20px)", userSelect: "none" }
                : {}),
            }}
          >
            <Navbar
              open={open}
              handleDrawerOpen={handleDrawerOpen}
              ComponenNamee={ComponenNamee}
            />
          </AppBar>
          {userData.verified && (
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
                  <ListItem
                    key={index}
                    disablePadding
                    sx={{ display: "block" }}
                  >
                    <Link to={`/${item.link}`}>
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
                              (text) =>
                                location.pathname
                                  .toLowerCase()
                                  .indexOf(`/${text.toLowerCase()}`) == 0
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
                                  (text) =>
                                    `/${text.toLowerCase()}` ===
                                    location.pathname.toLowerCase()
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
                <Link to="/Settings">
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
                          location.pathname == `/Settings`
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
                              location.pathname == `/Settings`
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
                          src={
                            userData.discord_avatar.indexOf("null.png") == -1
                              ? userData.discord_avatar
                              : DiscordUserPicture
                          }
                          style={{ borderRadius: "50%" }}
                        ></img>
                      </span>
                      <span className="proffileeOb">
                        <img className="opss" src={GameProfile}></img>
                      </span>
                    </ListItemIcon>
                    <ListItemText
                      primary="Profile"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            </Drawer>
          )}
          {userData.verified && (
            <Box
              component="main"
              sx={{
                ...{
                  flexGrow: 1,
                  p: 3,
                  height: "100vh",
                  paddingTop: 0,
                  paddingRight: 0,
                  paddingBottom: 0,
                  display: "flex",
                  flexDirection: "column",
                  maxWidth: "calc(100% - 65px)",
                },
                ...(isComingsoon
                  ? { filter: "blur(20px)", userSelect: "none" }
                  : {}),
              }}
            >
              {location.pathname !== "/Home" &&
                location.pathname !== "/Wallet" && <DrawerHeader />}
              <div
                className="Main_content"
                style={{
                  height:
                    location.pathname === "/Settings"
                      ? "unset"
                      : location.pathname === "/Home" ||
                        location.pathname === "/Wallet"
                        ? "100%"
                        : "calc(100% - 64px)",
                }}
              >
                <Outlet />
              </div>
            </Box>
          )}
          {userData.verified && isComingsoon && (
            <h1
              style={{
                transform: "translate(-50%, -50%)",
                top: "50%",
                position: "absolute",
                left: "50%",
              }}
            >
              Coming soon
            </h1>
          )}

          {!userData.verified && <h1>You are not verified</h1>}
        </Box>
      )}
      <ToastContainer />
    </div>
  );
}
