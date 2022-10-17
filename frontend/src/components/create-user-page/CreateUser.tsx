import React, { FormEvent, useContext, useState } from "react";
import { LoginContext } from "../login/LoginManager";

export const CreateUser: React.FunctionComponent = () => {
  const loginContext = useContext(LoginContext);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const validatePassword = (passwordToCheck: string) => {
    const upper = /(.*[A-Z].*)/;
    const lower = /(.*[a-z].*)/;
    const number = /[0-9]/;
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
      formData.name === "" ||
      formData.username === "" ||
      formData.email === "" ||
      formData.password === ""
    ) {
      alert("All fields required!");
    } else {
      fetch("https://localhost:5001/users/create", {
        method: "POST",
        headers: {
          // 'Accept': 'application/json',
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa(
            `${loginContext.username}:${loginContext.password}`
          )}`,
        },
        body: JSON.stringify(formData),
      }).then((res) => res.json());
      //.then(() => setRedirectTarget("/users"));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name :
          <input
            type="text"
            name="Name"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </label>
        <label>
          Username :
          <input
            type="text"
            name="Username"
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
        </label>
        <label>
          Email :
          <input
            type="email"
            name="Email"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </label>
        <label>
          Password :
          <input
            type="password"
            name="Password"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            onBlur={(e) => validatePassword(e.target.value)}
          />
        </label>
        <button>Create User</button>
      </form>
    </div>
  );
};
