import React from "react";
import TopCollections from "./TopCollections";
import Transactions from "./Transactions";
import "./topcolecttion.css";
import CheeckUpdate from "./CheeckUpdate";

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
} from "../../../assets/index";

function Tops() {
  return (
    <div>
      <div className="item three">
        <div className="last">
          <div className="last_inner">
            <div className="lastItem">
              <img src={Cat_Bg}></img>
            </div>
            <div className="lastItem">
              <label className="HeadingMain">
                0u345..67
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
              <img src={Logout}></img>
            </span>
          </div>
        </div>
      </div>
      <TopCollections />
      <Transactions />
      <CheeckUpdate />
    </div>
  );
}

export default Tops;
