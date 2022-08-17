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
} from "../../../src/assets/index";

function OpenAllPrice() {
  return (
    <div>
      <div className="OpeenAll-price">
        <div className="allPrriceFleex">
          <div className="iteemPriceall">
            <div className="twiiterrs status">
              <h4>Floor Price</h4>
              <div className="numbr">
                <img src={Balancee}></img>
                <span className="numberdtail">102</span>
              </div>
              <label className="percntagr">
                <img src={PercentArrow} />
                1.89%
              </label>
            </div>
          </div>
          <div className="iteemPriceall">
            <div className="twiiterrs status">
              <h4>Volume Traded</h4>
              <div className="numbr">
                <img src={Balancee}></img>
                <span className="numberdtail">1000</span>
              </div>
              <label className="percntagr">
                <img src={PercentArrow} />
                1.89%
              </label>
            </div>
          </div>
          <div className="iteemPriceall">
            <div className="twiiterrs status">
              <h4>Owners</h4>
              <div className="numbr">
                <span className="numberdtail">900</span>
              </div>
              <label className="percntagr">
                <img src={PercentArrow} />
                1.89%
              </label>
            </div>
          </div>
          <div className="iteemPriceall">
            <div className="twiiterrs status">
              <h4>Collection Size</h4>
              <div className="numbr">
                <span className="numberdtail">9999</span>
              </div>
              <label className="percntagr">
                <img src={PercentArrow} />
                1.89%
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OpenAllPrice;
