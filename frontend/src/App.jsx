import { useContext } from "react";
import LoginForm from "./components/authentication/LoginForm/LoginForm";
import TaskItem from "./components/tasks/TaskItem/TaskItem";
import TaskList from "./components/tasks/TaskList/TaskList";
import Button from "./components/ui/Button/Button";
import Footer from "./components/ui/Footer/Footer";
import Navbar from "./components/ui/Navbar/Navbar";
import AuthPage from "./pages/AuthPage";
import AuthContext from "./context/auth-context";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <div className="App">
      <Navbar />

      {/* When user dont have valid token */}
      {!authCtx.isLogin && <AuthPage />}

      {/* When user is logged in */}
      {authCtx.isLogin && <TaskList />}

      <Footer />
    </div>
  );
}

export default App;
