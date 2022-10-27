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
    <>
      <p className="admin-message">ONLY ACCESSIBLE TO ADMINS!</p>
      <div className="login-form">
        <form onSubmit={tryLogin}>
          <h1>Log In</h1>
          <div className="login-form__field">
            <label>
              Username:
              <input
                type="text"
                name="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
          </div>
          <div className="login-form__field">
            <label>
              Password:
              <input
                type="password"
                name="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <div className="login-form__button">
            <input type="submit" value="Login" />
          </div>
        </form>
        {error && <p className="login-form__message">{error}</p>}
      </div>
    </>
  );
};
