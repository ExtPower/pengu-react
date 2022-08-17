import React from "react";
import {
  Balancee,
  BitIcon,
  Option,
  Detail1,
  SpinerIcon,
} from "../../../assets/index";
import AddBalance from "./AddBalance";

function Balance() {
  return (
    <>
      <div>
        {" "}
        <div className="balanceee">
          <div className="balanceeeItem">
            <div className="mainBalancee">
              <h3>Balance</h3>
              <div className="innerBalancee">
                <span className="baaalImg">
                  <img src={Balancee}></img>
                </span>
                <span>
                  <h2 className="balanceeH2">13.2</h2>
                </span>
                <span className="btnValue">+5%</span>
              </div>
            </div>
          </div>
          <div className="balanceeeItem">
            <div className="cardds">
              <div className="logText">
                <img src={BitIcon}></img>
                <span className="logTextNumber">0.8</span>
              </div>
              <div className="logText logextra">
                <span>
                  View details
                  <p>...</p>
                </span>
              </div>
            </div>
          </div>
          <div className="balanceeeItem">
            <div className="cardds">
              <div className="logText">
                <img src={Detail1}></img>
                <span className="logTextNumber">35</span>
              </div>
              <div className="logText logextra">
                <span>
                  View details <p>...</p>
                </span>
              </div>
            </div>{" "}
          </div>
          <div className="balanceeeItem">
            <div className="cardds">
              <div className="logText">
                <img src={SpinerIcon}></img>
                <span className="logTextNumber">35</span>
              </div>
              <div className="logText logextra">
                <span>
                  View details <p>...</p>
                </span>
              </div>
            </div>{" "}
          </div>
        </div>
      </div>
      <AddBalance />
    </>
  );
}

export default Balance;
