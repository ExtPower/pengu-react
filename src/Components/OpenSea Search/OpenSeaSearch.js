import React from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import {
  WalletProfile,
  Tick,
  GameColor,
  Options,
  Measure,
  WalletWhite,
  Nfts,
  Balancee,
  Twiter,
  PercentArrow,
  Game,
  Crypto_punks_square,
  Twitter_Blue,
  Blue_Ship,
  World_pengu,
} from "../../../src/assets/index";
import "./openSearch.css";
import OpeenLeft from "./OpeenLeft";
import OpeenRight from "./OpeenRight";
import { MultilineChart } from "@mui/icons-material";
import Nft from "../Home/DataCenter/Nft";
import ComboChart from "./ComboChart";

function OpenSeaSearch() {
  return (
    <div className="openSeaScreenContainer">
      <div className="search openSearch">
        <TextField
          id="input-with-icon-textfield"
          className="openSearch"
          placeholder="Search OpenSea"
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
      <div className="selectedInfo">
        <div className="profileSected">
          <img className="proffilles" src={Crypto_punks_square}></img>
          <h3>CryptoPunks</h3>
          <img className="tticck" src={Tick}></img>
        </div>
        <div className="ownedItems">
          <div className="ownedflex">
            <div className="inweneedItem innnfle">
              <img src={GameColor}></img>
              <label>Discord</label>
              <img src={Options}></img>
            </div>
            <div className="inweneedItem innnfle">
              <img src={Twitter_Blue}></img>
              <label>Twitter</label>
              <img src={Options}></img>
            </div>
            <div className="inweneedItem innnfle">
              <img src={Blue_Ship}></img>
              <label>OpenSea</label>
              <img src={Options}></img>
            </div>
            <div className="inweneedItem innnfle">
              <img src={World_pengu}></img>
              <label>cryptopunks.com</label>
              <img src={Options}></img>
            </div>
            <div className="measure innnfle">
              <img src={Measure}></img>
            </div>
            <div className="innnfle">
              <div className="wallet innnfle">
                <span className="walletbtn">
                  <img src={WalletWhite}></img>
                  <label>2 Owned Items In Wallet</label>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mainHome seaopeeeen">
        <div className="openSeaLeft">
          <OpeenLeft />
          <ComboChart />
        </div>
        <div className="openSeaRight">
          <OpeenRight />
        </div>
      </div>
    </div>
  );
}

export default OpenSeaSearch;
