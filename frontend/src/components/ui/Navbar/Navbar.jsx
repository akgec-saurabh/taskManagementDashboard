import React from "react";
import classes from "./Navbar.module.css";
import { ReactComponent as Logo } from "../../../assets/icons/logo.svg";
import Button from "../Button/Button";
const Navbar = () => {
  return (
    <div className={classes.container}>
      <div className={classes.navWrapper}>
        <div className={classes.logo}>
          <Logo className={classes.icon} />
          <h1>Taskim</h1>
        </div>
        <div className={classes.authButtons}>
          <Button btnClass={classes.login}>Login</Button>
          <Button btnClass={classes.register}>Register</Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
