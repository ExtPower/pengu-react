import React, { } from "react";
import { useSelector } from 'react-redux'
import TableTaskItem from "./TableTaskItem";
import { Loader } from "../../assets";
function FeedTable() {
  const userData = useSelector((state) => state.userData)
  const tasks = useSelector((state) => state.userData.tasks)
  return (
    <div className="tableFeed">
      {
        userData.loading == true
          ?
          <img src={Loader} style={{
            height: 300,
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)"
          }}
            alt="" />
          : <div className="tableFeedHorizontalScroll">
            {
              tasks &&
              tasks.map((task) => <TableTaskItem task={task} />)
            }
          </div>
      }

    </div>
  );
}

export default FeedTable;
