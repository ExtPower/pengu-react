import React, { } from "react";
import { useSelector } from 'react-redux'
import TableTaskItem from "./TableTaskItem";
function FeedTable() {
  const tasks = useSelector((state) => state.userData.tasks)
  return (
    <div className="tableFeed">
      <div className="tableFeedHorizontalScroll">
        {
          tasks &&
          tasks.map((task) => <TableTaskItem task={task} />)
        }
      </div>
    </div>
  );
}

export default FeedTable;
