import React, { FormEvent, useContext, useState } from "react";
import { LoginContext } from "../login/LoginManager";

export const CreateUser: React.FunctionComponent = () => {
  const loginContext = useContext(LoginContext);

  const [formName, setFormName] = useState("");
  const [formUsername, setFormUsername] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");

  const validatePassword = (passwordToCheck: string) => {
    const upper = /[A-Z]/;
    const lower = /[a-z]/;
    const number = /\d/;
    const special = /[-+_!@#$%^&*.,?]/;

    if (passwordToCheck.length < 8) {
      alert("Please make sure password is longer than 8 characters.");
      return false;
    }

    if (!upper.test(passwordToCheck)) {
      alert("Please make sure Password Includes an UpperCase character");
      return false;
    }

    if (!lower.test(passwordToCheck)) {
      alert("Please make sure Password Includes a LowerCase character");
      return false;
    }

    if (!number.test(passwordToCheck)) {
      alert("Please make sure Password Includes a Digit");
      return false;
    }

    if (!special.test(passwordToCheck)) {
      alert(
        "Please make sure Password Includes a special character from -+_!@#$%^&*.,?"
      );
      return false;
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      formName === "" ||
      formUsername === "" ||
      formEmail === "" ||
      formPassword === ""
    ) {
      alert("All fields required!");
    } else {
      fetch("https://localhost:5001/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa(
            `${loginContext.username}:${loginContext.password}`
          )}`,
        },
        body: JSON.stringify(FormData),
      }).then((res) => res.json());
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="Name"
            onChange={(e) => setFormName(e.target.value)}
          />
        </label>
        <label>
          Username:
          <input
            type="text"
            name="Username"
            onChange={(e) => setFormUsername(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="Email"
            onChange={(e) => setFormEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="Password"
            onChange={(e) => setFormPassword(e.target.value)}
            onBlur={(e) => validatePassword(e.target.value)}
          />
        </label>
        <input type="submit" value="Create User" />
      </form>
    </div>
  );
};
