import React, { } from "react";
import {
  FeedPoint,
  FeedSettings,
} from "../../assets/index";
import { useNavigate } from 'react-router-dom';
import TaskResultItem from "./TaskResultItem";
function Testtable({ task }) {
  const navigate = useNavigate()
  function openSettings(taskId) {
    navigate(`/editTask/${taskId}`)
  }
  return (
    <div className="tableColumn">
      <div className="headitem">
        <div className="heaasind">
          <h4>{task.name}</h4>
          <label>{task.results.filter(result => new Date(result.created_time_stamp).getTime() - new Date().getTime() <= 60 * 60 * 1000).length} Alerts in the last hour</label>
        </div>
        <div className="headButns">
          <img src={FeedPoint} alt="move" />
          <img alt="open settings" src={FeedSettings} onClick={() => openSettings(task.task_id)} />
        </div>
      </div>
      <div className="tableContentColumn">
        {task.results.map((result) => <TaskResultItem result={result} />)}
      </div>
    </div>

  );
}

export default Testtable;
