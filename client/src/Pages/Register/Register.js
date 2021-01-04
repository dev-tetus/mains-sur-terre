import React, { useState } from "react";
import axios from "../../config/axios";
function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [data, setData] = useState("");

  async function sendData() {
    try {
      const response = await axios({
        method: "post",
        url: "/auth/register",
        data: {
          email: email,
          username: username,
          password: password,
        },
      });
      console.log(response.data);
    } catch (e) {
      if (e.isAxiosError === true) console.log(e.response.data.message);
    }
  }
  return (
    <div>
      <label for="email">Email: </label>
      <input
        id="email"
        name="email"
        type="text"
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <label for="username">Username: </label>
      <input
        id="username"
        name="username"
        type="text"
        onChange={(e) => setUsername(e.target.value)}
      ></input>
      <label for="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      ></input>{" "}
      {/* //TODO: re-password */}
      <button type="submit" onClick={sendData}></button>
    </div>
  );
}

export default Register;
