import { addDoc, getFirestore, collection, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import uniqid from "uniqid";

const firebaseConfig = {
  apiKey: "AIzaSyBPvuAHpYeqib997DT0KSaDOd7wNBNdVcE",
  authDomain: "odin-where-s-waldo-125c0.firebaseapp.com",
  projectId: "odin-where-s-waldo-125c0",
  storageBucket: "odin-where-s-waldo-125c0.appspot.com",
  messagingSenderId: "290098014949",
  appId: "1:290098014949:web:892b59a0ee3ea480c6020c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getScores(db) {
  const scoresCol = collection(db, "leaderboard");
  const scoresSnapshot = await getDocs(scoresCol);
  const scoresList = scoresSnapshot.docs.map((doc) => doc.data());
  return scoresList;
}

const scores = await getScores(db);

function Leaderboard({ timeSecs, timeFormated }) {
  const leaderboard = sortAndFormatScores();
  // console.log(timer.time());

  function sortAndFormatScores() {
    const sorted = scores.sort((a, b) => a.score - b.score);
    const formated = sorted.map((player) => {
      const hours = Math.floor(player.score / 3600);
      player.score = player.score - hours * 3600;
      const minutes = Math.floor(player.score / 60);
      const seconds = player.score - minutes * 60;
      return { name: player.name, time: `${hours}:${minutes}:${seconds}` };
    });
    return formated;
  }

  async function addScoreToDB(e) {
    e.preventDefault();
    const docRef = await addDoc(collection(db, "leaderboard"), {
      name: e.target.elements.gamertag.value,
      score: timeSecs,
    });
    console.log("Document written with ID: ", docRef.id);
  }

  return (
    <div className="end-screen">
      <h3>YOUR TIME:</h3>
      <p className="time">{timeFormated}</p>
      <form id="score-form" onSubmit={addScoreToDB}>
        <label htmlFor="gamertag">Enter your name:</label>
        <input
          id="gamertag"
          type="text"
          placeholder="Enter name"
          required
        ></input>
        <button type="submit">Submit</button>
      </form>
      <h3>HIGH SCORES</h3>
      <div className="leaderboard">
        {leaderboard.map((player) => {
          return (
            <div key={uniqid()}>
              <div className="player-div">
                <span>{player.name}</span>
                <span>{player.time}</span>
              </div>
              <hr></hr>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Leaderboard;
