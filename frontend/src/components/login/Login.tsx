import React, { FormEvent, useState, useContext } from "react";
import { LoginContext } from "../login/LoginManager";
import { PendingSightings } from "../pending-sightings-page/PendingSightings";
import { Redirect } from "react-router-dom";

export const Login: React.FunctionComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const loginContext = useContext(LoginContext);

  async function tryLogin(event: FormEvent) {
    event.preventDefault();
    if (!(await loginContext.logIn(username, password))) {
      setError(" Login details Invalid!!! ");
    }
  }

  if (loginContext.isLoggedIn) {
    return <Redirect to="/approve-sightings" />;
  }

  return (
    <>
      <div className="admin-message">
        <h2>ONLY ACCESSIBLE TO ADMINS</h2>
      </div>
      <h1>Log In</h1>
      <form onSubmit={tryLogin}>
        <label className="field">
          Username
          <input
            type={"text"}
            value={username}
            placeholder="Username"
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <label className="field">
          Password
          <input
            type={"password"}
            value={password}
            placeholder="Password"
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>

        <button type="submit">Log In</button>
      </form>
      {error && <p>{error}</p>}
    </>
  );
};
