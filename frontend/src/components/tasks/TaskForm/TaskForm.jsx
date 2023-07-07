import React, { useReducer } from "react";
import classes from "./TaskForm.module.css";
import Input from "../../ui/Input/Input";
import Button from "../../ui/Button/Button";

const DummyUser = [
  {
    name: "John Doe",
    username: "john.doe",
    email: "john.doe@example.com",
    password: "123456",
  },
  {
    name: "Jane Smith",
    username: "jane.smith",
    email: "jane.smith@example.com",
    password: "password123",
  },
  {
    name: "Alex Wilson",
    username: "alex.wilson",
    email: "alex.wilson@example.com",
    password: "testpass",
  },
  {
    name: "Emily Jones",
    username: "emily.jones",
    email: "emily.jones@example.com",
    password: "p@ssw0rd",
  },
  {
    name: "David Williams",
    username: "david.williams",
    email: "david.williams@example.com",
    password: "mysecret",
  },
  {
    name: "Sarah Miller",
    username: "sarah.miller",
    email: "sarah.miller@example.com",
    password: "ilovecoding",
  },
  {
    name: "Chris Thompson",
    username: "chris.thompson",
    email: "chris.thompson@example.com",
    password: "123abc!",
  },
  {
    name: "Michael Brown",
    username: "michael.brown",
    email: "michael.brown@example.com",
    password: "brownie123",
  },
  {
    name: "Sophia Davis",
    username: "sophia.davis",
    email: "sophia.davis@example.com",
    password: "davis456",
  },
  {
    name: "Matthew Wilson",
    username: "matthew.wilson",
    email: "matthew.wilson@example.com",
    password: "wilson789",
  },
];

const reducerFunc = (state, action) => {
  if (action.type === "TITLE_CHANGE") {
    return { ...state, title: action.payload };
  } else if (action.type === "DESCRIPTION_CHANGE") {
    return { ...state, description: action.payload };
  } else if (action.type === "DUE_DATE") {
    return { ...state, dueDate: action.payload };
  } else if (action.type === "STATUS") {
    return { ...state, status: action.payload };
  }

  return state;
};

const TaskForm = ({ onTaskAdd }) => {
  const [state, dispach] = useReducer(reducerFunc, {
    title: "",
    description: "",
    dueDate: "",
    status: "pending",
    assignedUser: [],
  });

  const onTitleChange = (e) => {
    dispach({ type: "TITLE_CHANGE", payload: e.target.value });
  };

  const onDescriptionChange = (e) => {
    dispach({ type: "DESCRIPTION_CHANGE", payload: e.target.value });
  };

  const onDateChange = (e) => {
    dispach({ type: "DUE_DATE", payload: e.target.value });
  };

  const onStatusChange = (e) => {
    dispach({ type: "STATUS", payload: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);

    // Passing all the State to the parent Task Page to handle all the logic
    onTaskAdd(state);
  };

  return (
    <div className={classes.container}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Input onChange={onTitleChange} type="text" placeholder="Title" />
        <Input
          onChange={onDescriptionChange}
          type="text"
          placeholder="Description"
        />
        <Input onChange={onDateChange} type="date" placeholder="Due Date" />
        <select
          className={classes.status}
          value={state.status}
          onChange={onStatusChange}
          name="status"
        >
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <select className={classes.users} name="users" id="users">
          {DummyUser.map((u, i) => (
            <option key={i} value={`${u.name}`}>
              {u.name}
            </option>
          ))}
        </select>

        <Button>Add Task</Button>
      </form>
    </div>
  );
};

export default TaskForm;
