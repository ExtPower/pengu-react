import React, { useEffect, useState } from "react";
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
import { useSelector, useDispatch } from "react-redux";
function CreateTask() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);
  const supportedServers = useSelector((state) => state.supportedServers);
  const socket = useSelector((state) => state.socket);
  const [taskTwitterDetails, setTaskTwitterDetails] = useState({});
  const [taskDiscordDetails, setTaskDiscordDetails] = useState({});
  const [taskOpenSeaDetails, setTaskOpenSeaDetails] = useState({});
  const [taskName, setTaskName] = useState("");
  // twitter
  const [typeOfTaskTwitter, setTypeOfTaskTwitter] = useState("tweets");
  const [twitterHandle, setTwitterHandle] = useState("");
  const [includeRetweets, setIncludeRetweets] = useState(false);
  const [includeQuoteTweets, setIncludeQuoteTweets] = useState(false);
  useEffect(() => {
    setTaskTwitterDetails(
      {
        handle: twitterHandle || "",
        quote_tweets: includeQuoteTweets || false,
        retweets: includeRetweets || false,
        type: typeOfTaskTwitter || "tweets",
      },
      []
    );
  }, [
    typeOfTaskTwitter,
    twitterHandle,
    includeRetweets,
    includeQuoteTweets,
    setTaskTwitterDetails,
  ]);

  function twitterMonitorType(event) {
    setTypeOfTaskTwitter(event.target.getAttribute("data-value"));
  }

  // discord
  const [selectedServerIndex, setSelectedServerIndex] = useState(0);
  const [selectedChannelIndex, setSelectedChannelIndex] = useState(0);
  const [typeOfTaskDiscord, setTypeOfTaskDiscord] =
    useState("channel_messages");

  useEffect(() => {
    var server = {};
    var channel = {};
    if (selectedServerIndex != 0) {
      server = supportedServers[selectedServerIndex - 1];
      if (selectedChannelIndex != 0) {
        channel = server.channels.filter(
          (e, index) => index == selectedChannelIndex - 1
        )[0];
      }
    }
    setTaskDiscordDetails(
      {
        guild_id: server.id || 0,
        channel_id: channel.id || 0,
      },
      []
    );
  }, [
    selectedServerIndex,
    selectedChannelIndex,
    setTaskDiscordDetails,
    supportedServers,
  ]);

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
  const [collectionName, setCollectionName] = useState("");
  const [typeOfTaskOpensea, setTypeOfTaskOpensea] = useState(
    "collection_activity"
  );
  useEffect(() => {
    setTaskOpenSeaDetails(
      {
        collection_name: collectionName || "",
        type: typeOfTaskOpensea || "collection_activity",
      },
      []
    );
  }, [collectionName, typeOfTaskOpensea, setTaskOpenSeaDetails]);

  function openseaMonitorType(event) {
    setTypeOfTaskOpensea(event.target.getAttribute("data-value"));
  }

  // others
  function addMonitoredItem(type = null) {
    if (type == null) {
      return;
    }
    var data = {};
    if (type == "twitter") {
      data = { ...taskTwitterDetails };
    } else if (type == "discord") {
      data = { ...taskDiscordDetails };
    } else if (type == "opensea") {
      data = { ...taskOpenSeaDetails };
    }
    socket.emit("add-monitored-item", { type, data });
  }

  function createTask() {
    var data = {};
    if (taskTwitterDetails.handle != "") {
      data.twitter = { ...taskTwitterDetails };
    }
    if (taskDiscordDetails.guild_id != 0) {
      data.discord = { ...taskDiscordDetails };
    }
    if (taskOpenSeaDetails.collection_name != "") {
      data.opensea = { ...taskOpenSeaDetails };
    }
    socket.emit("create-task", { data, name: taskName });
  }
  return (
    <div className="taskCreateMain">
      <form
        action=""
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <h4>Create Task</h4>
        <h5>Name</h5>
        <input
          type="text"
          className="search task"
          placeholder="Task Name"
          required="true"
          value={taskName}
          onInput={(event) => {
            setTaskName(event.target.value, []);
          }}
        />
        <div className="taskflex">
          <div className="itemtTask">
            <h5>Twitter Monitor</h5>
            <img src={Twitter_button_grey} />
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
              value={twitterHandle}
              onInput={(event) => setTwitterHandle(event.target.value)}
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
            <div
              className="wallet innnfle eywhite task"
              style={{ marginBottom: "20px" }}
              onClick={(event) => addMonitoredItem("twitter")}
            >
              <span className="walletbtn task">
                <img src={EyeWhite}></img>
                <label>Monitor</label>
              </span>
            </div>

            <div
              className="wallet innnfle eywhite task"
              onClick={(event) => createTask()}
            >
              <span className="walletbtn task">
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
                  data-value="channel_messages"
                  onChange={discordMonitorType}
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
                  supportedServers[
                    Number(selectedServerIndex) - 1
                  ].channels.map((item, index) => {
                    return <option value={index + 1}>{item.name}</option>;
                  })}
              </select>
            </div>
            <div
              className="wallet innnfle eywhite task"
              onClick={(event) => addMonitoredItem("discord")}
            >
              <span className="walletbtn task">
                <img src={EyeWhite}></img>
                <label>Monitor</label>
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
              value={collectionName}
              onInput={(event) => setCollectionName(event.target.value)}
              className="search task "
              placeholder="Enter Link"
            />
            <div
              className="wallet innnfle eywhite task opensea"
              onClick={(event) => addMonitoredItem("opensea")}
            >
              <span className="walletbtn task">
                <img src={EyeWhite}></img>
                <label>Monitor</label>
              </span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateTask;
