import React from "react";
import { Logout_gray, Switch } from "../../assets";
import {
  WalletProfile,
  ClearAll,
  EyeWhite,
  NtfsBack,
  WalletProfile2,
  Twitterbg,
  Profileblack,
  Scenebg,
} from "../../../src/assets/index";
import "./settings.css";
import { styled } from "@mui/material/styles";
import MuiSwitch from "@mui/material/Switch";
import CheckUpdates from "../Home/TopColleections/CheeckUpdate";

const Toggle = styled((props) => (
  <MuiSwitch
    focusVisibleClassName=".Mui-focusVisible"
    disableRipple
    {...props}
  />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    color: "#7a65fb",

    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#f5f4f6 !important",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#7a65fb" : "#7a65fb",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#7a65fb",
      border: "6px solid #7a65fb",
    },

    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#f5f4f6" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

function Settings() {
  return (
    <div>
      <div className="mainSettings">
        <h5>Twitter</h5>
        <div className="flexSettings">
          <div className="taskItem">
            <img src={WalletProfile2}></img>
            <span className="backkintel">
              <img src={Twitterbg} />
            </span>
            <label>bffopens</label>
          </div>
          <div className="settingsbtn">
            <button>
              <img src={Switch}></img>
            </button>
            <button>
              <img src={Logout_gray}></img>
            </button>
          </div>
        </div>
        <h5>Discord</h5>
        <div className="flexSettings">
          <div className="taskItem">
            <img src={Profileblack}></img>
            <span className="backkintel">
              <img src={Scenebg} />
            </span>
            <label>bffopens</label>
          </div>
          <div className="settingsbtn">
            <button>
              <img src={Switch}></img>
            </button>
            <button>
              <img src={Logout_gray}></img>
            </button>
          </div>
        </div>
        <h5>Discord Webhook</h5>
        <div className="settingsbuttons">
          <input
            type="text"
            className="search-settings"
            placeholder="https://discord.com/api/webhooks/96.."
          ></input>
          <button className="sendMessage">Send Test Message</button>
        </div>
        <h5>Webhook Toggle</h5>
        <div className="togglee">
          <Toggle />
          {/* <ToggleSwitch label="webhook" /> */}
        </div>
        <h5>Dark Mode</h5>
        <div className="togglee">
          <Toggle />
        </div>
      </div>
      <div className="settings-check-updates">
        <CheckUpdates />
      </div>
    </div>
  );
}

export default Settings;
