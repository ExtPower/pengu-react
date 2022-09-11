import React, { useState } from "react";

const CreateTaskButton = ({ text, name }) => {
  const [active, setActive] = useState(false);

  return (
    <label for={text} className={`btntask ${active ? "activeTask" : ""}`}>
      <input
        name={name}
        id={text}
        onInput={() => setActive(!active)}
        type="radio"
        style={{ display: "none" }}
      />
      {text}
    </label>
  );
};

export default CreateTaskButton;
