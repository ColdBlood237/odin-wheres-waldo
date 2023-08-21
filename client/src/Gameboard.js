import { useEffect, useState } from "react";
import Play from "./Play";

function Gameboard({ setGameover, timer }) {
  const [characterClicked, setCharacterClicked] = useState("");
  const [board, setBoard] = useState({});
  const [charactersLeft, setCharactersLeft] = useState([]);
  const [charactersFetched, setCharactersFetched] = useState(false);
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
    setCharactersFetched(true);
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
    if (charactersFetched && charactersLeft.length === 0) {
      timer.stop();
      setGameover(true);
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
    charactersLeft.forEach((char) => {
      if (
        x >= char.rangeX[0] &&
        x <= char.rangeX[1] &&
        y >= char.rangeY[0] &&
        y <= char.rangeY[1]
      ) {
        setCharacterClicked(char.name);
      }
    });
  }

  function displayMessage() {
    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  }

  async function handleCharChoice(choice) {
    if (choice.name === characterClicked) {
      setMessage(`You found ${choice.name}. Nice`);
      setCharsFound([...charsFound, choice]);
      await setCharactersLeft(
        charactersLeft.filter((char) => char.name !== choice.name)
      );
    } else {
      setMessage(`That's not ${choice.name}. Try again!`);
    }
    displayMessage();
  }

  return (
    <div className="gameboard" onClick={handleClickOnBoard}>
      <img alt="gameboard" src={board.imgURL} />

      {showMessage && <div className="message">{message}</div>}
      {charsFound.map((char, i) => (
        // change this style when char is found
        <div
          key={char._id}
          id={char.name}
          className="character-found"
          style={{
            left: (char.rangeX[0] + char.rangeX[1]) / 2,
            top: (char.rangeY[0] + char.rangeY[1]) / 2,
          }}
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
