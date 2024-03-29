import FeedTopbar from "./FeedTopbar";
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
  CheckMark,
} from "../../assets";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Ellipse,
  Twiter,
  CurrentTask,
  Discord_gray,
  Opensea_grey,
} from "../../assets";
import MonitoringItem from "./MonitoringItem";
import { Loader } from "../../assets";
import { toast } from "react-toastify";
import Select, { AriaOnFocus } from "react-select";

var toastOptions = {
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
};

function MonitoringTask() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);
  const location = useLocation();
  const navigate = useNavigate();
  const isNewTask = location.pathname == "/createTask";
  const isLoggedIn = userData.user_id != null;
  const taskId = location.pathname.split("/editTask/")[1] || null;
  const supportedServers = useSelector((state) => state.supportedServers);
  const socket = useSelector((state) => state.socket);
  const [taskData, setTaskData] = useState({});
  const [createTaskState, setCreateTaskState] = useState("");
  const [taskTwitterDetails, setTaskTwitterDetails] = useState({});
  const [taskDiscordDetails, setTaskDiscordDetails] = useState({});
  const [taskOpenSeaDetails, setTaskOpenSeaDetails] = useState({});
  const [taskRedditDetails, setTaskRedditDetails] = useState({});
  const [monitoredItemsTwitter, setMonitoredItemsTwitter] = useState([]);
  const [monitoredItemsDiscord, setMonitoredItemsDiscord] = useState([]);
  const [monitoredItemsReddit, setMonitoredItemsReddit] = useState([]);
  const [monitoredItemsOpenSea, setMonitoredItemsOpenSea] = useState([]);

  const [taskName, setTaskName] = useState("");
  const [taskNameOriginal, setTaskNameOriginal] = useState("");
  // twitter
  const [typeOfTaskTwitter, setTypeOfTaskTwitter] = useState("tweets");
  const [twitterHandle, setTwitterHandle] = useState("");
  const [includeRetweets, setIncludeRetweets] = useState(false);
  const [includeQuoteTweets, setIncludeQuoteTweets] = useState(false);

  const [ariaFocusMessage, setAriaFocusMessage] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const style = {
    blockquote: {
      fontStyle: "italic",
      fontSize: ".75rem",
      margin: "1rem 0",
    },
    label: {
      fontSize: ".75rem",
      fontWeight: "bold",
      lineHeight: 2,
    },
  };

  const onFocus = ({ focused, isDisabled }) => {
    const msg = `You are currently focused on option ${focused.label}${isDisabled ? ", disabled" : ""
      }`;
    setAriaFocusMessage(msg);
    return msg;
  };

  const onMenuOpen = () => setIsMenuOpen(true);
  const onMenuClose = () => setIsMenuOpen(false);

  useEffect(() => {
    if (
      isLoggedIn &&
      !isNewTask &&
      taskId != null &&
      userData.loading != true
    ) {
      var taskData = userData?.tasks?.filter(
        (e) => e.task_id == taskId
      )?.[0] || {
        task_id: null,
      };
      if (taskData.task_id == null) {
        navigate("/createTask");
        return;
      }
      setTaskData(taskData);
      setTaskName(taskData.name);
      setTaskNameOriginal(taskData.name);
      setMonitoredItemsTwitter(taskData.monitoredItems.twitter);
      setMonitoredItemsDiscord(taskData.monitoredItems.discord);
      setMonitoredItemsOpenSea(taskData.monitoredItems.opensea);
      setMonitoredItemsReddit(taskData.monitoredItems.reddit)
    }
  }, [
    isLoggedIn,
    userData,
    isNewTask,
    taskId,
    navigate,
    setMonitoredItemsTwitter,
    setMonitoredItemsDiscord,
    setMonitoredItemsOpenSea,
    setMonitoredItemsReddit,
    setTaskName,
    setTaskData,
  ]);

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
  socket.on("task-created", (action) => {
    setCreateTaskState("");
    navigate(`/editTask/${action}`);
  });
  function changeTaskName() {
    socket.emit("change-task-name", { taskId, taskName });
    setTaskNameOriginal(taskName);
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
    setSelectedServerIndex(event.value);
    setSelectedChannelIndex(0);
  }
  function channelChange(event) {
    setSelectedChannelIndex(event.value);
  }
  function discordMonitorType(event) {
    setTypeOfTaskDiscord(event.target.getAttribute("data-value"));
  }

  // opensea
  const [collectionName, setCollectionName] = useState("");
  const [subredditName, setSubredditName] = useState("");
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
    var ogData = [];
    var setFnc = function () { };
    var isDub = false;
    if (type == "twitter") {
      data = { ...taskTwitterDetails, type: typeOfTaskTwitter };
      ogData = monitoredItemsTwitter;
      setFnc = setMonitoredItemsTwitter;
      isDub = ogData.filter((e) => e.handle == data.handle).length != 0;
    } else if (type == "discord") {
      data = { ...taskDiscordDetails, type: typeOfTaskDiscord };
      ogData = monitoredItemsDiscord;
      setFnc = setMonitoredItemsDiscord;
      isDub =
        ogData.filter(
          (e) => e.guild_id == data.guild_id && e.channel_id == data.channel_id
        ).length != 0;
    } else if (type == "opensea") {
      data = { ...taskOpenSeaDetails, type: typeOfTaskOpensea };
      ogData = monitoredItemsOpenSea;
      setFnc = setMonitoredItemsOpenSea;
      isDub =
        ogData.filter((e) => e.collection_name == data.collection_name)
          .length != 0;
    } else if (type == "reddit") {
      data = { ...taskRedditDetails, };
      ogData = monitoredItemsReddit;
      setFnc = setMonitoredItemsReddit;
      isDub =
        ogData.filter((e) => e.subreddit_name == data.subreddit_name)
          .length != 0;

    }
    if (!isDub) {
      socket.emit(
        "check-channel",
        { type, data, task_id: taskId },
        function (msgs) {
          if (type == "discord" && (msgs == null || msgs == "errored")) {
            toast.error(
              "This channel is not trackable, please pick another one.",
              toastOptions
            );
            return;
          }
          if (!isNewTask) {
            socket.emit("add-monitored-item", { type, data, task_id: taskId });
          } else {
            setFnc([...ogData, data]);
          }
        }
      );
    }
  }

  function createTask() {
    if (createTaskState != "") {
      return;
    }
    setCreateTaskState("creating");
    var name = taskName;
    var data = {
      twitter: monitoredItemsTwitter,
      discord: monitoredItemsDiscord,
      opensea: monitoredItemsOpenSea,
    };
    if (name.trim() != "") {
      setTaskNameOriginal(taskName);
      socket.emit("create-task", { data, name });
    } else {
      alert("Please set a name");
    }
  }
  function deleteTask() {
    socket.emit("delete-task", { taskId });
    navigate("/feed");
  }
  return (
    <div>
      {userData.loading == true ? (
        <img
          src={Loader}
          style={{
            height: 300,
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
          alt=""
        />
      ) : (
        <div>
          <FeedTopbar />
          <div className="createTaskDivider"></div>
          <div className="taskCreateMain">
            <form
              action=""
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <h4>{taskId != null ? "Edit Task" : "Create Task"}</h4>
              <h5>Name</h5>
              <div style={{ position: "absolute", display: "flex", gap: 10 }}>
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
                {taskName != taskNameOriginal && !isNewTask && (
                  <div
                    onClick={changeTaskName}
                    style={{
                      backgroundColor: "rgb(122, 101, 251)",
                      width: 42,
                      height: 42,
                      display: "flex",
                      borderRadius: 4,
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    <img src={CheckMark} style={{ width: 20 }} alt="" />
                  </div>
                )}
              </div>
              <div className="taskflex">
                <div className="itemtTask">
                  <h5>Twitter Monitor</h5>
                  <img src={Twitter_button_grey} />
                  <div className="btnsstask">
                    <label
                      for="tweets"
                      className={`btntask ${typeOfTaskTwitter == "tweets" ? "activeTask" : ""
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
                      className={`btntask ${typeOfTaskTwitter == "all_activity" ? "activeTask" : ""
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
                        onClick={() =>
                          setIncludeQuoteTweets(!includeQuoteTweets)
                        }
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

                  {isNewTask ? (
                    <div
                      className="wallet innnfle eywhite task"
                      onClick={(event) => createTask()}
                    >
                      <span className="walletbtn task">
                        <label>Add Task</label>
                      </span>
                    </div>
                  ) : (
                    <div
                      style={{ background: "#fb6565" }}
                      className="wallet innnfle eywhite task"
                      onClick={(event) => deleteTask()}
                    >
                      <span className="walletbtn task">
                        <label>Delete Task</label>
                      </span>
                    </div>
                  )}
                </div>
                <div className="itemtTask">
                  <h5>Discord Monitor</h5>
                  <img src={Discord_button_grey}></img>
                  <div className="btnsstask">
                    <label
                      for="channel_messages"
                      className={`btntask ${typeOfTaskDiscord == "channel_messages"
                        ? "activeTask"
                        : ""
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
                    <Select
                      aria-labelledby="aria-label"
                      ariaLiveMessages={{
                        onFocus,
                      }}
                      inputId="aria-example-input"
                      name="aria-live-color"
                      defaultValue={selectedServerIndex}
                      onChange={serverChange}
                      onMenuOpen={onMenuOpen}
                      onMenuClose={onMenuClose}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          width: "200px",
                        }),
                      }}
                      options={[
                        { value: 0, label: "Select a server" },
                        ...supportedServers.map((item, index) => {
                          return { value: index + 1, label: item.name };
                        }),
                      ]}
                    />
                  </div>
                  <div className="optionsTask">
                    <img src={Down_arrow_gray} className="optionsTaskArrow" />
                    <Select
                      aria-labelledby="aria-label"
                      ariaLiveMessages={{
                        onFocus,
                      }}
                      inputId="aria-example-input"
                      name="aria-live-color"
                      defaultValue={selectedChannelIndex}
                      onChange={channelChange}
                      onMenuOpen={onMenuOpen}
                      onMenuClose={onMenuClose}
                      isDisabled={Number(selectedServerIndex) == 0}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          width: "200px",
                        }),
                      }}
                      options={[
                        { value: 0, label: "Choose channel" },
                        ...((supportedServers[
                          Number(selectedServerIndex) - 1
                        ] &&
                          supportedServers[
                            Number(selectedServerIndex) - 1
                          ].channels.map((item, index) => {
                            return { value: index + 1, label: item.name };
                          })) ||
                          []),
                      ]}
                    />{" "}
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
                      className={`btntask ${typeOfTaskOpensea == "collection_activity"
                        ? "activeTask"
                        : ""
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
                      className={`btntask ${typeOfTaskOpensea == "account_activity"
                        ? "activeTask"
                        : ""
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
                <div className="itemtTask">
                  <h5>Reddit Monitor</h5>
                  <img src={Opensea_button_grey}></img>

                  <input
                    type="text"
                    value={subredditName}
                    onInput={(event) => setSubredditName(event.target.value)}
                    className="search task "
                    placeholder="Enter Link"
                  />
                  <div
                    className="wallet innnfle eywhite task reddit"
                    onClick={(event) => addMonitoredItem("reddit")}
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
          <div>
            <div className="mainCurrent">
              <h4>Currently Monitoring</h4>
              <div className="flexxExplane">
                <div className="itemCurrent">
                  <img src={Twiter} className="itemCurrentSocialIcon"></img>
                  <div className="itemCurrents">
                    {monitoredItemsTwitter &&
                      monitoredItemsTwitter.map((monitoredItem, index) => {
                        return (
                          <MonitoringItem
                            icon={monitoredItem.tweetUser?.profile_image_url}
                            letter={""}
                            isVerified={monitoredItem.tweetUser?.verified}
                            name={
                              monitoredItem.tweetUser?.name ||
                              monitoredItem.handle
                            }
                            monitorItemId={monitoredItem?.monitored_id}
                            type="twitter"
                          />
                        );
                      })}
                  </div>
                </div>
                <div className="itemCurrent">
                  <img
                    src={Discord_gray}
                    className="itemCurrentSocialIcon"
                  ></img>
                  <div className="itemCurrents">
                    {monitoredItemsDiscord &&
                      monitoredItemsDiscord.map((monitoredItem, index) => {
                        var monitoredServer = supportedServers.filter(
                          (e) => e.id == monitoredItem.guild_id
                        )?.[0];
                        if (monitoredServer) {
                          var monitoredChannel =
                            monitoredServer.channels.filter(
                              (e) => e.id == monitoredItem.channel_id
                            )?.[0];
                          if (monitoredChannel) {
                            return (
                              <MonitoringItem
                                icon={monitoredServer.icon}
                                letter={monitoredServer.nameAcronym}
                                isVerified={false}
                                name={monitoredChannel.name}
                                monitorItemId={monitoredItem.monitored_id}
                                type="discord"
                              />
                            );
                          }
                        }
                      })}
                  </div>
                </div>
                <div className="itemCurrent">
                  <img
                    src={Opensea_grey}
                    className="itemCurrentSocialIcon"
                  ></img>
                  <div className="itemCurrents">
                    {monitoredItemsOpenSea &&
                      monitoredItemsOpenSea.map((monitoredItem, index) => {
                        return (
                          <MonitoringItem
                            icon={monitoredItem.icon}
                            letter={monitoredItem.letter}
                            isVerified={monitoredItem.isVerified}
                            name={monitoredItem.name}
                            monitorItemId={monitoredItem.monitored_id}
                            type="opensea"
                          />
                        );
                      })}
                  </div>
                </div>
                <div className="itemCurrent">
                  <img
                    src={Opensea_grey}
                    className="itemCurrentSocialIcon"
                  ></img>
                  <div className="itemCurrents">
                    {monitoredItemsReddit &&
                      monitoredItemsReddit.map((monitoredItem, index) => {
                        return (
                          <MonitoringItem
                            icon={monitoredItem.icon}
                            letter={monitoredItem.letter}
                            isVerified={monitoredItem.isVerified}
                            name={monitoredItem.name}
                            monitorItemId={monitoredItem.monitored_id}
                            type="reddit"
                          />
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MonitoringTask;
