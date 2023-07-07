import React from "react";
import ReactDOM from "react-dom";
import { ReactComponent as Loading } from "../../../assets/icons/loading.svg";
import classes from "./Loader.module.css";

const Load = () => {
  return (
    <div className={classes.container}>
      <div className={classes.loader}>
        <Loading />
      </div>
    </div>
  );
};

const Loader = () => {
  return ReactDOM.createPortal(<Load />, document.getElementById("loader"));
};

export default Loader;
