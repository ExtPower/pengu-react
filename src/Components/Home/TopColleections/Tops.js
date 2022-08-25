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
  Add,
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

      <div className="item three" style={{ height: "60px" }}>
        <div className="last">
          <div className="last_inner">
            <div
              className="lastItem"
              style={{ display: "flex", alignItems: "center" }}
            >
              <label className="HeadingMain">Add Pengubot to your server</label>
            </div>
          </div>
          <a href="" className="lastItem navbarRightButtons">
            <span className="lastItemIteem">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-return-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1.5 1.5A.5.5 0 0 0 1 2v4.8a2.5 2.5 0 0 0 2.5 2.5h9.793l-3.347 3.346a.5.5 0 0 0 .708.708l4.2-4.2a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 8.3H3.5A1.5 1.5 0 0 1 2 6.8V2a.5.5 0 0 0-.5-.5z" />
              </svg>
            </span>
          </a>
        </div>
      </div>
      <TopCollections />
      <Transactions />
      <CheeckUpdate />
    </div>
  );
}

export default Tops;
