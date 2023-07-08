import React, { useContext, useEffect, useState } from "react";
import classes from "./TaskPage.module.css";
import TaskList from "../../components/tasks/TaskList/TaskList";
import TaskForm from "../../components/tasks/TaskForm/TaskForm";
import AuthContext from "../../context/auth-context";
import { useHttpClient } from "../../hooks/use-https";
import ErrorModal from "../../components/ui/ErrorModal/ErrorModal";
import Loader from "../../components/ui/Loader/Loader";

const dummyUsers = [
  {
    id: 1,
    title: "Task 1",
    description: "Description 1",
    dueDate: "2023-07-10",
    status: "pending",
    assignedUsers: ["John Doe", "Jane Smith"],
  },
  {
    id: 2,
    title: "Task 2",
    description: "Description 2",
    dueDate: "2023-07-11",
    status: "inprogress",
    assignedUsers: ["Alex Wilson", "Emily Jones"],
  },
  {
    id: 3,
    title: "Task 3",
    description: "Description 3",
    dueDate: "2023-07-12",
    status: "completed",
    assignedUsers: ["David Williams", "Sarah Miller"],
  },
  {
    id: 4,
    title: "Task 4",
    description: "Description 4",
    dueDate: "2023-07-13",
    status: "pending",
    assignedUsers: ["Chris Thompson", "Michael Brown"],
  },
  {
    id: 5,
    title: "Task 5",
    description: "Description 5",
    dueDate: "2023-07-14",
    status: "inprogress",
    assignedUsers: ["Sophia Davis", "Matthew Wilson"],
  },
  {
    id: 6,
    title: "Task 6",
    description: "Description 6",
    dueDate: "2023-07-15",
    status: "completed",
    assignedUsers: ["John Doe", "Jane Smith", "Alex Wilson"],
  },
  {
    id: 7,
    title: "Task 7",
    description: "Description 7",
    dueDate: "2023-07-16",
    status: "pending",
    assignedUsers: ["Emily Jones", "David Williams"],
  },
  {
    id: 8,
    title: "Task 8",
    description: "Description 8",
    dueDate: "2023-07-17",
    status: "inprogress",
    assignedUsers: ["Sarah Miller", "Chris Thompson"],
  },
  {
    id: 9,
    title: "Task 9",
    description: "Description 9",
    dueDate: "2023-07-18",
    status: "completed",
    assignedUsers: ["Michael Brown", "Sophia Davis"],
  },
  {
    id: 10,
    title: "Task 10",
    description: "Description 10",
    dueDate: "2023-07-19",
    status: "pending",
    assignedUsers: ["Matthew Wilson", "John Doe"],
  },
];

const TaskPage = () => {
  const authCtx = useContext(AuthContext);
  const [tasks, setTasks] = useState(dummyUsers);
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
  const onUpdateHandler = (id) => {
    console.log(id);
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
          onUpdate={onUpdateHandler}
          onDelete={onDeleteHandler}
          tasks={tasks}
        />
      </div>
    </div>
  );
};

export default TaskPage;
