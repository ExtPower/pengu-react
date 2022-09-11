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
import CreateTaskButton from "./CreateTaskButton";
import { useSelector } from "react-redux"
function CreateTask() {
  const [check, setCheck] = useState(false);
  const [check1, setCheck1] = useState(false);
  const supportedServers = useSelector(state => state.supportedServers)

  return (
    <div className="taskCreateMain">
      <h4>Create Task</h4>
      <h5>Name</h5>
      <input
        type="text"
        className="search task"
        placeholder="Task Name"
      ></input>
      <div className="taskflex">
        <div className="itemtTask">
          <h5>Twitter Monitor</h5>
          <img src={Twitter_button_grey}></img>
          <div className="btnsstask">
            <CreateTaskButton text="Tweets" />

            <CreateTaskButton text="All Activity" />
          </div>
          <input
            type="text"
            className="search task "
            placeholder="Enter Handle"
          ></input>
          <div className="divCheckbox">
            <span>
              <img
                src={check ? CheckBox : UncheckBox}
                onClick={() => setCheck(!check)}
              />{" "}
              <label>Include Retweets</label>
            </span>

            <span>
              <img
                src={check1 ? CheckBox : UncheckBox}
                onClick={() => setCheck1(!check1)}
              />{" "}
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
            <CreateTaskButton text="Channel Messages" />
          </div>
          <div className="optionsTask server">
            <img src={Down_arrow_black} className="optionsTaskArrow" />
            <select>
              {
                supportedServers.map((item, index) => {
                  return (
                    <option>{item.name}</option>
                  )
                })
              }
            </select>
          </div>
          <div className="optionsTask">
            <img src={Down_arrow_gray} className="optionsTaskArrow" />

            <select>
              <option>Choose channel</option>

              <option>#announcements</option>
              <option>#updates</option>
              <option>#general</option>
            </select>
          </div>
          <div className="wallet innnfle eywhite task opensea">
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
            <CreateTaskButton text="Collection Activity" />
            <CreateTaskButton text="Account Activity" />
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
