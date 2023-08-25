import React from "react";
const AuthContext = React.createContext({
  token: 'null',
  isLoggedIn:'',
  addToken: (token) => {},
  removeToken: () => {},
  isLogger:()=>{}
});
export default AuthContext;
