import React, { useEffect, useState } from "react";
import {
  Options,
  Discord_gray,
} from "../../assets/index";
function TaskResultItem({ result }) {
  const [timeAgo, setTimeAgo] = useState(timeDifference(undefined, result.created_time_stamp))
  function timeDifference(current = new Date().toLocaleString("en-US", { timeZone: "GMT" }), previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = new Date(current).getTime() - new Date(previous.split(".")[0]).getTime();

    if (elapsed < msPerMinute) {
      return `${Math.round(elapsed / 1000) == 1 ? "a" : Math.round(elapsed / 1000)} second${Math.round(elapsed / 1000) > 1 ? "s" : ""} ago`;

    }

    else if (elapsed < msPerHour) {
      return `${Math.round(elapsed / msPerMinute) == 1 ? "a" : Math.round(elapsed / msPerMinute)} minute${Math.round(elapsed / msPerMinute) > 1 ? "s" : ""} ago`;
    }

    else if (elapsed < msPerDay) {
      return `${Math.round(elapsed / msPerHour) == 1 ? "a" : Math.round(elapsed / msPerHour)} hour${Math.round(elapsed / msPerHour) > 1 ? "s" : ""} ago`;

    }

    else if (elapsed < msPerMonth) {
      return `${Math.round(elapsed / msPerDay) == 1 ? "a" : Math.round(elapsed / msPerDay)} day${Math.round(elapsed / msPerDay) > 1 ? "s" : ""} ago`;

    }

    else if (elapsed < msPerYear) {
      return `${Math.round(elapsed / msPerMonth) == 1 ? "a" : Math.round(elapsed / msPerMonth)} month${Math.round(elapsed / msPerMonth) > 1 ? "s" : ""} ago`;
    }

    else {
      return `${Math.round(elapsed / msPerYear) == 1 ? "a" : Math.round(elapsed / msPerYear)} year${Math.round(elapsed / msPerYear) > 1 ? "s" : ""} ago`;
    }
  }
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeAgo(timeDifference(undefined, result.created_time_stamp))
    }, 1000);
    return () => clearInterval(interval);
  }, [timeDifference, setTimeAgo, result])
  return (
    <td>
      {
        result.type == "discord" &&
        <div className="porfoliaMnitr">
          <div className="feedPostAuthorContainer">
            <div className="upermonitr">
              <span className="mntiproo">
                <img src={result.discord_user_avatar}></img>
              </span>
              <span className="postInfoContainer">
                <label>{result.discord_user_tag}</label>
                <p style={{ minHeight: "20px" }}>
                  {result.msg_content}
                </p>
              </span>
            </div>
            <span className="opption">
              <a href={result.msg_url} target="_blank">
                <img src={Options} />
              </a>
            </span>
          </div>
          {result.attachements.map((attachement) => {
            if (attachement.height != "null") {
              return (
                <div className="mntiimag" style={{ maxWidth: "337px", maxHeight: "400px" }}>
                  <img src={attachement.attachement_url} style={{ maxHeight: "inherit", maxWidth: "inherit", width: "unset", height: "unset", borderRadius: "10px" }} onClick={({ target }) => window.open(target.src)} ></img>
                </div>

              )

            }
          })}

          <div className="downmonitr">
            <img src={Discord_gray}></img>
            {/* <a href="#">boredapeyachtclub.com</a> */}
            <span>{timeAgo}</span>
          </div>
        </div>

      }
    </td>

  );
}

export default TaskResultItem;

/* <td>
                    <div className="porfoliaMnitr">
                      <div className="upermonitr">
                        <div className="feedPostAuthorContainer">
                          <span className="mntiproo">
                            <img src={WalletProfile}></img>
                          </span>
                          <span className="postInfoContainer">
                            <label>BAYC#0001</label>
                            <p>
                              @everyone Announcing our new collection of BAYC Mutants!
                            </p>
                          </span>
                        </div>
                        <span className="opption">
                          <img src={Options}></img>
                        </span>
                      </div>
                      <div className="downmonitr">
                        <img src={Twitss}></img>
                        <span className="comments">
                          <span>
                            <img src={Comments}></img>
                            <span>5</span>
                          </span>
                          <span>
                            <img src={Share}></img>
                            <span>5</span>
                          </span>
                          <span>
                            <img src={LoveLike}></img>
                            <span>5</span>
                          </span>
                        </span>
                        <span>8s ago</span>
                      </div>
                    </div>
                  </td>

                  <td className="difff">
                    <div className="porfoliaMnitr">
                      <div className="upermonitr activity">
                        <div className="feedPostAuthorContainer">
                          <span className="diflex">
                            <img src={Feed_image_3}></img>
                            <span className="mntiproo activity">
                              <label>Bird #123</label>
                              <span className="biance">
                                <img src={Balancee}></img>
                                <span>58</span>
                                <p>Bid </p>
                              </span>
                            </span>
                          </span>
                        </div>
                        <span className="opption activity">
                          <span className="timee">
                            15m ago <img src={Options}></img>
                          </span>
                        </span>
                      </div>
                    </div>
                  </td> */