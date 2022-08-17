import React, { useState } from "react";
import { Ellipse, CurrentTask, X_icon } from "../../assets";

const MonitoringItem = () => {
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
          <img src={Ellipse}></img>
        </div>
        <label>Cool Cats</label>
        <img src={CurrentTask} style={{ marginLeft: 3 }}></img>
      </div>
    </div>
  );
};

export default MonitoringItem;
