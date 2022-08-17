import React from "react";
import {
  WalletProfile,
  Crazy_Monkey,
  Sad_Monkey,
  Yellow_Monkey,
  Balancee,
  History,
  Ethereum_Logo,
} from "../../../src/assets/index";

function WalletCards() {
  const ImageHover = () => {
    return (
      <div className="image-hover-text">
        <div className="image-hover-text-bubble">
          {/* <span class="image-hover-text-title">Sample</span>
              This is a sample image */}
          <div className="main-bubble_inner_">
            <div className="one">
              <div className="_img">
                {" "}
                <img src={Crazy_Monkey}></img>
              </div>
              <div className="">
                <h3>CoolCats</h3>
              </div>
            </div>
            <div className="two">
              <div className="text">
                <h4>Floor</h4>
              </div>
              <div className="two_right">
                <div>
                  <img src={Ethereum_Logo}></img>
                </div>
                <div>
                  <h5>20</h5>
                </div>
              </div>
            </div>
            <div className="two">
              <div className="text">
                <h4>Currently</h4>
              </div>
              <div className="two_right">
                <div>
                  <img src={Ethereum_Logo}></img>
                </div>
                <div>
                  <h5>20</h5>
                </div>
              </div>
            </div>
            <div className="two">
              <div className="text">
                <h4>Bought for</h4>
              </div>
              <div className="two_right">
                <div>
                  <img src={Ethereum_Logo}></img>
                </div>
                <div>
                  <h5>20</h5>
                </div>
              </div>
            </div>

            <div className="two">
              <div className="two_right history">
                <div>
                  <h5>History</h5>
                </div>
                <div className="his_icon">
                  <a href="#">
                    {" "}
                    <img src={History}></img>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mainCard">
      <div className="itemmWallet">
        <div className="imggW">
          <ImageHover />
          <img src={Crazy_Monkey}></img>
        </div>
        <div className="contennts">
          <p>Doodle #1234</p>
          <h4>
            $100,000
            <span className="ests">(est)</span>
          </h4>
        </div>
        {/* dfd */}
      </div>
      <div className="itemmWallet">
        <div className="imggW">
          <ImageHover />
          <img src={Sad_Monkey}></img>
        </div>
        <div className="contennts">
          <p>Doodle #1234</p>
          <h4>
            $100,000
            <span className="ests">(est)</span>
          </h4>
        </div>
      </div>
      <div className="itemmWallet">
        <div className="imggW">
          <ImageHover />
          <img src={Yellow_Monkey}></img>
        </div>
        <div className="contennts">
          <p>Doodle #1234</p>
          <h4>
            $100,000
            <span className="ests">(est)</span>
          </h4>
        </div>
      </div>
      <div className="itemmWallet">
        <div className="imggW">
          <ImageHover />
          <img src={Crazy_Monkey}></img>
        </div>
        <div className="contennts">
          <p>Doodle #1234</p>
          <h4>
            $100,000
            <span className="ests">(est)</span>
          </h4>
        </div>
      </div>
      <div className="itemmWallet">
        <div className="imggW">
          <ImageHover />
          <img src={Sad_Monkey}></img>
        </div>
        <div className="contennts">
          <p>Doodle #1234</p>
          <h4>
            $100,000
            <span className="ests">(est)</span>
          </h4>
        </div>
      </div>
      <div className="itemmWallet">
        <div className="imggW">
          <ImageHover />
          <img src={Yellow_Monkey}></img>
        </div>
        <div className="contennts">
          <p>Doodle #1234</p>
          <h4>
            $100,000
            <span className="ests">(est)</span>
          </h4>
        </div>
      </div>
      <div className="itemmWallet">
        <div className="imggW">
          <ImageHover />
          <img src={Crazy_Monkey}></img>
        </div>
        <div className="contennts">
          <p>Doodle #1234</p>
          <h4>
            $100,000
            <span className="ests">(est)</span>
          </h4>
        </div>
      </div>
      <div className="itemmWallet">
        <div className="imggW">
          <ImageHover />
          <img src={Sad_Monkey}></img>
        </div>
        <div className="contennts">
          <p>Doodle #1234</p>
          <h4>
            $100,000
            <span className="ests">(est)</span>
          </h4>
        </div>
      </div>
      <div className="itemmWallet">
        <div className="imggW">
          <ImageHover />
          <img src={Yellow_Monkey}></img>
        </div>
        <div className="contennts">
          <p>Doodle #1234</p>
          <h4>
            $100,000
            <span className="ests">(est)</span>
          </h4>
        </div>
      </div>
      <div className="itemmWallet">
        <div className="imggW">
          <ImageHover />
          <img src={Crazy_Monkey}></img>
        </div>
        <div className="contennts">
          <p>Doodle #1234</p>
          <h4>
            $100,000
            <span className="ests">(est)</span>
          </h4>
        </div>
      </div>
      <div className="itemmWallet">
        <div className="imggW">
          <ImageHover />
          <img src={Sad_Monkey}></img>
        </div>
        <div className="contennts">
          <p>Doodle #1234</p>
          <h4>
            $100,000
            <span className="ests">(est)</span>
          </h4>
        </div>
      </div>
      <div className="itemmWallet">
        <div className="imggW">
          <ImageHover />
          <img src={Yellow_Monkey}></img>
        </div>
        <div className="contennts">
          <p>Doodle #1234</p>
          <h4>
            $100,000
            <span className="ests">(est)</span>
          </h4>
        </div>
      </div>
      <div className="itemmWallet">
        <div className="imggW">
          <ImageHover />
          <img src={Sad_Monkey}></img>
        </div>
        <div className="contennts">
          <p>Doodle #1234</p>
          <h4>
            $100,000
            <span className="ests">(est)</span>
          </h4>
        </div>
      </div>
    </div>
  );
}

export default WalletCards;
