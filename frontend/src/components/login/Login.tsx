import React, { FormEvent, useState, useContext } from "react";
import { LoginContext } from "../login/LoginManager";
import { Redirect } from "react-router-dom";
import "./Login.scss";

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
    return <Redirect to="/sightings/pending" />;
  }

  return (
    <div>
      <h2 className="admin-message">ONLY ACCESSIBLE TO ADMINS!</h2>
      <div className="form">
        <form onSubmit={tryLogin}>
          <h1>Log In</h1>
          <div className="form_field">
            <div className="form_field--row">
              <label className="form_field--label">Username:</label>
              <input
                className="form_field--input"
                type="text"
                name="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div className="form_field">
            <div className="form_field--row">
              <label className="form_field--label">Password:</label>
              <input
                className="form_field--input"
                type="password"
                name="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="form_button">
            <input type="submit" value="Login" />
          </div>
        </form>
        {error && <p className="message">{error}</p>}
      </div>
    </div>
  );
};
