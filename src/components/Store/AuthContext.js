import React from "react";
const AuthContext = React.createContext({
  tokenItems: [],
  isLoggedIn: false,
  addToken: (token) => {},
  removeToken: (token) => {},
  isLogger:()=>{},
});
export default AuthContext;
