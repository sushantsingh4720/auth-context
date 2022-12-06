import { useRef } from "react";
import { useContext } from "react";
import AuthContext from "../../store/auth-Context";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredNewPassword = newPasswordInputRef.current.value;
    const response =await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDPnMJtB5jPyN46LTWO-FxnS_jJjCm7r9Y",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken:false
        }),
        headers: { "Content-Type": "application/json" },
      }
    );
    const data=await response.json()
    if(response.ok){
      console.log("password successfully changed")
    }
    else{
      const { message } = data.error;
      alert(message);
      return;
    }
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
