import React from "react";
import ReactDOM from "react-dom";
import classes from "./ErrorModal.module.css";
import Button from "../Button/Button";
import Card from "../Card/Card";

const Modal = ({ title = "Error", message, onClick }) => {
  return (
    <div className={classes.container}>
      <div onClick={onClick} className={classes.backdrop}></div>
      <Card>
        <div className={classes.modal}>
          <h2>{title}</h2>
          <p>{message}</p>
          <Button btnClass={classes.btn} onClick={onClick}>
            Close
          </Button>
        </div>
      </Card>
    </div>
  );
};

const ErrorModal = ({ title, message, onClick }) => {
  return ReactDOM.createPortal(
    <Modal title={title} message={message} onClick={onClick} />,
    document.getElementById("backdrop")
  );
};

export default ErrorModal;
