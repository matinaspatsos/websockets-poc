import { useState } from "react";
import "./App.css";
import User from "./User";
import Messenger from "./Messenger";

function App() {
  const [userId, setUserId] = useState();

  if (userId) {
    return <Messenger userId={userId} />;
  } else {
    return <User signIn={setUserId} />;
  }
}

export default App;
