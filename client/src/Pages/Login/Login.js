import React, { useEffect, useState } from "react";
import axios from "../../config/axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //*Send login data to server
  async function sendData() {
    try {
      const response = await axios({
        url: "/auth/login",
        method: "post",
        data: {
          username: username,
          password: password,
        },
      });
      console.log(response);
      if (response.status === 200) {
        console.log("here");
        localStorage.setItem("auth", true);
        // localStorage.setItem("user", response.dat)
        setIsLoggedIn(true);
      }
      // console.log(response.message);
    } catch (error) {
      console.log(error.response.data.message);
    }
  }

  //* Do logout
  async function doLogout() {
    try {
      const response = await axios({
        url: "/auth/logout",
        method: "DELETE",
      });
      if (response.status === 200) {
        localStorage.setItem("auth", false);
        setIsLoggedIn(false);
        console.log(response.data);
      }
    } catch (error) {
      console.log(error.response);
    }
  }

  //*Check if logged in
  useEffect(() => {
    if (localStorage.getItem("auth") === true) {
      return setIsLoggedIn(true);
    }
  }, []);
  return (
    <div>
      <label>Username or email: </label>
      <input type="text" onChange={(e) => setUsername(e.target.value)}></input>
      <label>Password: </label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <button type="submit" onClick={sendData}>
        Log In
      </button>
      {isLoggedIn ? (
        <div>
          You are now connected
          <button onClick={doLogout}>Log out</button>
        </div>
      ) : null}
    </div>
  );
}

export default Login;
