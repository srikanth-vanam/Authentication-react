import React from "react";
const AuthContext = React.createContext({
  token: 'null',
  isLoggedIn: false,
  addToken: (token) => {},
  removeToken: () => {},
});
export default AuthContext;
