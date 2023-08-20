import React from "react";

function Play({ handleCharChoice, charactersLeft, left, top, display }) {
  return (
    <div className="play" style={{ left: left, top: top, display: display }}>
      <div className="scope"></div>
      {charactersLeft.map((char) => (
        <button onClick={() => handleCharChoice(char)} key={char._id}>
          {char.name}
        </button>
      ))}
    </div>
  );
}

export default Play;
