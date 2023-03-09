// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    const validationErrors = [];

    if (!credential) validationErrors.push("Invalid credentials");
    if (!password) validationErrors.push("Must enter a password");

    setErrors(validationErrors);

    if (validationErrors.length) {
      window.scroll(0, 0);
      return;
    }
    return dispatch(sessionActions.login({ credential, password }))
      // .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };
  const handleClick = async (e) => {
    setCredential("FakeUser1");
    setPassword("password1");
    setErrors([]);
    if ((credential, password)) {
      return dispatch(sessionActions.login({ credential, password }))
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
  };

  return (
    <div className="login_modal">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul>
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
        <button className="login_button" type="submit">
          Log In
        </button>
        <button onClick={handleClick} className="demo_user">
          {" "}
          Demo User
        </button>
      </form>
    </div>
  );
}

export default LoginFormModal;
