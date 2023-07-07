import React from "react";
import classes from "./TaskList.module.css";
import TaskItem from "../TaskItem/TaskItem";

const TaskList = ({ tasks, onDelete, onUpdate }) => {
  return (
    <div className={classes.continer}>
      {/* Rversing order for the latest order display first */}
      {tasks.length !== 0 &&
        tasks
          .toReversed()
          .map((t, i) => (
            <TaskItem
              key={i}
              id={t.id}
              title={t.title}
              description={t.description}
              dueDate={t.dueDate}
              status={t.status}
              assignedUsers={t.assignedUsers}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))}
    </div>
  );
};

export default TaskList;
