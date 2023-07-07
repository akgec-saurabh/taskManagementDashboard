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
  const { sendReq, loading, error, clearError } = useHttpClient();

  // For Fetching Task based on the userId
  const fetchTaskById = async () => {
    const response = await sendReq(
      `http://localhost:5000/api/tasks/user/${authCtx.token.userId}`,
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
      "http://localhost:5000/api/tasks/",
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
  const onUpdateHandler = (id) => {
    console.log(id);
  };

  const onDeleteHandler = async (id) => {
    console.log(id);

    const response = await sendReq(
      `http://localhost:5000/api/tasks/${id}`,
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
      {error && <ErrorModal message={error} onClick={clearError} />}
      {loading && <Loader />}

      <div className={classes.containerWrapper}>
        <div className={classes.nav}>
          <div>Add Task +</div>
        </div>
        <TaskForm onTaskAdd={onTaskAddHandler} />

        <TaskList
          onUpdate={onUpdateHandler}
          onDelete={onDeleteHandler}
          tasks={tasks}
        />
      </div>
    </div>
  );
};

export default TaskPage;
