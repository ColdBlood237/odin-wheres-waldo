import { useEffect, useState } from "react";
import Play from "./Play";

function Gameboard({ timer, setTimeSecs, setTimeFormated }) {
  const [characterClicked, setCharacterClicked] = useState("");
  const [board, setBoard] = useState({});
  const [charactersLeft, setCharactersLeft] = useState([]);
  const [charsFound, setCharsFound] = useState([]);
  const [left, setLeft] = useState("0px");
  const [top, setTop] = useState("0px");
  const [display, setDisplay] = useState("none");
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "http://localhost:3000/64d4cf7abed00d4e911ab0aa/characters"
      );
      const characters = await response.json();
      setCharactersLeft(characters);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "http://localhost:3000/64d4cf7abed00d4e911ab0aa"
      );
      const board = await response.json();
      setBoard(board);
    }
    fetchData();
  }, []);

  useEffect(() => {
    timer.start();
  }, []);

  useEffect(() => {
    if (charactersLeft.length === 0) {
      timer.stop();
      setTimeSecs(timer.time().s);
      setTimeFormated(timer.format("%h:%m:%s"));
    }
  }, [charactersLeft]);

  function handleClickOnBoard(e) {
    const target = e.currentTarget;
    let x = e.pageX + target.scrollLeft - target.offsetLeft;
    let y = e.pageY + target.scrollTop - target.offsetTop;
    if (display === "none") {
      setLeft(`${x - 30}px`);
      setTop(`${y - 30}px`);
      setDisplay("flex");
    } else {
      setDisplay("none");
    }
    if (e.target.tagName === "area") {
      setCharacterClicked(e.target.id);
    }
  }

  function displayMessage() {
    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  }

  function handleCharChoice(choice) {
    if (choice.name === characterClicked) {
      setMessage(`You found ${choice}. Nice`);
      setCharsFound([...charsFound, choice]);
      setCharactersLeft(
        charactersLeft.filter((char) => char.name !== choice.name)
      );
    } else {
      setMessage(`That's not ${choice.name}. Try again!`);
    }
    displayMessage();
  }

  return (
    <div className="gameboard" onClick={handleClickOnBoard}>
      <img alt="gameboard" src={board.imgURL} useMap="#boardmap"></img>
      <map name="boardmap">
        {charactersLeft.map((char) => (
          <area
            alt={char.name}
            shape="rect"
            key={char._id}
            id={char.name}
            coords={char.coords}
            onClick={() => {
              console.log(char.name);
            }}
          ></area>
        ))}
        <area alt="test area" shape="rect" coords="0,0"></area>
      </map>
      {showMessage && <div className="message">{message}</div>}
      {charsFound.map((char, i) => (
        // change this style when char is found
        <div
          key={char._id}
          id={char.name}
          className="character-found"
          style={{ left: char.position[0], top: char.position[1] }}
        >
          {char.name}
        </div>
      ))}
      <Play
        handleCharChoice={handleCharChoice}
        charactersLeft={charactersLeft}
        left={left}
        top={top}
        display={display}
      />
    </div>
  );
}

export default Gameboard;
