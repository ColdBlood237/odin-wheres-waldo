import { useEffect, useState } from "react";
import uniqid from "uniqid";

function Leaderboard({ timeSecs, timeFormated }) {
  const [leaderboard, setLeaderboard] = useState([undefined]);
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "http://localhost:3000/64d4cf7abed00d4e911ab0aa/leaderboard"
      );
      const leaderboard = await response.json();
      setLeaderboard(leaderboard);
    }
    fetchData();
  }, []);

  async function addScoreToDB() {
    const response = await fetch(
      "http://localhost:3000/64d4cf7abed00d4e911ab0aa/leaderboard",
      {
        method: "POST",
        body: JSON.stringify({ username: username, time: timeSecs }),
      }
    );
    if (response.json() !== "") {
      setError(response.json());
    }
  }

  return (
    <div className="end-screen">
      <h3>YOUR TIME:</h3>

      <p className="time">{timeFormated}</p>

      <form id="score-form" onSubmit={addScoreToDB}>
        <label htmlFor="username">Enter your username:</label>
        <input
          id="username"
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          required
        ></input>
        <button type="submit">Submit</button>
        <p>{error}</p>
      </form>

      <h3>HIGH SCORES</h3>

      <div className="leaderboard">
        {leaderboard[0] !== undefined ? (
          leaderboard.map((player) => {
            return (
              <div key={player._id}>
                <div className="player-div">
                  <span>{player.username}</span>
                  <span>{player.time}</span>
                </div>
                <hr></hr>
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;
