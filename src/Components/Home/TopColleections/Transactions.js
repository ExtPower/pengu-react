import React from "react";
import {
  Balancee,
  Collection,
  Pengu,
  Cat_long,
  CatBg,
} from "../../../assets/index";

function Transactions() {
  return (
    <div className="recent_main">
      <h4>Recent Transactions</h4>
      <div className="collectionsMain">
        <div className="innerCollection">
          <div className="imges">
            <span>
              <img src={CatBg}></img>
            </span>
            <span>
              <h5>Outgoing</h5>
              <span className="welcopmeInfo">To 0i2345..67 </span>
            </span>
          </div>
          <div className="imges">
            <img src={Balancee}></img>
            <span className="welcopmeInfo change">-0.14</span>
          </div>
        </div>
        <div className="innerCollection">
          <div className="imges">
            <span>
              <img src={CatBg}></img>
            </span>
            <span>
              <h5>Outgoing</h5>
              <span className="welcopmeInfo">To 0i2345..67 </span>
            </span>
          </div>
          <div className="imges">
            <img src={Balancee}></img>
            <span className="welcopmeInfo change">-0.14</span>
          </div>
        </div>
        <div className="innerCollection">
          <div className="imges">
            <span>
              <img src={CatBg}></img>
            </span>
            <span>
              <h5>Outgoing</h5>
              <span className="welcopmeInfo">To 0i2345..67 </span>
            </span>
          </div>
          <div className="imges">
            <img src={Balancee}></img>
            <span className="welcopmeInfo change">-0.14</span>
          </div>
        </div>
        <div className="innerCollection">
          <div className="imges">
            <span>
              <img src={CatBg}></img>
            </span>
            <span>
              <h5>Outgoing</h5>
              <span className="welcopmeInfo">To 0i2345..67 </span>
            </span>
          </div>
          <div className="imges">
            <img src={Balancee}></img>
            <span className="welcopmeInfo change">-0.14</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transactions;
