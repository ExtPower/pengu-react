import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux'
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
  const userData = useSelector((state) => state.userData)
  var isTaskDetailPage = location.pathname !== "/createTask" && location.pathname.indexOf("/editTask") == -1
  return (
    <div>
      <div className="topbarFeed">
        <div className="topbtns">
          <Link
            to={
              isTaskDetailPage
                ? "/createTask"
                : "/Feed"
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
          {userData.twitterAcc.twitter_id != null &&
            <div className="taskItem">
              <img src={userData.twitterAcc.profile_picutre}></img>
              <span className="backkintel">
                <img src={Twitterbg} />
              </span>
              <label>{userData.twitterAcc.display_name}</label>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default FeedTopbar;
