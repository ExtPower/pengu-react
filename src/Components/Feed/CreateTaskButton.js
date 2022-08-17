import React, { useState } from "react";

const CreateTaskButton = ({ text }) => {
  const [active, setActive] = useState(false);

  return (
    <button
      className={`btntask ${active ? "activeTask" : ""}`}
      onClick={() => setActive(!active)}
    >
      {text}
    </button>
  );
};

export default CreateTaskButton;
