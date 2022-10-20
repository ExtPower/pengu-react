import React, { useState } from "react";
import { CurrentTask, X_icon } from "../../assets";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
const MonitoringItem = ({ icon, name, isVerified, letter, monitorItemId, type }) => {
  const socket = useSelector((state) => state.socket)
  const location = useLocation();
  const taskId = location.pathname.split("/editTask/")[1] || null;

  function removeTask() {
    socket.emit('delete-monitored-item', { taskId, monitoredId: monitorItemId, type })
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
            icon != "" && icon != null ?
              <img src={icon} style={{ width: '43px', borderRadius: '50%', height: '43px' }} /> :
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
