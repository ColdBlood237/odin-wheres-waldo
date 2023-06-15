import React from "react";

function Play({ characters, left, top, display }) {
  return (
    <div className="play" style={{ left: left, top: top, display: display }}>
      <div className="scope"></div>
      {characters.map((char) => (
        <button>{char}</button>
      ))}
    </div>
  );
}

export default Play;
