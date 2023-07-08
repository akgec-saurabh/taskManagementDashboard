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
      // onFocus={(e) => {
      //   if (e.target.placeholder === "Date") {
      //     e.target.type = "date";
      //   }
      // }}
    />
  );
};

export default Input;
