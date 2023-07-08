import React, { useState } from "react";
import classes from "./TaskItem.module.css";
import { ReactComponent as Delete } from "../../../assets/icons/delete.svg";
import { ReactComponent as Update } from "../../../assets/icons/update.svg";
import TaskForm from "../TaskForm/TaskForm";

const TaskItem = ({
  id,
  title,
  description,
  dueDate,
  status,
  onDelete,
  onUpdate,
  assignedUsers,
}) => {
  const [editMode, setEditMode] = useState(false);

  const handleDelete = () => {
    console.log(id);
    onDelete(id);
  };

  // on form submitted
  const onTaskUpdate = (e) => {
    console.log(e);
    onUpdate({ id, ...e });
  };

  // When edit option is pressed
  const handleEdit = () => {
    // onUpdate(id);
    setEditMode((prv) => !prv);
  };

  return (
    <>
      <div className={classes.taskItem}>
        <h3 className={classes.title}>{title}</h3>
        <p className={classes.description}>{description}</p>
        <p className={classes.dueDate}>{dueDate.split("T")[0]}</p>
        <p className={classes.status}>{status}</p>
        <select name="users" id="users">
          {assignedUsers &&
            assignedUsers.map((u, i) => (
              <option key={i} value="">
                {u.userEmail}
              </option>
            ))}
        </select>
        {/* <p className={classes.assignedUser}> {assignedUser}</p> */}
        <div className={classes.buttonContainer}>
          <button className={classes.updateButton} onClick={handleEdit}>
            <Update className={classes.icon} />
          </button>
          <button className={classes.deleteButton} onClick={handleDelete}>
            <Delete className={classes.icon} />
          </button>
        </div>
      </div>
      {editMode && <TaskForm onTaskAdd={onTaskUpdate} />}
    </>
  );
};

export default TaskItem;
