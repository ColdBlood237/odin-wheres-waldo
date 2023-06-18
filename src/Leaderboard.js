import { addDoc, getFirestore, collection, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { useEffect } from "react";

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
console.log(db);

async function getScores(db) {
  const scoresCol = collection(db, "leaderboard");
  const scoresSnapshot = await getDocs(scoresCol);
  const scoresList = scoresSnapshot.docs.map((doc) => doc.data());
  return scoresList;
}

const scores = await getScores(db);

function Leaderboard({ timer }) {
  const scoresList = sortAndFormatScores();

  function sortAndFormatScores() {
    const sorted = scores.map((score) => score.score).sort();
    const formated = sorted.map((time) => {
      const hours = Math.floor(time / 3600);
      time = time - hours * 3600;
      const minutes = Math.floor(time / 60);
      const seconds = time - minutes * 60;
      return `${hours}:${minutes}:${seconds}`;
    });
    return formated;
  }

  async function addScoreToDB() {
    const docRef = await addDoc(collection(db, "leaderboard"), {
      name: "Add Test",
      score: timer.time().s,
    });
    console.log("Document written with ID: ", docRef.id);
  }

  useEffect(() => {
    addScoreToDB();
  }, []);

  return <div className="end-screen"></div>;
}

export default Leaderboard;
