import React from "react";
import {
  Nfts,
  Collection,
  Tcollection,
  CryptoPunks,
  variant,
  Cat,
  TopPeenguu,
  Nft_nobg,
} from "../../../assets/index";
import "./topcolecttion.css";

function TopCollections() {
  return (
    <div>
      <div className="label">Activity</div>
      <h4>Top Collections</h4>
      <div className="collectionsMain top">
        <div className="innerCollection">
          <div className="imges">
            <span>
              <img src={Tcollection}></img>
            </span>
            <span>
              <h5>Bored Ape Yacht Club</h5>
              <span className="welcopmeInfo">#1</span>
            </span>
          </div>
          <div className="imges">
            <img src={Nft_nobg}></img>
          </div>
        </div>
        <div className="innerCollection">
          <div className="imges">
            <span>
              <img src={CryptoPunks}></img>
            </span>
            <span>
              <h5>Bored Ape Yacht Club</h5>
              <span className="welcopmeInfo">#1</span>
            </span>
          </div>
          <div className="imges">
            <img src={Nft_nobg}></img>
          </div>
        </div>
        <div className="innerCollection">
          <div className="imges">
            <span>
              <img src={variant}></img>
            </span>
            <span>
              <h5>Bored Ape Yacht Club</h5>
              <span className="welcopmeInfo">#1</span>
            </span>
          </div>
          <div className="imges">
            <img src={Nft_nobg}></img>
          </div>
        </div>
        <div className="innerCollection">
          <div className="imges">
            <span>
              <img src={Cat}></img>
            </span>
            <span>
              <h5>Bored Ape Yacht Club</h5>
              <span className="welcopmeInfo">#1</span>
            </span>
          </div>
          <div className="imges">
            <img src={Nft_nobg}></img>
          </div>
        </div>
      </div>
      <div className="iimggtop">
        <img src={TopPeenguu}></img>
      </div>
    </div>
  );
}

export default TopCollections;
