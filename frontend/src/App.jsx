import { useContext } from "react";
import classes from "./App.module.css";
import Footer from "./components/ui/Footer/Footer";
import Navbar from "./components/ui/Navbar/Navbar";
import AuthPage from "./pages/AuthPage";
import AuthContext from "./context/auth-context";
import TaskPage from "./pages/TaskPage/TaskPage";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <div className={classes.app}>
      <Navbar />

      {/* When user dont have valid token */}
      {/* {!authCtx.isLogin && <AuthPage />} */}

      {/* When user is logged in */}
      {/* {authCtx.isLogin && <TaskPage />} */}
      <TaskPage />

      <Footer />
    </div>
  );
}

export default App;
