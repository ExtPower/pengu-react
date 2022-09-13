import React, { useEffect, useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  EyeWhite,
  CheckBox,
  UncheckBox,
  Twitter_button_grey,
  Discord_button_grey,
  Opensea_button_grey,
  Down_arrow_black,
  Down_arrow_gray,
} from "../../assets";
import { useSelector } from "react-redux";
function CreateTask() {
  const supportedServers = useSelector((state) => state.supportedServers);

  // twitter
  const [includeRetweets, setIncludeRetweets] = useState(false);
  const [includeQuoteTweets, setIncludeQuoteTweets] = useState(false);
  const [typeOfTaskTwitter, setTypeOfTaskTwitter] = useState("tweets");
  const [taskName, setTaskName] = useState("");
  function twitterMonitorType(event) {
    setTypeOfTaskTwitter(event.target.getAttribute("data-value"));
  }

  // discord
  const [selectedServerIndex, setSelectedServerIndex] = useState(0);
  const [selectedChannelIndex, setSelectedChannelIndex] = useState(0);

  const [typeOfTaskDiscord, setTypeOfTaskDiscord] =
    useState("channel_messages");

  function serverChange(event) {
    setSelectedServerIndex(event.target.value);
    setSelectedChannelIndex(0);
  }
  function channelChange(event) {
    setSelectedChannelIndex(event.target.value);
  }
  function discordMonitorType(event) {
    setTypeOfTaskDiscord(event.target.getAttribute("data-value"));
  }

  // opensea
  const [typeOfTaskOpensea, setTypeOfTaskOpensea] = useState(
    "collection_activity"
  );

  function openseaMonitorType(event) {
    setTypeOfTaskOpensea(event.target.getAttribute("data-value"));
  }

  return (
    <div className="taskCreateMain">
      <h4>Create Task</h4>
      <h5>Name</h5>
      <input
        type="text"
        className="search task"
        placeholder="Task Name"
        value={taskName}
        onInput={(event) => setTaskName(event.target.value)}
      ></input>
      <div className="taskflex">
        <div className="itemtTask">
          <h5>Twitter Monitor</h5>
          <img src={Twitter_button_grey}></img>
          <div className="btnsstask">
            <label
              for="tweets"
              className={`btntask ${
                typeOfTaskTwitter == "tweets" ? "activeTask" : ""
              }`}
            >
              <input
                name="typeOfTaskTwitter"
                id="tweets"
                data-value="tweets"
                checked={typeOfTaskTwitter == "tweets"}
                onChange={twitterMonitorType}
                type="radio"
                style={{ display: "none" }}
              />
              Tweets
            </label>
            <label
              for="all_activity"
              className={`btntask ${
                typeOfTaskTwitter == "all_activity" ? "activeTask" : ""
              }`}
            >
              <input
                name="typeOfTaskTwitter"
                id="all_activity"
                checked={typeOfTaskTwitter == "all_activity"}
                data-value="all_activity"
                onChange={twitterMonitorType}
                type="radio"
                style={{ display: "none" }}
              />
              All Activity
            </label>
          </div>
          <input
            type="text"
            className="search task "
            placeholder="Enter Handle"
          />
          <div className="divCheckbox">
            <span>
              <img
                src={includeRetweets ? CheckBox : UncheckBox}
                onClick={() => setIncludeRetweets(!includeRetweets)}
              />
              <label>Include Retweets</label>
            </span>

            <span>
              <img
                src={includeQuoteTweets ? CheckBox : UncheckBox}
                onClick={() => setIncludeQuoteTweets(!includeQuoteTweets)}
              />
              <label>Include Quote Tweets</label>
            </span>
          </div>
          <div className="wallet innnfle eywhite task">
            <span className="walletbtn task">
              <img src={EyeWhite}></img>
              <label>Add Task</label>
            </span>
          </div>
        </div>
        <div className="itemtTask">
          <h5>Discord Monitor</h5>
          <img src={Discord_button_grey}></img>
          <div className="btnsstask">
            <label
              for="channel_messages"
              className={`btntask ${
                typeOfTaskDiscord == "channel_messages" ? "activeTask" : ""
              }`}
            >
              <input
                name="typeOfTaskTwitter"
                id="channel_messages"
                checked={typeOfTaskDiscord == "channel_messages"}
                type="radio"
                style={{ display: "none" }}
              />
              Channel Messages
            </label>
          </div>
          <div className="optionsTask server">
            <img src={Down_arrow_black} className="optionsTaskArrow" />
            <select onInput={serverChange} value={selectedServerIndex}>
              <option value={0}>Select a server</option>
              {supportedServers.map((item, index) => {
                return <option value={index + 1}>{item.name}</option>;
              })}
            </select>
          </div>
          <div className="optionsTask">
            <img src={Down_arrow_gray} className="optionsTaskArrow" />

            <select
              value={selectedChannelIndex}
              onInput={channelChange}
              disabled={Number(selectedServerIndex) == 0}
            >
              <option value={0}>Choose channel</option>
              {supportedServers[Number(selectedServerIndex) - 1] &&
                supportedServers[Number(selectedServerIndex) - 1].channels.map(
                  (item, index) => {
                    return <option value={index + 1}>{item.name}</option>;
                  }
                )}
            </select>
          </div>
          <div className="wallet innnfle eywhite task">
            <span className="walletbtn task">
              <img src={EyeWhite}></img>
              <label>Add Task</label>
            </span>
          </div>
        </div>
        <div className="itemtTask">
          <h5>OpenSea Monitor</h5>
          <img src={Opensea_button_grey}></img>
          <div className="btnsstask">
            <label
              for="collection_activity"
              className={`btntask ${
                typeOfTaskOpensea == "collection_activity" ? "activeTask" : ""
              }`}
            >
              <input
                name="typeOfTaskOpensea"
                id="collection_activity"
                data-value="collection_activity"
                checked={typeOfTaskOpensea == "collection_activity"}
                onChange={openseaMonitorType}
                type="radio"
                style={{ display: "none" }}
              />
              Collection Activity
            </label>
            <label
              for="account_activity"
              className={`btntask ${
                typeOfTaskOpensea == "account_activity" ? "activeTask" : ""
              }`}
            >
              <input
                name="typeOfTaskOpensea"
                id="account_activity"
                checked={typeOfTaskOpensea == "account_activity"}
                data-value="account_activity"
                onChange={openseaMonitorType}
                type="radio"
                style={{ display: "none" }}
              />
              Account Activity
            </label>
          </div>
          <input
            type="text"
            className="search task "
            placeholder="Enter Link"
          ></input>

          <div className="wallet innnfle eywhite task opensea">
            <span className="walletbtn task">
              <img src={EyeWhite}></img>
              <label>Add Task</label>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTask;
