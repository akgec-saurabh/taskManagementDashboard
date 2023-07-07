import React, { useContext, useState } from "react";
import classes from "./AuthPage.module.css";
import LoginForm from "../components/authentication/LoginForm/LoginForm";
import RegistrationForm from "../components/authentication/RegistrationForm/RegistrationForm";
import ErrorModal from "../components/ui/ErrorModal/ErrorModal";
import AuthContext from "../context/auth-context";
import Loader from "../components/ui/Loader/Loader";
const AuthPage = () => {
  const authCtx = useContext(AuthContext);
  //State for User want to logIn or Register,  default page => Log in
  const [isLogin, setLogin] = useState(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleToggleForm = () => {
    setLogin((prv) => !prv);
  };

  const onLogin = async (email, password) => {
    try {
      // Fetching response

      setLoading(true);
      const response = await fetch(
        "http://localhost:5000/api/users/auth/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const responseData = await response.json();
      setLoading(false);

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      // Logging User in if response is ok.
      authCtx.onLoginHandler(responseData);
    } catch (error) {
      setLoading(false);
      setError({
        title: "Error",
        message: error.message,
      });
    }
  };

  const onRegister = async (name, email, password, role) => {
    try {
      // Fetching response

      setLoading(true);
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

      const responseData = await response.json();
      setLoading(false);
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      // Logging User in if response is ok.
      authCtx.onLoginHandler(responseData);
    } catch (error) {
      setError({
        title: "Error",
        message: error.message,
      });
    }
  };

  // Closing the modal
  const onErrorClick = () => {
    setError(null);
  };

  return (
    <div className={classes.container}>
      {loading && <Loader />}
      {error && (
        <ErrorModal
          onClick={onErrorClick}
          title={error.title}
          message={error.message}
        />
      )}
      <div className={classes.authForm}>
        {isLogin ? (
          <>
            <LoginForm onLogin={onLogin} />
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
