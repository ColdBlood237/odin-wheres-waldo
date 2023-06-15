import { useEffect } from "react";
import Header from "./header";
import { Timer, Time, TimerOptions } from "timer-node";

function App() {
  const timer = new Timer({ label: "score-timer" });

  useEffect(() => {
    timer.start();
  }, []);

  return (
    <>
      <Header />
    </>
  );
}

export default App;
