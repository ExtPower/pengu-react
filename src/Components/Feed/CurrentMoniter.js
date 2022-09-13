import React from "react";
import {
  Ellipse,
  Twiter,
  CurrentTask,
  Discord_gray,
  Opensea_grey,
} from "../../assets";
import MonitoringItem from "./MonitoringItem";
import { useSelector } from "react-redux";

function CurrentMoniter() {
  const twitterTasks = useSelector((state) => state.userData.twitterTasks);
  const discordTasks = useSelector((state) => state.userData.discordTasks);
  const openseaTasks = useSelector((state) => state.userData.openseaTasks);
  return (
    <div>
      <div className="mainCurrent">
        <h4>Currently Monitoring</h4>
        <div className="flexxExplane">
          <div className="itemCurrent">
            <img src={Twiter} className="itemCurrentSocialIcon"></img>
            <div className="itemCurrents">
              {twitterTasks.map((twitterTask, index) => {
                return (
                  <MonitoringItem icon={twitterTask.icon} letter={twitterTask.letter} isVerified={twitterTask.isVerified} name={twitterTask.name} />
                )
              })}

            </div>
          </div>
          <div className="itemCurrent">
            <img src={Discord_gray} className="itemCurrentSocialIcon"></img>
            <div className="itemCurrents">
              {discordTasks.map((discordTask, index) => {
                return (
                  <MonitoringItem icon={discordTask.icon} letter={discordTask.letter} isVerified={false} name={discordTask.name} />
                )
              })}
            </div>
          </div>
          <div className="itemCurrent">
            <img src={Opensea_grey} className="itemCurrentSocialIcon"></img>
            <div className="itemCurrents">
              {openseaTasks.map((openseaTask, index) => {
                return (
                  <MonitoringItem icon={openseaTask.icon} letter={openseaTask.letter} isVerified={openseaTask.isVerified} name={openseaTask.name} />
                )
              })}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentMoniter;
