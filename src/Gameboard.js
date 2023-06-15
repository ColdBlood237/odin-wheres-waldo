import { useState } from "react";
import Play from "./Play";

function Gameboard() {
  const [characters, setCharacters] = useState(["Jak", "Ratchet", "Yuna"]);
  const [left, setLeft] = useState("0px");
  const [top, setTop] = useState("0px");
  const [display, setDisplay] = useState("none");

  function handleClick(e) {
    const target = e.currentTarget;
    if (display === "none") {
      setDisplay("flex");
    } else {
      setDisplay("none");
    }
    setLeft(`${e.pageX + target.scrollLeft - target.offsetLeft}px`);
    setTop(`${e.pageY + target.scrollTop - target.offsetTop}px`);
  }

  return (
    <div className="gameboard" onClick={handleClick}>
      <img src="https://zainthedev.github.io/waldo/static/media/ps2Image.3a523648.webp"></img>
      <Play characters={characters} left={left} top={top} display={display} />
    </div>
  );
}

export default Gameboard;
