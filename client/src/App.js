import { useState } from "react";
import Header from "./Header";
import Gameboard from "./Gameboard";
import Leaderboard from "./Leaderboard";
import StartingModal from "./StartingModal";
import { Timer } from "timer-node";

function App() {
  const [timer] = useState(new Timer({ label: "score-timer" }));
  const [gameover, setGameover] = useState(false);

  return (
    <>
      <Header timer={timer} />
      <Gameboard setGameover={setGameover} timer={timer} />
      <StartingModal timer={timer} />
      <Leaderboard gameover={gameover} timer={timer} />
    </>
  );
}

export default App;
