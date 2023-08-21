import { useEffect, useState } from "react";
import { Button, Modal, Label, TextInput, Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import axios from "axios";

function Leaderboard({ gameover, timer }) {
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

  async function addScoreToDB(e) {
    e.preventDefault();
    // await fetch("http://localhost:3000/64d4cf7abed00d4e911ab0aa/leaderboard", {
    //   method: "POST",
    //   body: JSON.stringify({ username: username, time: timer.ms() }),
    // });
    // if (response.json() !== "") {
    //   // setError(response.json());
    // }

    try {
      const response = await axios.post(
        "http://localhost:3000/64d4cf7abed00d4e911ab0aa/leaderboard",
        { username: username, time: timer.ms() }
      );
      window.location = "/";
    } catch (error) {
      setError(error.response.data);
    }
  }

  function msToTime(duration) {
    var milliseconds = Math.floor((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
  }

  return (
    <Modal show={openModal === "default"}>
      <div className="flex flex-col items-center p-8">
        <h3>YOUR TIME:</h3>
        <p className="time">{timer.format("%h:%m:%s.%ms")}</p>
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
            type="text"
          />
          <Button className="mt-2" type="submit">
            Submit
          </Button>
          {error !== "" ? (
            <Alert className="my-2" color="failure" icon={HiInformationCircle}>
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
                  <span>{msToTime(player.time)}</span>
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
