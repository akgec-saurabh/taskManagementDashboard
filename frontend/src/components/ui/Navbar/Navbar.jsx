import React, { useContext } from "react";
import classes from "./Navbar.module.css";
import { ReactComponent as Logo } from "../../../assets/icons/logo.svg";
import Button from "../Button/Button";
import AuthContext from "../../../context/auth-context";
const Navbar = () => {
  const authCtx = useContext(AuthContext);
  return (
    <div className={classes.container}>
      <div className={classes.navWrapper}>
        <div className={classes.logo}>
          <Logo className={classes.icon} />
          <h1>Taskim</h1>
        </div>
        {authCtx.isLogin && (
          <div className={classes.authButtons}>
            <Button onClick={authCtx.onLogoutHandler} btnClass={classes.logout}>
              Logout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
