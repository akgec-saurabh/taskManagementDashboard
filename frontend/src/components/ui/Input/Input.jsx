import React from "react";
import classes from "./Input.module.css";

const Input = ({ type, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      className={classes.input}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
