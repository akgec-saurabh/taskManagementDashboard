import React from "react";
import classes from "./TaskList.module.css";
import TaskItem from "../TaskItem/TaskItem";

const TaskList = () => {
  return (
    <div className={classes.continer}>
      <TaskItem />
      <TaskItem />
      <TaskItem />
      <TaskItem />
      <TaskItem />
      <TaskItem />
    </div>
  );
};

export default TaskList;
