import { useEffect, useState } from "react";
import { Timer } from "timer-node";
import Play from "./Play";
import uniqid from "uniqid";

const timer = new Timer({ label: "score-timer" });

function Gameboard({ solutions, setTimeSecs, setTimeFormated }) {
  const [charactersLeft, setCharactersLeft] = useState(
    solutions.map((char) => char.name)
  );
  const [charsFound, setCharsFound] = useState([]);
  const [left, setLeft] = useState("0px");
  const [top, setTop] = useState("0px");
  const [display, setDisplay] = useState("none");
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(true);
  const [clickX, setClickX] = useState();
  const [clickY, setClickY] = useState();

  let x;
  let y;

  useEffect(() => {
    timer.start();
  }, []);

  useEffect(() => {
    if (charactersLeft.length === 0) {
      timer.stop();
      console.log("All chars found in : ");
      console.log(timer.time());
      setTimeSecs(timer.time().s);
      setTimeFormated(timer.format("%h:%m:%s"));
    }
  }, [charactersLeft]);

  function handleClickOnBoard(e) {
    const target = e.currentTarget;
    x = e.pageX + target.scrollLeft - target.offsetLeft;
    y = e.pageY + target.scrollTop - target.offsetTop;
    if (display === "none") {
      setLeft(`${x - 30}px`);
      setTop(`${y - 30}px`);
      setDisplay("flex");
    } else {
      setDisplay("none");
    }
    setClickX(x);
    setClickY(y);
  }

  function displayMessage() {
    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  }

  function handleCharChoice(choice) {
    solutions.forEach((solution) => {
      if (choice === solution.name) {
        if (
          clickX >= solution.left[0] &&
          clickX <= solution.left[1] &&
          clickY >= solution.top[0] &&
          clickY <= solution.top[1]
        ) {
          setMessage(`You found ${choice}. Nice`);
          const exactPositionOfTheCharacter = [
            (solution.left[0] + solution.left[1]) / 2,
            (solution.top[0] + solution.top[1]) / 2,
          ];
          setCharsFound([
            ...charsFound,
            { name: choice, position: exactPositionOfTheCharacter },
          ]);
          setCharactersLeft(
            charactersLeft.filter((char) => char !== solution.name)
          );
        } else {
          setMessage(`That's not ${choice}. Try again!`);
        }
        displayMessage();
      }
    });
  }

  return (
    <div className="gameboard" onClick={handleClickOnBoard}>
      <img
        alt="gameboard"
        src="https://zainthedev.github.io/waldo/static/media/ps2Image.3a523648.webp"
      ></img>
      {showMessage && <div className="message">{message}</div>}
      {charsFound.map((char, i) => (
        // change this style when char is found
        <div
          key={uniqid()}
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
        solutions={solutions}
        left={left}
        top={top}
        display={display}
      />
    </div>
  );
}

export default Gameboard;
