import React from "react";
import classes from "./LoginForm.module.css";
import Button from "../../ui/Button/Button";
import Input from "../../ui/Input/Input";

const LoginForm = () => {
  const onChangeHandler = (e) => {
    console.log(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle login logic
  };

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>Login</h2>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Input onChange={onChangeHandler} type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Button>Login</Button>
      </form>
    </div>
  );
};

export default LoginForm;
