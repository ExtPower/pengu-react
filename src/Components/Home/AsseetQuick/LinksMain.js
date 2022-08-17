import React from "react";
import { Link } from "react-router-dom";
import "./linkss.css";
import {
  AssetIImg,
  AssetIImg2,
  Quickss,
  Twitter,
  Etherscan,
  Coinbase,
  Kucoin,
  Add,
  Delete,
  View,
  Add_icon,
} from "../../../assets/index";

function LinksMain() {
  return (
    <div>
      <div className="linksMain">
        <div className="asseets">
          <h4>Assets</h4>
          <div className="mainassets">
            <div className="assetsFade"></div>
            <div className="assetsPositioner">
              <div className="assetfleex">
                <span>
                  <img src={AssetIImg} className="assetImage"></img>
                </span>

                <span className="iteeems">
                  <h4>#57</h4>
                  <span className="detail">
                    <img src={View} /> <label>Detail</label>
                  </span>{" "}
                </span>
                <span>
                  <h5>Collection</h5>
                  <label>Bored Ape Yacht Club</label>
                </span>
                {/* <span className="iteeems">
                <h5>Cost</h5>
                <label>4ETH</label>
              </span> */}
                <span className="iteeems">
                  <h5>Floor</h5>
                  <label>8ETH</label>
                </span>
              </div>
              <div className="assetfleex">
                <span>
                  <img src={AssetIImg} className="assetImage"></img>
                </span>

                <span className="iteeems">
                  <h4>#57</h4>
                  <span className="detail">
                    <img src={View} /> <label>Detail</label>
                  </span>{" "}
                </span>
                <span>
                  <h5>Collection</h5>
                  <label>Bored Ape Yacht Club</label>
                </span>
                {/* <span className="iteeems">
                <h5>Cost</h5>
                <label>4ETH</label>
              </span> */}
                <span className="iteeems">
                  <h5>Floor</h5>
                  <label>8ETH</label>
                </span>
              </div>
              <div className="assetfleex">
                <span>
                  <img src={AssetIImg} className="assetImage"></img>
                </span>

                <span className="iteeems">
                  <h4>#57</h4>
                  <span className="detail">
                    <img src={View} /> <label>Detail</label>
                  </span>
                </span>
                <span>
                  <h5>Collection</h5>
                  <label>Bored Ape Yacht Club</label>
                </span>
                {/* <span className="iteeems">
                <h5>Cost</h5>
                <label>4ETH</label>
              </span> */}
                <span className="iteeems">
                  <h5>Floor</h5>
                  <label>8ETH</label>
                </span>
              </div>
              <div className="assetfleex">
                <span>
                  <img src={AssetIImg} className="assetImage"></img>
                </span>

                <span className="iteeems">
                  <h4>#57</h4>
                  <span className="detail">
                    <img src={View} /> <label>Detail</label>
                  </span>{" "}
                </span>
                <span>
                  <h5>Collection</h5>
                  <label>Bored Ape Yacht Club</label>
                </span>
                {/* <span className="iteeems">
                <h5>Cost</h5>
                <label>4ETH</label>
              </span> */}
                <span className="iteeems">
                  <h5>Floor</h5>
                  <label>8ETH</label>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="quickLinks">
          <h4>Quick links</h4>
          <div className="mainauicks">
            <div className="auicklionkss">
              <a href="#">
                <img src={Quickss}></img>
              </a>
              <a href="#">
                {" "}
                <h4>OpenSea</h4>{" "}
              </a>
            </div>

            <div className="auicklionkss">
              <a href="#">
                <img src={Twitter}></img>
              </a>
              <a href="#">
                <h4>Twitter</h4>{" "}
              </a>
            </div>
            <div className="auicklionkss">
              <a href="#">
                <img src={Etherscan}></img>
              </a>
              <a href="#">
                <h4>Etherscan</h4>
              </a>
            </div>
            <div className="auicklionkss">
              <a href="#">
                <img src={Coinbase}></img>
              </a>
              <a href="#">
                <h4>Coinbase</h4>
              </a>
            </div>
            <div className="auicklionkss">
              <a href="#">
                <img src={Kucoin}></img>
              </a>
              <a href="#">
                <h4>Kucoin</h4>
              </a>
            </div>
          </div>
          <div className="auicklionkss bttnss">
            <span>
              <img src={Add_icon}></img>
            </span>
            <span className="del_icon">
              <img src={Delete}></img>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LinksMain;
