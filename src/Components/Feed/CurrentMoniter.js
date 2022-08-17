import React from "react";
import {
  Ellipse,
  Twiter,
  CurrentTask,
  Discord_gray,
  Opensea_grey,
} from "../../assets";
import MonitoringItem from "./MonitoringItem";

function CurrentMoniter() {
  return (
    <div>
      <div className="mainCurrent">
        <h4>Currently Monitoring</h4>
        <div className="flexxExplane">
          <div className="itemCurrent">
            <img src={Twiter} className="itemCurrentSocialIcon"></img>
            <div className="itemCurrents">
              <MonitoringItem />
              <MonitoringItem />
              <MonitoringItem />
              <MonitoringItem />
              <MonitoringItem />
              <MonitoringItem />
            </div>
          </div>
          <div className="itemCurrent">
            <img src={Discord_gray} className="itemCurrentSocialIcon"></img>
            <div className="itemCurrents">
              <MonitoringItem />
              <MonitoringItem />
              <MonitoringItem />
              <MonitoringItem />
              <MonitoringItem />
              <MonitoringItem />
            </div>
          </div>
          <div className="itemCurrent">
            <img src={Opensea_grey} className="itemCurrentSocialIcon"></img>
            <div className="itemCurrents">
              <MonitoringItem />
              <MonitoringItem />
              <MonitoringItem />
              <MonitoringItem />
              <MonitoringItem />
              <MonitoringItem />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentMoniter;
