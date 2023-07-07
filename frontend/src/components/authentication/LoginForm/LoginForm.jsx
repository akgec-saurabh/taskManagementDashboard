import React, { useState } from "react";
import classes from "./LoginForm.module.css";
import Button from "../../ui/Button/Button";
import Input from "../../ui/Input/Input";

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onEmailChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  const onPasswordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle login logic
    onLogin(email, password);
  };

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>Login</h2>
      <form className={classes.form} onSubmit={handleSubmit}>
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
        <Button>Login</Button>
      </form>
    </div>
  );
};

export default LoginForm;
