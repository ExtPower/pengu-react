import React from "react";
import CreateTask from "./CreateTask";
import CurrentMoniter from "./CurrentMoniter";
import FeedTopbar from "./FeedTopbar";

function MonitoringTask() {
  return (
    <div>
      <FeedTopbar />
      <div className="createTaskDivider"></div>
      <CreateTask />
      <CurrentMoniter />
    </div>
  );
}

export default MonitoringTask;
