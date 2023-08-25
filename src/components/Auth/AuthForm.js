import { useState, useRef, useContext, useEffect,  } from "react";
import {useHistory }from "react-router-dom"
import classes from "./AuthForm.module.css";
import AuthContext from "../Store/AuthContext";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoad, setIsLoad] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const ctx=useContext(AuthContext);
  const history=useHistory();
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // setIsLoad(true);
    const obj = {
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
    };
    postDataHandler(obj);
  };

  const postDataHandler = (obj) => {
    setIsLoad(true);
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC6fdqT-BKSYvdgNjdso0biEIf45XQLPXk";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC6fdqT-BKSYvdgNjdso0biEIf45XQLPXk";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: obj.email,
        password: obj.password,
        returnSecureToken: true,
      }),
    })
      .then((res) => {
        setIsLoad(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMsg = "Authentication failed";
            if(data && data.error && data.error.message){
              errorMsg=data.error.message;
            }
            throw new Error(errorMsg);
          });
        }
      })
      .then((data) => {
        // console.log(data);
        ctx.addToken(data.idToken);
        ctx.isLogger();
        localStorage.setItem("token",data.idToken);
        history.replace("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  useEffect(()=>{
    if(localStorage.getItem("token")){
      ctx.isLogger();
      history.replace('/');
      // history.push()
    }
  },[])

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" ref={emailInputRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            ref={passwordInputRef}
            required
          />
        </div>
        <div className={classes.actions}>
          {isLoad && <p>Sending request....</p>}
          {!isLoad && (
            <button type="submit">
              {isLogin ? "Login" : "Create Account"}
            </button>
          )}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
