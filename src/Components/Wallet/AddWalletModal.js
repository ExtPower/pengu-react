import React, { useState } from "react";

import { Cat_wallet_icon, Purple_check, Wallet_icon } from "../../assets/index";

const AddWalletModal = () => {
  const [addWalletMode, setAddWalletMode] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const WalletRow = ({ index }) => {
    return (
      <div className="addWalletRow" onClick={() => setActiveIndex(index)}>
        <div className="addWalletRowInfo">
          <img src={Cat_wallet_icon}></img>
          <h3>0u345..67</h3>
        </div>
        {index === activeIndex && <img src={Purple_check} />}
      </div>
    );
  };

  return (
    <div className="addWalletModal">
      <h2 className="addWalletModalTitle">Wallets</h2>
      <h2 className="addWalletModalSubtitle">1 NEW</h2>
      {addWalletMode ? (
        <div className="addWalletContainer">
          <div>
            <h3>Add Wallet</h3>
            <h4>Enter details</h4>
            <input placeholder="Enter Key"></input>
            <input placeholder="Enter Password"></input>
          </div>
          <div
            className="addWalletAddButton"
            onClick={() => setAddWalletMode(!addWalletMode)}
          >
            <img src={Wallet_icon} />
            <p>Add Wallet</p>
          </div>
        </div>
      ) : (
        <div className="addWalletCurrentWalletsContainer">
          {[0, 1, 2, 3].map((item, i) => (
            <WalletRow index={i} key={i} />
          ))}
          <div
            className="addWalletAddButton"
            onClick={() => setAddWalletMode(!addWalletMode)}
          >
            <img src={Wallet_icon} />
            <p>Add Wallet</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddWalletModal;
