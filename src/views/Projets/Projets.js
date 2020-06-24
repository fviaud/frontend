import React, { useState, useEffect } from "react";
import firebase from "firebase";

function App() {
  const [projets, setProjets] = useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const data = await db.collection("projets").get();
      setProjets(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
  }, []);

  return (
    <ul>
      {projets.map((projet) => (
        <li key={projets.name}>{projet.name}</li>
      ))}
    </ul>
  );
}

export default App;
