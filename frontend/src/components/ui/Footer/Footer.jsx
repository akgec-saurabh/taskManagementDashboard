import React from "react";
import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={classes.container}>
      <div className={classes.containerWrapper}>
        &#169; {new Date().getFullYear()} made with &#9829; by &nbsp;
        <a target="_blank" href="https://ssaurabh.com/">
          Saurabh
        </a>
      </div>
    </div>
  );
};

export default Footer;
