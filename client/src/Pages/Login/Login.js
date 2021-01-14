import React, { useEffect, useState } from "react";
import axios from "../../config/axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); //*Local state for auth

  //TODO App.js useEffect(fetch(isLoggedIn), []) -> change redux state

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

      if (response.status === 200) {
        console.log(response.data);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log(error);
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
        setIsLoggedIn(false);
        console.log(response.data);
      }
    } catch (error) {
      console.log(error.response);
    }
  }

  //*Check if logged in
  useEffect(async () => {
    try {
      const response = await axios({
        method: "get",
        url: "/auth/session",
      });
      if (response.status === 200) {
        setIsLoggedIn(true);
        return console.log(response.data);
      }
    } catch (error) {
      if (error) return console.log(error);
    }
  }, []); //esto comprueba nada mas cargar la pagina si el user esta autenticado
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
