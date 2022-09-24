import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

import {
  WalletProfile,
  ClearAll,
  EyeWhite,
  NtfsBack,
  WalletProfile2,
  Profile2,
  Twitterbg,
  Scenebg,
  Profileblack,
  Back_button_icon,
} from "../../../src/assets/index";
function FeedTopbar() {
  const location = useLocation();
  var isTaskDetailPage = location.pathname !== "/dashboard/createTask" && location.pathname.indexOf("/dashboard/editTask") == -1
  return (
    <div>
      <div className="topbarFeed">
        <div className="topbtns">
          <Link
            to={
              isTaskDetailPage
                ? "/dashboard/createTask"
                : "/dashboard/Feed"
            }
          >
            <div className="wallet innnfle eywhite">
              <span className="walletbtn">
                {isTaskDetailPage ? (
                  <img src={EyeWhite} />
                ) : (
                  <img src={Back_button_icon} />
                )}
                <label>
                  {isTaskDetailPage
                    ? "Create Task"
                    : "Go Back"}
                </label>
              </span>
            </div>{" "}
          </Link>
          {isTaskDetailPage && (
            <div className="wallet innnfle clearall">
              <span className="walletbtn">
                <img src={ClearAll}></img>
                <label>Clear All</label>
              </span>
            </div>
          )}
        </div>
        <div className="topfeedtask">
          <div className="taskItem">
            <img src={WalletProfile}></img>
            <span className="backkintel">
              <img src={NtfsBack} />
            </span>
            <label>bffopens</label>
          </div>
          <div className="taskItem">
            <img src={WalletProfile2}></img>
            <span className="backkintel">
              <img src={Twitterbg} />
            </span>
            <label>bffopens</label>
          </div>
          <div className="taskItem" style={{ marginRight: 30 }}>
            <img src={Profileblack}></img>
            <span className="backkintel">
              <img src={Scenebg} />
            </span>
            <label>bffopens</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedTopbar;
