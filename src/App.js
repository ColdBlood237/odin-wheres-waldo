import { useEffect, useState } from "react";
import Header from "./header";
import { Timer, Time, TimerOptions } from "timer-node";
import Gameboard from "./Gameboard";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

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

const solutions = await getCharacters(db);

function App() {
  const timer = new Timer({ label: "score-timer" });

  useEffect(() => {
    timer.start();
  }, []);

  return (
    <>
      <Header />
      <Gameboard solutions={solutions} />
    </>
  );
}

export default App;
