import React from "react";
import classes from "./TaskItem.module.css";
import { ReactComponent as Delete } from "../../../assets/icons/delete.svg";
import { ReactComponent as Update } from "../../../assets/icons/update.svg";

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
  const handleDelete = () => {
    console.log(id);
    onDelete(id);
  };

  const handleUpdate = () => {
    onUpdate(id);
  };

  return (
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
