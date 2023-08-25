import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";

const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tokenString, setTokenString] = useState(initialToken);
  //
  const userLoggedIn = !!tokenString;
  // the main reason for using this line is iam not able to redirect to profile page
  // if manually entered the url after login. while using the useState of isLoggedIn bcos
  // useEffect renders after the comp. renders so everytime the context re-renders isLoggedIN bcomes false,
  //  then useEffect makes it to true, but it will redirect to '/' page after being logged in..
  //
  const addTokenHandler = (tokenId) => {
    console.log(tokenId);
    setTokenString(tokenId);
    // setIsLoggedIn(true);
    localStorage.setItem("token", tokenId);
    // auto logout after 5mins
    setTimeout(()=>{
      console.log("going to logout");
      removeTokenHandler();
    },5000*60);
  };

  const removeTokenHandler = () => {
    console.log(tokenString);
    setTokenString(null);
    // setIsLoggedIn(false);
    localStorage.removeItem("token");
  };

  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     console.log("inside useEffect in A-C-provider");
  //     setIsLoggedIn(true);
  //   }
  // }, []);

  const AuthTokenObj = {
    token: tokenString,
    isLoggedIn: userLoggedIn,
    addToken: addTokenHandler,
    removeToken: removeTokenHandler,
  };

  return (
    <AuthContext.Provider value={AuthTokenObj}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
