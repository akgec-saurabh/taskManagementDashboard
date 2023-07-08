import React, { useState } from "react";
import classes from "./Dashboard.module.css";
import TaskPage from "../TaskPage/TaskPage";
const Dashboard = () => {
  const [chartOpen, setChartOpen] = useState(false);
  return (
    <div className={classes.container}>
      <h1>Admin Dashboard</h1>
      <div className={classes.nav}>
        <div className={classes.navWrapper}>
          <div
            onClick={() => setChartOpen((prv) => !prv)}
            className={`${classes.charts} ${
              chartOpen ? `${classes.active}` : ""
            }`}
          >
            Charts
          </div>
          <div
            onClick={() => setChartOpen((prv) => !prv)}
            className={`${classes.tasks} ${
              !chartOpen ? `${classes.active}` : ""
            }`}
          >
            All Tasks
          </div>
        </div>
      </div>
      {!chartOpen && <TaskPage />}
    </div>
  );
};

export default Dashboard;
