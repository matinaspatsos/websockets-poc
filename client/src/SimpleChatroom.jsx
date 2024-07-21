import { useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import "./App.css";

const WS_URL = "ws://127.0.0.1:8000";

function App() {
  const [value, setValue] = useState("");

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    WS_URL,
    {
      onOpen: () => {
        console.log("WebSocket connection established.");
      },
      //Will attempt to reconnect on all close events, such as server shutting down
      shouldReconnect: (closeEvent) => {
        console.log("closeEvent", closeEvent);
        return true;
      },
      protocols: "your_token_here",
    }
  );

  const send = () => {
    sendJsonMessage({ value });
  };

  const isDisabled = readyState !== ReadyState.OPEN;

  return (
    <>
      <h1>Hi there</h1>
      <div>Readystate: {ReadyState[readyState]}</div>

      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="button" disabled={isDisabled} onClick={send}>
        Send
      </button>

      {lastJsonMessage?.value && <div>{lastJsonMessage.value}</div>}
    </>
  );
}

export default App;
