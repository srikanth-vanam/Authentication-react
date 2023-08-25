import { useContext, useRef } from "react";
import classes from "./ProfileForm.module.css";
import AuthContext from "../Store/AuthContext";

const ProfileForm = () => {
  const newPasswordInputRef = useRef();
  const ctx = useContext(AuthContext);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(ctx.token);
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC6fdqT-BKSYvdgNjdso0biEIf45XQLPXk",
      {
        method: 'POST',
        body: JSON.stringify({
          idToken: ctx.token,
          password: newPasswordInputRef.current.value,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            if (data && data.error) {
              console.log("error data is ",data);
              throw new Error(data.error.message);
            }
          });
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button type="submit">Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
