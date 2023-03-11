// frontend/src/components/LoginFormModal/index.js
import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  // const [disableButton, setDisableButton] = useState(false)

  // login submission
  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors([]);
    const validationErrors = [];

    if (credential.length < 4)
      validationErrors.push("Username or email must be at least 4 characters");
    if (password.length < 6)
      validationErrors.push("Password must be at least 6 characters");
    setErrors(validationErrors);

    if (validationErrors.length) {
      return;
    }

    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  // demo user login
  const handleClick = () => {
    setCredential("FakeUser1");
    setPassword("password1");
    return dispatch(sessionActions.login({ credential, password }));
  };

  // useEffect(() => {
  //   setDisableButton(credential.length < 4)
  // },[credential])

  // useEffect(() => {
  //   setDisableButton(password.length < 6)
  // }, [password])

  return (
    <div className="login_modal">
      <h1>Log In</h1>
      <form className="login_form" onSubmit={handleSubmit}>
        <ul className="login_errors">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {/* <button disabled={disableButton ? true : false}  className="login_button" type="submit" > */}
        <button className="login_button" type="submit">
          Log In
        </button>
        <button onClick={handleClick} className="demo_user">
          {" "}
          Log in as Demo User
        </button>
      </form>
    </div>
  );
}

export default LoginFormModal;
