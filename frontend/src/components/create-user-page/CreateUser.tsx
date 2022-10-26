import React, { FormEvent, useContext, useState } from "react";
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

  const [addUserMessage, setAddUserMessage] = useState("");

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
    const special = /[-+_!@#'"{}$%^&<>=*.,?]/;

    if (passwordToCheck.length < requiredLength) {
      setPasswordMessage(
        `Ensure password length is more than ${requiredLength}`
      );
      return false;
    }
    if (!upper.test(passwordToCheck)) {
      setPasswordMessage("Ensure password includes an upper case letter");
      return false;
    }
    if (!lower.test(passwordToCheck)) {
      setPasswordMessage("Ensure password includes a lower case letter");
      return false;
    }
    if (!number.test(passwordToCheck)) {
      setPasswordMessage("Ensure password includes a digit");
      return false;
    }
    if (!special.test(passwordToCheck)) {
      setPasswordMessage("Ensure password includes a special character");
      return false;
    }
    setPasswordMessage("");
    return true;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      validateName(formName) &&
      validateUsername(formUsername) &&
      validateEmail(formEmail) &&
      validatePassword(formPassword)
    ) {
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
      })
        .then((res) => {
          setAddUserMessage(
            res.ok
              ? "User added successfully!"
              : "Sorry, couldn't add the user!"
          );
        })
        .then(() => (e.target as HTMLFormElement).reset());
    }
  };

  return (
    <div className="create-user-form">
      <form onSubmit={handleSubmit}>
        <h1 className="create-user-form-heading">Create New User</h1>
        <div className="create-user-form-field">
          <label className="create-user-form-field__label">
            Name:
            <input
              className="create-user-form-field__input"
              type="text"
              name="Name"
              onChange={(e) => validateName(e.target.value)}
            />
          </label>
          {nameMessage ? (
            <p className="create-user-form-message">{nameMessage}</p>
          ) : (
            <></>
          )}
        </div>
        <div className="create-user-form-field">
          <label className="create-user-form-field__label">
            Username:
            <input
              className="create-user-form-field__input"
              type="text"
              name="Username"
              onChange={(e) => validateUsername(e.target.value)}
            />
          </label>
          {usernameMessage ? (
            <p className="create-user-form-message">{usernameMessage}</p>
          ) : (
            <></>
          )}
        </div>
        <div className="create-user-form-field">
          <label className="create-user-form-field__label">
            Email:
            <input
              className="create-user-form-field__input"
              type="email"
              name="Email"
              onChange={(e) => validateEmail(e.target.value)}
            />
          </label>
          {emailMessage ? (
            <p className="create-user-form-message">{emailMessage}</p>
          ) : (
            <></>
          )}
        </div>
        <div className="create-user-form-field">
          <label className="create-user-form-field__label">
            Password:
            <input
              className="create-user-form-field__input"
              type="password"
              name="Password"
              onChange={(e) => validatePassword(e.target.value)}
            />
          </label>
          {passwordMessage ? (
            <p className="create-user-form-message">{passwordMessage}</p>
          ) : (
            <></>
          )}
        </div>
        <div className="create-user-form-button">
          <input type="submit" value="Create User" />
        </div>
      </form>
      {addUserMessage ? (
        <p className="create-user-form-add-user-message">{addUserMessage}</p>
      ) : (
        <></>
      )}
    </div>
  );
};
