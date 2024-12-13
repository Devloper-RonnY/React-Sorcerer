import React from "react";

const Title = ({title , setTitle}) => {
  return (
    <input
      type="text"
      value={title}
      placeholder="Title"
     onChange={(e) => setTitle((e.target.value))}
      style={{
        fontSize: "1.5em",
        fontWeight: "bold",
        width: "100%",
        marginBottom: "10px",
      }}
    />
  );
};

export default Title;
