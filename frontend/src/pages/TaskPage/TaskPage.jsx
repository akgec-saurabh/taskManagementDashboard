import React, { useContext, useEffect, useState } from "react";
import classes from "./TaskPage.module.css";
import TaskList from "../../components/tasks/TaskList/TaskList";
import TaskForm from "../../components/tasks/TaskForm/TaskForm";
import AuthContext from "../../context/auth-context";
import { useHttpClient } from "../../hooks/use-https";
import ErrorModal from "../../components/ui/ErrorModal/ErrorModal";
import Loader from "../../components/ui/Loader/Loader";

const TaskPage = () => {
  const authCtx = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const { sendReq, loading, error, clearError, status } = useHttpClient();

  // For Fetching Task based on the userId
  const fetchTaskById = async () => {
    const response = await sendReq(
      `${process.env.REACT_APP_BASE_URL}/api/tasks/user/${authCtx.token.userId}`,
      "GET",
      {
        "Content-Type": "application/json",
        authorization: `Bearer ${authCtx.token.token}`,
      }
    );

    if (response) {
      setTasks(response.tasks);
      console.log(response);
    }
  };

  useEffect(() => {
    fetchTaskById();
  }, []);

  //   console.log(authCtx.token.token);
  // On Adding the task
  const onTaskAddHandler = async (state) => {
    // console.log(state);

    const response = await sendReq(
      `${process.env.REACT_APP_BASE_URL}/api/tasks/`,
      "POST",
      {
        "Content-Type": "application/json",
        authorization: `Bearer ${authCtx.token.token}`,
      },
      JSON.stringify({
        ...state,
        userEmail: authCtx.token.userEmail,
        userId: authCtx.token.userId,
      })
    );

    if (response) {
      console.log("Task Added : ", response);
      setTasks((prv) => [...prv, { ...response.createdTask }]);
    }
  };

  // On Task Update
  const onUpdateHandler = async (id, title, description, dueDate, status) => {
    console.log(id);
    const response = await sendReq(
      `${process.env.REACT_APP_BASE_URL}/api/tasks/${id}`,
      "PATCH",
      {
        "Content-Type": "application/json",
        authorization: `Bearer ${authCtx.token.token}`,
      },
      JSON.stringify({
        userId: authCtx.token.userId,
        status,
        description,
        title,
        dueDate,
      })
    );

    if (response) {
      console.log("Task Added : ", response);
      setTasks((prv) => prv.filter((t) => t.id !== id));
    }
  };

  const onDeleteHandler = async (id) => {
    console.log(id);

    const response = await sendReq(
      `${process.env.REACT_APP_BASE_URL}/api/tasks/${id}`,
      "DELETE",
      {
        "Content-Type": "application/json",
        authorization: `Bearer ${authCtx.token.token}`,
      },
      JSON.stringify({ userId: authCtx.token.userId })
    );

    if (response) {
      console.log("Task Added : ", response);
      setTasks((prv) => prv.filter((t) => t.id !== id));
    }
  };

  return (
    <div className={classes.container}>
      {/* loading and Error Modal  */}
      {error && (
        <ErrorModal
          message={error}
          // if status code is 401 setting error modal title to logout and logging him out on click
          title={
            status === 401
              ? "Logout"
              : tasks.length === 0
              ? "Add Tasks"
              : "Error"
          }
          onClick={() => {
            clearError();
            if (status === 401) {
              authCtx.onLogoutHandler();
            }
          }}
        />
      )}
      {loading && <Loader />}

      <div className={classes.containerWrapper}>
        <div className={classes.nav}>
          <div>Add Task +</div>
        </div>
        <TaskForm onTaskAdd={onTaskAddHandler} />

        <TaskList
          onTaskUpdate={onUpdateHandler}
          onDelete={onDeleteHandler}
          tasks={tasks}
        />
      </div>
    </div>
  );
};

export default TaskPage;
