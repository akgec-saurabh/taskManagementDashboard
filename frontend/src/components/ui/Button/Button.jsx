import React from "react";
import classes from "./Button.module.css";

const Button = ({ children, onClick, btnClass = "" }) => {
  return (
    <button className={`${classes.button} ${btnClass}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
