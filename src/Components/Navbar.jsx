import React from "react";
import { useLocation } from "react-router-dom";

import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

import { Logo, Logout, Switch, Copy_Adress, Cat_Bg } from "../assets/index";
import { useSelector } from "react-redux";

const Navbar = ({ open, handleDrawerOpen, ComponenNamee }) => {
  const location = useLocation();
  const userData = useSelector((state) => state.userData);

  const greeting = (loc) => {
    switch (loc) {
      case "/Wallet":
        return "Monitoring 11 assets";
      case "/setting":
        return "Last change made Yesterday";
      case "/Feed":
      case "/createTask":
        return "Monitoring 24 tasks";
        return "12 Searches in the last day";
      default:
        return "Welcome Back, User";
    }
  };

  return (
    <Toolbar className="navbarToolbar">
      <div
        className="item one"
        style={{ visibility: userData.verified ? "unset" : "hidden" }}
      >
        <label
          className="HeadingMain"
          style={{
            display: "flex",
            flexDirection: "column",
            right:
              ComponenNamee !== "Home" && ComponenNamee !== "Wallet"
                ? 0
                : "24px",
          }}
        >
          {ComponenNamee === "createTask" ? "Feed" : ComponenNamee}
          <br></br>
          <span className="welcopmeInfo">{greeting(location.pathname)}</span>
        </label>
      </div>

      <div
        className="item two"
        style={{ visibility: userData.verified ? "unset" : "hidden" }}
      >
        <div
          className="search"
          style={{
            left:
              location.pathname !== "/Home" && location.pathname !== "/Wallet"
                ? 500
                : "calc(500px - 24px)",
          }}
        >
          <TextField
            id="input-with-icon-textfield"
            placeholder={`Search ${
              location.pathname === "/Wallet" ? "Assets" : "Home"
            }`}
            className="searchInput"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
        </div>
        {/* <div className="buttonss">
            <span className="noti botn">
              <img src={Notification}></img>
            </span>
            <span className="caleender boti">
              <img src={Calender}></img>
            </span>
          </div> */}
      </div>
      {location.pathname !== "/Home" && location.pathname !== "/Wallet" && (
        <div
          className={`item three 
            
            ${
              location.pathname !== "/Home" && location.pathname !== "/Wallet"
                ? "margin"
                : ""
            }
            
            `}
          style={{
            width:
              ComponenNamee !== "Home" && ComponenNamee !== "Wallet"
                ? "calc(30% - 2.5rem)"
                : "100%",
          }}
        >
          <div className="last">
            <div className="last_inner">
              <div className="lastItem">
                <img
                  src={userData.discord_avatar}
                  style={{
                    height: "48px",
                    width: "48px",
                    borderRadius: "50%",
                  }}
                ></img>
              </div>
              <div className="lastItem">
                <label className="HeadingMain">
                  {userData.username}
                  <br></br>
                  <span className="welcopmeInfo">
                    {" "}
                    <a href="#">
                      {" "}
                      <img src={Copy_Adress}></img>
                    </a>
                  </span>
                </label>
              </div>
            </div>
            <div className="lastItem navbarRightButtons">
              <span className="lastItemIteem">
                <img src={Switch}></img>
              </span>
              <span className="lastItemIteem">
                <img
                  src={Logout}
                  onClick={() => window.location.replace("/auth/logout")}
                ></img>
              </span>
            </div>
          </div>
        </div>
      )}
    </Toolbar>
  );
};

export default Navbar;
