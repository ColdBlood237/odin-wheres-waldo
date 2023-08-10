import React from "react";
import uniqid from "uniqid";

function Play({ handleCharChoice, charactersLeft, left, top, display }) {
  function handleClick(e) {
    handleCharChoice(e.target.textContent);
  }

  return (
    <div className="play" style={{ left: left, top: top, display: display }}>
      <div className="scope"></div>
      {charactersLeft.map((char) => (
        <button onClick={handleClick} key={uniqid()}>
          {char}
        </button>
      ))}
    </div>
  );
}

export default Play;
