import { useEffect, useState } from "react";
import { Button, Modal, Label, TextInput, Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";

function Leaderboard({ gameover, timer, timeSecs, timeFormated }) {
  const [leaderboard, setLeaderboard] = useState([undefined]);
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(undefined);

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

  useEffect(() => {
    if (gameover) {
      setOpenModal("default");
    }
  }, [gameover]);

  async function addScoreToDB() {
    const response = await fetch(
      "http://localhost:3000/64d4cf7abed00d4e911ab0aa/leaderboard",
      {
        method: "POST",
        body: JSON.stringify({ username: username, time: timer.ms() }),
      }
    );
    if (response.json() !== "") {
      setError(response.json());
    }
  }

  return (
    <Modal show={openModal === "default"}>
      <div class="flex flex-col items-center p-8">
        <h3>YOUR TIME:</h3>
        <p className="time">{timer.format("%h:%m:%s")}</p>
        <form className="self-stretch" id="score-form" onSubmit={addScoreToDB}>
          <div className="mb-2 block">
            <Label htmlFor="username" value="Enter your username:" />
          </div>
          <TextInput
            id="username"
            placeholder="Enter username"
            required
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            type="email"
          />
          <Button className="mt-2" type="submit">
            Submit
          </Button>
          {error !== "" ? (
            <Alert color="failure" icon={HiInformationCircle}>
              <span>
                <p>
                  <span className="font-medium">{error}</span>
                </p>
              </span>
            </Alert>
          ) : (
            <></>
          )}
        </form>
        <h3>HIGH SCORES</h3>
      </div>
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
    </Modal>
  );
}

export default Leaderboard;
