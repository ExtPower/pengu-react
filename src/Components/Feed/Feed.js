import React from "react";
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
  ClearAll,
  EyeWhite,
  NtfsBack,
} from "../../../src/assets/index";
import "./feed.css";
import FeedTable from "./FeedTable";
import FeedTopbar from "./FeedTopbar";
import Testtable from "./Testtable";

function Feed() {
  return (
    <div className="feed-container">
      <FeedTopbar />
      <Testtable />
    </div>
  );
}

export default Feed;
