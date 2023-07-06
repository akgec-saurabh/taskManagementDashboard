import React from "react";
import { useState } from "react";

const AuthContext = React.createContext({
  isLogin: false,
  role: "user",
  onLoginHandler: () => {},
  onLogoutHandler: () => {},
});

export default AuthContext;

export const AuthContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [role, setRole] = useState("user");
  //TODO setting RoleHandler

  const onLoginHandler = () => {
    setIsLogin(true);
  };
  const onLogoutHandler = () => {
    setIsLogin(false);
  };

  return (
    <AuthContext.Provider
      value={{ isLogin, role, onLoginHandler, onLogoutHandler }}
    >
      {children}
    </AuthContext.Provider>
  );
};
