import React from "react";

const LecturerCard = ({ name, title }) => (
  <div style={{border: "1px solid black"}}>
    <h2>{name}</h2>
    <p>Title: {title}</p>
  </div>
);

export default LecturerCard;
