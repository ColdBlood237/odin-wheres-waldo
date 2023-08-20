import { useState, useEffect } from "react";

function Header({ timer, gameRunning }) {
  const [timerSecs, setTimerSecs] = useState(timer.time().s);

  useEffect(() => {
    const interval = setInterval(() => setTimerSecs(timer.time().s), 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="header">
      <div className="char">
        <img src="https://zainthedev.github.io/waldo/static/media/jakHeader.6348a4ba.svg"></img>
        <p>Jak</p>
      </div>
      <div className="char">
        <img src="https://zainthedev.github.io/waldo/static/media/ratchetHeader.1867813b.svg"></img>
        <p>Ratchet</p>
      </div>
      <div className="char">
        <img src="https://zainthedev.github.io/waldo/static/media/yunaHeader.ec29f948.svg"></img>
        <p>Yuna</p>
      </div>
      <div className="timer">{timer.format("%h:%m:%s")}</div>
    </div>
  );
}

export default Header;
