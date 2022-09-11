import React, { useState } from "react";
import { CurrentTask, X_icon } from "../../assets";

const MonitoringItem = ({ icon, name, isVerified, letter }) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return <></>;

  return (
    <div className="flexitem">
      <div className="itemCurrentsInfoContainer">
        <div
          className="itemCurrentsImageContainer"
          onClick={() => setVisible(false)}
        >
          <div className="itemCurrentsImageOverlay">
            <img src={X_icon} />

          </div>
          {
            icon != null ?
              <img src={icon} /> :
              <span style={{ width: '43px', background: '#d1d1d1', borderRadius: '50%', height: '43px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{letter}</span>
          }
        </div>
        <label>{name}</label>
        {isVerified && <img src={CurrentTask} style={{ marginLeft: 3 }} />}

      </div>
    </div>
  );
};

export default MonitoringItem;
