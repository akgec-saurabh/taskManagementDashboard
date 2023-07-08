import React, { useCallback, useEffect } from "react";
import { useState } from "react";

const AuthContext = React.createContext({
  isLogin: false,
  role: "user",
  onLoginHandler: (response) => {},
  onLogoutHandler: () => {},
  token: null,
});

export default AuthContext;

export const AuthContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [role, setRole] = useState("user");
  const [token, setToken] = useState(null);
  //TODO setting RoleHandler

  useEffect(() => {
    let data;
    try {
      data = JSON.parse(localStorage.getItem("userdata"));
    } catch (error) {
      console.log(error);
    }
    if (data) {
      setIsLogin(true);
      setToken(data);
      setRole(data.role);
    }

    console.log(data);
  }, [isLogin]);

  const onLoginHandler = useCallback((response) => {
    try {
      localStorage.setItem("userdata", JSON.stringify(response));
    } catch (error) {
      console.log(error);
    }
    setToken(response);
    setIsLogin(true);
  }, []);
  const onLogoutHandler = () => {
    try {
      localStorage.removeItem("userdata");
    } catch (error) {
      console.log(error);
    }

    setIsLogin(false);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ isLogin, role, token, onLoginHandler, onLogoutHandler }}
    >
      {children}
    </AuthContext.Provider>
  );
};
