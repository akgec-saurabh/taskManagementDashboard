import { useContext } from "react";
import classes from "./App.module.css";
import Footer from "./components/ui/Footer/Footer";
import Navbar from "./components/ui/Navbar/Navbar";
import AuthPage from "./pages/AuthPage";
import AuthContext from "./context/auth-context";
import TaskPage from "./pages/TaskPage/TaskPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import Donut from "./components/Charts/Donut/Donut";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <div className={classes.app}>
      <Navbar />

      {/* When user dont have valid token */}
      {!authCtx.isLogin && <AuthPage />}

      {/* When user is logged in */}
      {authCtx.isLogin && authCtx.role === "user" && <TaskPage />}

      {authCtx.isLogin && authCtx.role === "admin" && <Dashboard />}

      {/* <Donut width={640} height={640} /> */}
      <Footer />
    </div>
  );
}

export default App;
