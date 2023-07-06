import React, { useState } from "react";
import classes from "./AuthPage.module.css";
import LoginForm from "../components/authentication/LoginForm/LoginForm";
import RegistrationForm from "../components/authentication/RegistrationForm/RegistrationForm";

const AuthPage = () => {
  //State for User want to logIn or Register,  default page => Log in
  const [isLogin, setLogin] = useState(true);
  const handleToggleForm = () => {
    setLogin((prv) => !prv);
  };

  const onRegister = async (name, email, password, role) => {
    // Fetching response
    const response = await fetch(
      "http://localhost:5000/api/users/auth/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, role }),
      }
    );

    console.log(name, password, email, role);
  };

  return (
    <div className={classes.container}>
      <div className={classes.authForm}>
        {isLogin ? (
          <>
            <LoginForm />
            <p>
              Don't have an account{" "}
              <span className={classes.toggle} onClick={handleToggleForm}>
                Register
              </span>
            </p>
          </>
        ) : (
          <>
            <RegistrationForm onRegister={onRegister} />
            <p>
              Already have an account?{" "}
              <span className={classes.toggle} onClick={handleToggleForm}>
                Login
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
