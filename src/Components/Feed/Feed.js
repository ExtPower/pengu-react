import React from "react";
import "./feed.css";
import FeedTopbar from "./FeedTopbar";
import FeedTable from "./FeedTable";

function Feed() {
  return (
    <div className="feed-container">
      <FeedTopbar />
      <FeedTable />
    </div>
  );
}

export default Feed;
