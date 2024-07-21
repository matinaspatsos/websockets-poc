import { useState } from "react";

function User({ signIn }) {
  const [userId, setUserId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(userId);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="userId">Enter User Id</label>
        <input
          type="number"
          id="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default User;
