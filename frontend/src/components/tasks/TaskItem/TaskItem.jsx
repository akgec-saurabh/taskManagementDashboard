import React from "react";
import classes from "./TaskItem.module.css";
import { ReactComponent as Delete } from "../../../assets/icons/delete.svg";
import { ReactComponent as Update } from "../../../assets/icons/update.svg";

const task = {
  id: 1,
  title: "Sample Task",
  description: "This is a sample task description.",
  dueDate: "2023-07-10",
  status: "In Progress",
  assignedUser: "John Doe",
};

const TaskItem = ({ onDelete, onUpdate }) => {
  const handleDelete = () => {
    onDelete(task.id);
  };

  const handleUpdate = () => {
    onUpdate(task.id);
  };

  return (
    <div className={classes.taskItem}>
      <h3 className={classes.title}>{task.title}</h3>
      <p className={classes.description}>{task.description}</p>
      <p className={classes.dueDate}>{task.dueDate}</p>
      <p className={classes.status}>{task.status}</p>
      <p className={classes.assignedUser}> {task.assignedUser}</p>
      <div className={classes.buttonContainer}>
        <button className={classes.updateButton} onClick={handleUpdate}>
          <Update className={classes.icon} />
        </button>
        <button className={classes.deleteButton} onClick={handleDelete}>
          <Delete className={classes.icon} />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
