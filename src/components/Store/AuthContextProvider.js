import { useState } from "react";
import AuthContext from "./AuthContext";

const AuthContextProvider = (props) => {
    const [isLoggedIn,setIsLoggedIn]=useState(false);
    const [tokenArray,setTokenArray]=useState([]);

    const addTokenHandler=(token)=>{
        setTokenArray((prevState)=>{
            const array=[...prevState];
            array.push(token);
            return array;
        })
    }

    const removeTokenHandler=(tokenId)=>{
        console.log(tokenArray);
        console.log(tokenId);
        setTokenArray((prevState)=>{
            const newTokenArray=prevState.filter((item)=> tokenId!== item);
            return newTokenArray;
        })
        setIsLoggedIn(false);
    }

    const isLoginHandler=()=>{
        setIsLoggedIn(true);
    }

    const AuthTokenObj={
        tokenItems:tokenArray,
        isLoggedIn:isLoggedIn,
        addToken:addTokenHandler,
        removeToken:removeTokenHandler,
        isLogger:isLoginHandler,
    }
  return (
    <AuthContext.Provider value={AuthTokenObj}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
