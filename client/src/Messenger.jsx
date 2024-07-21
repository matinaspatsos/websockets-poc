import { useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

const WS_PROTOCOL = import.meta.env.DEV ? "ws" : "wss";
const WS_URL = `${WS_PROTOCOL}://localhost:3000/`;
// const WS_URL = `${WS_PROTOCOL}://${location.host}/events`;

function Messenger({ userId }) {
  const [receiverId, setReceiverId] = useState("");
  const [message, setMessage] = useState("");

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
      protocols: userId,
    }
  );
  if (lastJsonMessage) {
    console.log(lastJsonMessage);
  }

  const handleForm = (e) => {
    e.preventDefault();
    sendJsonMessage({ receiverId, message });
  };

  if (readyState === ReadyState.OPEN) {
    return (
      <form onSubmit={handleForm}>
        <h1>Send message</h1>
        <div>
          <label htmlFor="receiverId">User Id</label>
          <input
            type="number"
            id="userId"
            value={receiverId}
            onChange={(e) => setReceiverId(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <input
            type="text"
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <button>Submit</button>
        <div>{lastJsonMessage?.message}</div>
      </form>
    );
  } else {
    return <div>Loading ...</div>;
  }
}

export default Messenger;
