import React from "react";
import {
  Balancee,
  Add,
  Delete,
  BitIcon,
  Detail1,
  SpinerIcon,
  Bnb,
  Add_icon,
} from "../../../assets/index";

function AddBalance() {
  const prectagees = {
    low: +10,
    mediium: +5,
    high: -2,
    lowest: -1,
  };

  return (
    <div className="mainEntry">
      <div className="eentrryBalnce">
        <div className="eentryName">
          <img src={Balancee}></img>
          <span className="namessChange">ETH</span>
        </div>
        <div className="eentryName">
          <span className="prectagee low">{prectagees.low}%</span>
        </div>
      </div>
      <div className="eentrryBalnce">
        <div className="eentryName">
          <img src={BitIcon}></img>
          <span className="namessChange">BTC</span>
        </div>
        <div className="eentryName">
          <span className="prectagee ok">+{prectagees.mediium}%</span>
        </div>
      </div>
      <div className="eentrryBalnce">
        <div className="eentryName">
          <img src={Detail1}></img>
          <span className="namessChange">SOL</span>
        </div>
        <div className="eentryName">
          <span className="prectagee ok okcol">{prectagees.high}%</span>
        </div>
      </div>
      <div className="eentrryBalnce">
        <div className="eentryName">
          <img src={SpinerIcon}></img>
          <span className="namessChange">DOT</span>
        </div>
        <div className="eentryName">
          <span className="prectagee low">{prectagees.lowest}%</span>
        </div>
      </div>
      <div className="eentrryBalnce">
        <div className="eentryName">
          <img src={Bnb}></img>
          <span className="namessChange">BNB</span>
        </div>
        <div className="eentryName">
          <span className="prectagee low bnbs">{prectagees.lowest}%</span>
        </div>
      </div>
      <div className="eentrryBalnce bttunsEntrey">
        <span className="addBalncee">
          <img src={Add_icon}></img>
        </span>
        <span className="removeBalncee">
          <img src={Delete}></img>
        </span>
      </div>
    </div>
  );
}

export default AddBalance;
