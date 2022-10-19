import React, { FormEvent, useContext, useEffect, useState } from "react";
import { LoginContext } from "../login/LoginManager";
import "./CreateUser.scss";

export const CreateUser: React.FunctionComponent = () => {
  const loginContext = useContext(LoginContext);

  const [formName, setFormName] = useState("");
  const [nameMessage, setNameMessage] = useState("");

  const [formUsername, setFormUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");

  const [formEmail, setFormEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState("");

  const [formPassword, setFormPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const validateName = (nameToCheck: string) => {
    setFormName(nameToCheck);
    if (nameToCheck == "") {
      setNameMessage("Name must not be empty");
      return false;
    }
    setNameMessage("");
    return true;
  };

  const validateUsername = (usernameToCheck: string) => {
    setFormUsername(usernameToCheck);
    if (usernameToCheck == "") {
      setUsernameMessage("Username must not be empty");
      return false;
    }
    setUsernameMessage("");
    return true;
  };

  const validateEmail = (emailToCheck: string) => {
    setFormEmail(emailToCheck);
    const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]{2,}$/i;
    if (!emailRegex.test(emailToCheck)) {
      setEmailMessage("Please enter a valid email address");
      return false;
    }
    setEmailMessage("");
    return true;
  };

  const validatePassword = (passwordToCheck: string) => {
    setFormPassword(passwordToCheck);

    const requiredLength = 8;
    const upper = /[A-Z]/;
    const lower = /[a-z]/;
    const number = /\d/;
    const special = /[-+_!@#$%^&*.,?]/;

    if (passwordToCheck.length < requiredLength) {
      setPasswordMessage(
        "Please make sure password is longer than 8 characters."
      );
      return false;
    }
    if (!upper.test(passwordToCheck)) {
      setPasswordMessage(
        "Please make sure Password Includes an UpperCase character"
      );
      return false;
    }
    if (!lower.test(passwordToCheck)) {
      setPasswordMessage(
        "Please make sure Password Includes a LowerCase character"
      );
      return false;
    }
    if (!number.test(passwordToCheck)) {
      setPasswordMessage("Please make sure Password Includes a Digit");
      return false;
    }
    if (!special.test(passwordToCheck)) {
      setPasswordMessage(
        "Please make sure Password Includes a special character from -+_!@#$%^&*.,?"
      );
      return false;
    }
    setPasswordMessage("");
    return true;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch("https://localhost:5001/users/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(
          `${loginContext.username}:${loginContext.password}`
        )}`,
      },
      body: JSON.stringify({
        name: formName,
        username: formUsername,
        email: formEmail,
        password: formPassword,
      }),
    }).then((res) => res.json());
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <h1 className="form_heading">Create New User</h1>
        <div className="form_field">
          <label className="form_field--label">Name:</label>
          <input
            className="form_field--input"
            type="text"
            name="Name"
            onChange={(e) => validateName(e.target.value)}
            onBlur={(e) => validateName(e.target.value)}
          />
          <p className="message">{nameMessage}</p>
        </div>

        <div className="form_field">
          <label className="form_field--label">Username:</label>
          <input
            className="form_field--input"
            type="text"
            name="Username"
            onChange={(e) => validateUsername(e.target.value)}
            onBlur={(e) => validateUsername(e.target.value)}
          />
          <p className="message">{usernameMessage}</p>
        </div>

        <div className="form_field">
          <label className="form_field--label">Email:</label>
          <input
            className="form_field--input"
            type="email"
            name="Email"
            onChange={(e) => validateEmail(e.target.value)}
            onBlur={(e) => validateEmail(e.target.value)}
          />
          <p className="message">{emailMessage}</p>
        </div>

        <div className="form_field">
          <label className="form_field--label">Password:</label>
          <input
            className="form_field--input"
            type="password"
            name="Password"
            onChange={(e) => validatePassword(e.target.value)}
            onBlur={(e) => validatePassword(e.target.value)}
          />
          <p className="message">{passwordMessage}</p>
        </div>
        <div className="form_button">
          <input type="submit" value="Create User" />
        </div>
      </form>
    </div>
  );
};
