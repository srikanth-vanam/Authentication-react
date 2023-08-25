import { useState } from "react";
import AuthContext from "./AuthContext";

const AuthContextProvider = (props) => {
    const [isLoggedIn,setIsLoggedIn]=useState(false);
    const [tokenString,setTokenString]=useState(null);

    const addTokenHandler=(tokenId)=>{
        console.log(tokenId);
        setTokenString(tokenId);
        setIsLoggedIn(true);
    }

    const removeTokenHandler=()=>{
        console.log(tokenString);
        setTokenString(null);
        setIsLoggedIn(false);
    }

    const AuthTokenObj={
        token:tokenString,
        isLoggedIn:isLoggedIn,
        addToken:addTokenHandler,
        removeToken:removeTokenHandler,
    }
    
  return (
    <AuthContext.Provider value={AuthTokenObj}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
