import React, { useEffect, useState } from "react";
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
  var userData = useSelector((state) => state.userData);
  var [twitterTasks, setTwitterTasks] = useState([])
  var [discordTasks, setDiscordTasks] = useState([])
  var [openseaTasks, setOpenseaTasks] = useState([])
  useEffect(() => {
    if (userData.user_id != null) {
      var tasksData = userData?.tasksData || {}
      setTwitterTasks(tasksData.twitterTasks || [])
      setDiscordTasks(tasksData.discordTasks || [])
      setOpenseaTasks(tasksData.openseaTasks || [])
    }
  }, [userData, setTwitterTasks, setDiscordTasks, setOpenseaTasks])
  return (
    <div>
      <div className="mainCurrent">
        <h4>Currently Monitoring</h4>
        <div className="flexxExplane">
          <div className="itemCurrent">
            <img src={Twiter} className="itemCurrentSocialIcon"></img>
            <div className="itemCurrents">
              {twitterTasks && twitterTasks.map((twitterTask, index) => {
                return (
                  <MonitoringItem icon={twitterTask.icon} letter={twitterTask.letter} isVerified={twitterTask.isVerified} name={twitterTask.name} />
                )
              })}

            </div>
          </div>
          <div className="itemCurrent">
            <img src={Discord_gray} className="itemCurrentSocialIcon"></img>
            <div className="itemCurrents">
              {discordTasks && discordTasks.map((discordTask, index) => {
                return (
                  <MonitoringItem icon={discordTask.icon} letter={discordTask.nameAcronym} isVerified={false} name={discordTask.name} />
                )
              })}
            </div>
          </div>
          <div className="itemCurrent">
            <img src={Opensea_grey} className="itemCurrentSocialIcon"></img>
            <div className="itemCurrents">
              {openseaTasks && openseaTasks.map((openseaTask, index) => {
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
