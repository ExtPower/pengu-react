import React, { useState } from "react";
import {
  Balancee,
  Switch,
  Switch2,
  Select_icon,
  Lfarrow,
} from "../../../src/assets/index";
import Tops from "../Home/TopColleections/Tops";
import "./wallet.css";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import WalletCards from "./WalletCards";
import AddWalletModal from "./AddWalletModal";
import Navbar from "../Navbar";

function Wallet() {
  const [showWalletModal, setShowWalletModal] = useState(false);

  return (
    <div className="mainHome">
      <div className="leeftPart wallet">
        <Navbar ComponenNamee="Wallet" />
        <div className="walletMainflex">
          <div className="priceewalleet">
            <p>Net Worth</p>
            <h2>$156,000</h2>
            <span className="flexspan">
              <div className="ins">
                <img src={Balancee}></img>
                <label>
                  23 <span className="checkeedd"> (Balance)</span>
                </label>
              </div>
              <div className="ins">
                <img src={Balancee}></img>
                <label>
                  19 <span className="checkeedd"> (NTFs)</span>
                </label>
              </div>
            </span>
          </div>
          <div className="priceewalleet">
            <div className="classwrap">
              <div className="optionss">
                <label>Value:</label>
                <select>
                  <option>Hight to Low</option>
                  <option>one</option>
                  <option>one</option>
                </select>
              </div>
              <>
                <ClickAwayListener
                  onClickAway={() => setShowWalletModal(false)}
                >
                  <div className="shifftt">
                    {showWalletModal && <AddWalletModal />}
                    <span
                      className="shiftbUtn"
                      onClick={() => setShowWalletModal(!showWalletModal)}
                    >
                      <img src={Lfarrow}></img>
                      <span>Switch wallet</span>
                    </span>
                  </div>
                </ClickAwayListener>
              </>
            </div>
          </div>
        </div>
        <WalletCards />
      </div>
      <div className="rightPart">
        <Tops />
      </div>
    </div>
  );
}

export default Wallet;
