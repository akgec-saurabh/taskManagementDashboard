import React, { useState } from "react";
import classes from "./RegistrationForm.module.css";
import Button from "../../ui/Button/Button";
import Input from "../../ui/Input/Input";

const RegistrationForm = ({ onRegister }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle registration logic

    //pass Everything to parent component so that auth can be done
    onRegister(name, email, password, role);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const onNameChangeHandler = (e) => {
    setName(e.target.value);
  };
  const onEmailChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  const onPasswordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>Registration</h2>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Input onChange={onNameChangeHandler} type="text" placeholder="Name" />
        <Input
          onChange={onEmailChangeHandler}
          type="email"
          placeholder="Email"
        />
        <Input
          onChange={onPasswordChangeHandler}
          type="password"
          placeholder="Password"
        />
        <div className={classes.role}>
          <label>
            <input
              type="radio"
              value="user"
              checked={role === "user"}
              onChange={handleRoleChange}
            />
            User
          </label>
          <label>
            <input
              type="radio"
              value="admin"
              checked={role === "admin"}
              onChange={handleRoleChange}
            />
            Admin
          </label>
        </div>
        <Button type="submit">Register</Button>
      </form>
    </div>
  );
};

export default RegistrationForm;
