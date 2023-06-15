import { useEffect, useState } from "react";
import Header from "./header";
import { Timer, Time, TimerOptions } from "timer-node";
import Gameboard from "./Gameboard";

function App() {
  const timer = new Timer({ label: "score-timer" });

  useEffect(() => {
    timer.start();
  }, []);

  return (
    <>
      <Header />
      <Gameboard />
    </>
  );
}

export default App;
