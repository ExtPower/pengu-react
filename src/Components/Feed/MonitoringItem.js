import React, { useState } from "react";
import { CurrentTask, X_icon } from "../../assets";

const MonitoringItem = ({ icon, name, isVerified, letter }) => {
  function removeTask() {

  }

  return (
    <div className="flexitem">
      <div className="itemCurrentsInfoContainer">
        <div
          className="itemCurrentsImageContainer"
          onClick={removeTask}
        >
          <div className="itemCurrentsImageOverlay">
            <img src={X_icon} />

          </div>
          {
            icon != "" ?
              <img src={icon} /> :
              <span style={{ width: '43px', background: '#6362F0', color: "white", borderRadius: '50%', height: '43px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{letter}</span>
          }
        </div>
        <label>{name}</label>
        {isVerified && <img src={CurrentTask} style={{ marginLeft: 3 }} />}

      </div>
    </div>
  );
};

export default MonitoringItem;
