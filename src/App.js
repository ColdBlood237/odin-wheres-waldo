import { useEffect, useState } from "react";
import Header from "./header";
import Gameboard from "./Gameboard";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import Leaderboard from "./Leaderboard";

// Your web app's Firebase configuration
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

async function getCharacters(db) {
  const positionsCol = collection(db, "positions");
  const positionSnapshot = await getDocs(positionsCol);
  const positionsList = positionSnapshot.docs.map((doc) => doc.data());
  return positionsList;
}

// async function getScores(db) {
//   const scoresCol = collection(db, "leaderboard");
//   const scoresSnapshot = await getDocs(scoresCol);
//   const scoresList = scoresSnapshot.docs.map((doc) => doc.data());
//   return scoresList;
// }

const solutions = await getCharacters(db);
// const scores = await getScores(db);

function App() {
  const [timeFormated, setTimeFormated] = useState();
  const [timeSecs, setTimeSecs] = useState(0);
  const [, setTrigger] = useState(false);

  // useEffect(() => {
  //   if (timer.isStopped()) {
  //     setTimerStopped(true);
  //     console.log("timer stopped in App component");
  //   }
  // }, [timerStopped]);

  useEffect(() => {
    setTrigger((prevTrigger) => !prevTrigger);
  }, [timeSecs]);

  return (
    <>
      <Header />
      {timeSecs === 0 ? (
        <Gameboard
          solutions={solutions}
          setTimeSecs={setTimeSecs}
          setTimeFormated={setTimeFormated}
        />
      ) : (
        <Leaderboard timeSecs={timeSecs} timeFormated={timeFormated} />
      )}
    </>
  );
}

export default App;
