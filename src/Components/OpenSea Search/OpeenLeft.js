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
  Profile,
  PercentArrow,
  Game,
} from "../../../src/assets/index";
import OpenNewList from "./OpenNewList";
import OpenSales from "./OpenSales";

function OpeenLeft() {
  return (
    <div>
      <div className="listingCrypto">
        <div className="cryptosList">
          <div className="leeftnewList">
            <div className="fffluuu zyda">
              <OpenNewList />
            </div>
            <div className="fffluuu ">
              <OpenSales />
            </div>
          </div>
          <div className="rightsaleList">
            <div className="statussOpen">
              <div className="twiiterrs  status twitter_">
                <h4>Twitter</h4>
                <div className="numbr">
                  <img src={Twiter}></img>
                  <span className="numberdtail">200k</span>
                </div>
                <label className="percntagr">
                  <img src={PercentArrow} />
                  1.89%
                </label>
              </div>
              <div className="disccordd status">
                <h4>Discord</h4>
                <div className="numbr">
                  <img src={Profile}></img>
                  <span className="numberdtail">100k</span>
                </div>
                <label className="percntagr discord">20k Online</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OpeenLeft;
