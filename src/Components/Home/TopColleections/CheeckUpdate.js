import React from "react";
import {
  Recheeck,
  Game,
  Profile,
  DiscordWhite,
  Checkico,
  Scenewhite,
} from "../../../assets/index";
import { Button } from "@mui/material";

function CheeckUpdate() {
  return (
    <div>
      <div className="updateFFleex">
        <div className="versionContainer">
          <span className="veresion">v3.4</span>
        </div>
        <buttton className="uupdatebtn">
          <img src={Recheeck}></img>
          <img src={Checkico}></img>
          Check for updates
        </buttton>{" "}
        <a href="#" className="discord-button">
          <img src={Profile}></img>
          <img src={Scenewhite}></img>
        </a>
      </div>
    </div>
  );
}

export default CheeckUpdate;
