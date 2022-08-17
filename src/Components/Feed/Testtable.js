import React from "react";
import {
  FeedPoint,
  FeedSettings,
  Options,
  WalletProfile,
  MonitrImage,
  LoveLike,
  Share,
  Comments,
  Twitss,
  Balancee,
  lets_get,
  Discord_gray,
  Feed_image_1,
  Feed_image_2,
  Feed_image_3,
  Gary_vee,
  Vee_friends,
  Bayc,
  Bayc_image,
  Verified_icon,
} from "../../../src/assets/index";
function Testtable() {
  return (
    <div className="tableFeed">
      <div className="tableFeedHorizontalScroll">
        <div className="tableColumn">
          <div className="headitem">
            <div className="heaasind">
              <h4>Portfolio Monitor</h4>
              <label>10 Alerts in the last hour</label>
            </div>
            <div className="headButns">
              <img src={FeedPoint}></img>
              <img src={FeedSettings}></img>
            </div>
          </div>
          <div className="tableContentColumn">
            <td>
              <div className="porfoliaMnitr">
                <div className="feedPostAuthorContainer">
                  <div className="upermonitr">
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
                  <img src={Discord_gray}></img>
                  <a href="#">boredapeyachtclub.com</a>
                  <span>8s ago</span>
                </div>
              </div>
            </td>

            <td>
              <div className="porfoliaMnitr">
                <div className="upermonitr">
                  <div className="feedPostAuthorContainer">
                    <span className="mntiproo">
                      <img src={Feed_image_2}></img>
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
                  <img src={Discord_gray}></img>
                  <a href="#">boredapeyachtclub.com</a>
                  <span>8s ago</span>
                </div>
              </div>
            </td>

            <td>
              <div className="porfoliaMnitr">
                <div className="upermonitr">
                  <div className="feedPostAuthorContainer">
                    <span className="mntiproo">
                      <img src={Feed_image_3}></img>
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
                  <img src={Discord_gray}></img>
                  <a href="#">boredapeyachtclub.com</a>
                  <span>8s ago</span>
                </div>
              </div>
            </td>

            <td>
              <div className="porfoliaMnitr">
                <div className="upermonitr">
                  <div className="feedPostAuthorContainer">
                    <span className="mntiproo">
                      <img src={Feed_image_2}></img>
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
                <div className="mntiimag">
                  <img src={lets_get}></img>
                </div>
                <div className="downmonitr">
                  <img src={Discord_gray}></img>
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

            <td>
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
                {/* <div className="mntiimag">
                      <img src={MonitrImage}>
                      </img>
                  </div> */}
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

            <td>
              <div className="porfoliaMnitr">
                <div className="upermonitr">
                  <div className="feedPostAuthorContainer">
                    <span className="mntiproo">
                      <img src={Feed_image_2}></img>
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
                  <img src={Discord_gray}></img>
                  <a href="#">boredapeyachtclub.com</a>
                  <span>8s ago</span>
                </div>
              </div>
            </td>
          </div>
        </div>
        <div className="tableColumn">
          <div className="headitem">
            <div className="heaasind">
              <h4>Portfolio Activity</h4>
              <label>15 Alerts in the last hour</label>
            </div>
            <div className="headButns">
              <img src={FeedPoint}></img>
              <img src={FeedSettings}></img>
            </div>
          </div>
          <div className="tableContentColumn">
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
            </td>

            <td className="difff">
              <div className="porfoliaMnitr">
                <div className="upermonitr activity">
                  <div className="feedPostAuthorContainer">
                    <span className="diflex">
                      <img src={Feed_image_1}></img>
                      <span className="mntiproo activity">
                        <label>Moonbirds</label>
                        <span className="biance">
                          <img src={Balancee}></img>
                          <span>58</span>
                          <p>New Floor </p>
                        </span>
                      </span>
                    </span>
                  </div>
                  <span className="opption activity">
                    <span className="timee">
                      7m ago <img src={Options}></img>
                    </span>
                  </span>
                </div>
              </div>
            </td>

            <td className="difff">
              <div className="porfoliaMnitr">
                <div className="upermonitr activity">
                  <div className="feedPostAuthorContainer">
                    <span className="diflex">
                      <img src={Feed_image_2}></img>
                      <span className="mntiproo activity">
                        <label>Bird #456</label>
                        <span className="biance">
                          <img src={Balancee}></img>
                          <span>58</span>
                          <p>Sale </p>
                        </span>
                      </span>
                    </span>
                  </div>
                  <span className="opption activity">
                    <span className="timee">
                      10m ago <img src={Options}></img>
                    </span>
                  </span>
                </div>
              </div>
            </td>

            <td className="difff">
              <div className="porfoliaMnitr">
                <div className="upermonitr activity">
                  <div className="feedPostAuthorContainer">
                    <span className="diflex">
                      <img src={WalletProfile}></img>
                      <span className="mntiproo activity">
                        <label>Punk #123</label>
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
                      20m ago <img src={Options}></img>
                    </span>
                  </span>
                </div>
              </div>
            </td>

            <td className="difff">
              <div className="porfoliaMnitr">
                <div className="upermonitr activity">
                  <div className="feedPostAuthorContainer">
                    <span className="diflex">
                      <img src={Feed_image_1}></img>
                      <span className="mntiproo activity">
                        <label>Punk #456</label>
                        <span className="biance">
                          <img src={Balancee}></img>
                          <span>58</span>
                          <p>Sale </p>
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
            </td>

            <td className="difff">
              <div className="porfoliaMnitr">
                <div className="upermonitr activity">
                  <div className="feedPostAuthorContainer">
                    <span className="diflex">
                      <img src={WalletProfile}></img>
                      <span className="mntiproo activity">
                        <label>Bird #123</label>
                        <span className="biance">
                          <img src={Balancee}></img>
                          <span>58</span>
                          <p>Sale </p>
                        </span>
                      </span>
                    </span>
                  </div>
                  <span className="opption activity">
                    <span className="timee">
                      8m ago <img src={Options}></img>
                    </span>
                  </span>
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
                          <p>New Floor </p>
                        </span>
                      </span>
                    </span>
                  </div>
                  <span className="opption activity">
                    <span className="timee">
                      3m ago <img src={Options}></img>
                    </span>
                  </span>
                </div>
              </div>
            </td>
          </div>
        </div>
        <div className="tableColumn">
          <div className="headitem">
            <div className="heaasind">
              <h4>Influencer Content</h4>
              <label>12 Alerts in the last hour</label>
            </div>
            <div className="headButns">
              <img src={FeedPoint}></img>
              <img src={FeedSettings}></img>
            </div>
          </div>
          <div className="tableContentColumn">
            <td>
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
                  <img src={Discord_gray}></img>
                  <a href="#">boredapeyachtclub.com</a>
                  <span>8s ago</span>
                </div>
              </div>
            </td>

            <td>
              <div className="porfoliaMnitr">
                <div className="upermonitr">
                  <div className="feedPostAuthorContainer">
                    <span className="mntiproo">
                      <img src={Gary_vee}></img>
                    </span>
                    <span className="postInfoContainer">
                      <label>
                        Gary Vee{" "}
                        <img src={Verified_icon} className="feedVerifiedIcon" />
                      </label>

                      <p>VeeFriends Series 2 - Collection </p>
                    </span>
                  </div>
                  <span className="opption">
                    <img src={Options}></img>
                  </span>
                </div>
                <div className="mntiimag">
                  <img src={Vee_friends}></img>
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

            <td>
              <div className="porfoliaMnitr">
                <div className="upermonitr">
                  <div className="feedPostAuthorContainer">
                    <span className="mntiproo">
                      <img src={Feed_image_1}></img>
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
                {/* <div className="mntiimag">
                      <img src={MonitrImage}>
                      </img>
                  </div> */}
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

            <td>
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
                  <img src={Discord_gray}></img>
                  <a href="#">boredapeyachtclub.com</a>
                  <span>8s ago</span>
                </div>
              </div>
            </td>
          </div>
        </div>
        <div className="tableColumn">
          <div className="headitem">
            <div className="heaasind">
              <h4>Live Drop</h4>
              <label>5 Alerts in the last hour</label>
            </div>
            <div className="headButns">
              <img src={FeedPoint}></img>
              <img src={FeedSettings}></img>
            </div>
          </div>
          <div className="tableContentColumn">
            <td>
              <div className="porfoliaMnitr">
                <div className="upermonitr">
                  <div className="feedPostAuthorContainer">
                    <span className="mntiproo">
                      <img src={Feed_image_1}></img>
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
                  <img src={Discord_gray}></img>
                  <a href="#">boredapeyachtclub.com</a>
                  <span>8s ago</span>
                </div>
              </div>
            </td>

            <td>
              <div className="porfoliaMnitr">
                <div className="upermonitr">
                  <div className="feedPostAuthorContainer">
                    <span className="mntiproo">
                      <img src={Bayc}></img>
                    </span>
                    <span className="postInfoContainer">
                      <label>
                        BAYC#0001{" "}
                        <img src={Verified_icon} className="feedVerifiedIcon" />
                      </label>
                      <p>
                        @everyone Announcing our new collection of BAYC Mutants!
                      </p>
                    </span>
                  </div>
                  <span className="opption">
                    <img src={Options}></img>
                  </span>
                </div>
                <div className="mntiimag">
                  <img src={Bayc_image}></img>
                </div>
                <div className="downmonitr">
                  <img src={Discord_gray}></img>
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

            <td>
              <div className="porfoliaMnitr">
                <div className="upermonitr">
                  <div className="feedPostAuthorContainer">
                    <span className="mntiproo">
                      <img src={Feed_image_2}></img>
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
                {/* <div className="mntiimag">
                      <img src={MonitrImage}>
                      </img>
                  </div> */}
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

            <td>
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
                  <img src={Discord_gray}></img>
                  <a href="#">boredapeyachtclub.com</a>
                  <span>8s ago</span>
                </div>
              </div>
            </td>
          </div>
        </div>
        <div className="tableColumn">
          <div className="headitem">
            <div className="heaasind">
              <h4>Live Drop</h4>
              <label>5 Alerts in the last hour</label>
            </div>
            <div className="headButns">
              <img src={FeedPoint}></img>
              <img src={FeedSettings}></img>
            </div>
          </div>
          <div className="tableContentColumn">
            <td>
              <div className="porfoliaMnitr">
                <div className="upermonitr">
                  <div className="feedPostAuthorContainer">
                    <span className="mntiproo">
                      <img src={Feed_image_1}></img>
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
                  <img src={Discord_gray}></img>
                  <a href="#">boredapeyachtclub.com</a>
                  <span>8s ago</span>
                </div>
              </div>
            </td>

            <td>
              <div className="porfoliaMnitr">
                <div className="upermonitr">
                  <div className="feedPostAuthorContainer">
                    <span className="mntiproo">
                      <img src={Bayc}></img>
                    </span>
                    <span className="postInfoContainer">
                      <label>
                        BAYC#0001{" "}
                        <img src={Verified_icon} className="feedVerifiedIcon" />
                      </label>
                      <p>
                        @everyone Announcing our new collection of BAYC Mutants!
                      </p>
                    </span>
                  </div>
                  <span className="opption">
                    <img src={Options}></img>
                  </span>
                </div>
                <div className="mntiimag">
                  <img src={Bayc_image}></img>
                </div>
                <div className="downmonitr">
                  <img src={Discord_gray}></img>
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

            <td>
              <div className="porfoliaMnitr">
                <div className="upermonitr">
                  <div className="feedPostAuthorContainer">
                    <span className="mntiproo">
                      <img src={Feed_image_2}></img>
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
                {/* <div className="mntiimag">
                      <img src={MonitrImage}>
                      </img>
                  </div> */}
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

            <td>
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
                  <img src={Discord_gray}></img>
                  <a href="#">boredapeyachtclub.com</a>
                  <span>8s ago</span>
                </div>
              </div>
            </td>
          </div>
        </div>
        <div className="tableColumn">
          <div className="headitem">
            <div className="heaasind">
              <h4>Live Drop</h4>
              <label>5 Alerts in the last hour</label>
            </div>
            <div className="headButns">
              <img src={FeedPoint}></img>
              <img src={FeedSettings}></img>
            </div>
          </div>
          <div className="tableContentColumn">
            <td>
              <div className="porfoliaMnitr">
                <div className="upermonitr">
                  <div className="feedPostAuthorContainer">
                    <span className="mntiproo">
                      <img src={Feed_image_1}></img>
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
                  <img src={Discord_gray}></img>
                  <a href="#">boredapeyachtclub.com</a>
                  <span>8s ago</span>
                </div>
              </div>
            </td>

            <td>
              <div className="porfoliaMnitr">
                <div className="upermonitr">
                  <div className="feedPostAuthorContainer">
                    <span className="mntiproo">
                      <img src={Bayc}></img>
                    </span>
                    <span className="postInfoContainer">
                      <label>
                        BAYC#0001{" "}
                        <img src={Verified_icon} className="feedVerifiedIcon" />
                      </label>
                      <p>
                        @everyone Announcing our new collection of BAYC Mutants!
                      </p>
                    </span>
                  </div>
                  <span className="opption">
                    <img src={Options}></img>
                  </span>
                </div>
                <div className="mntiimag">
                  <img src={Bayc_image}></img>
                </div>
                <div className="downmonitr">
                  <img src={Discord_gray}></img>
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

            <td>
              <div className="porfoliaMnitr">
                <div className="upermonitr">
                  <div className="feedPostAuthorContainer">
                    <span className="mntiproo">
                      <img src={Feed_image_2}></img>
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
                {/* <div className="mntiimag">
                      <img src={MonitrImage}>
                      </img>
                  </div> */}
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

            <td>
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
                  <img src={Discord_gray}></img>
                  <a href="#">boredapeyachtclub.com</a>
                  <span>8s ago</span>
                </div>
              </div>
            </td>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testtable;
