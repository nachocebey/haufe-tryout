import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveUserIdToLocalStorage, apiService } from "../../utils/apiService";

import "./AuthForm.scss";

const AuthForm = ({ isLogin, onLogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginFailed, setLoginFailed] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      name: username,
      email: email,
      password: password,
    };

    try {
      const { data, status } = await apiService(
        "POST",
        isLogin ? "login" : "users",
        userData
      );
      if (status === 200) {
        saveUserIdToLocalStorage(data.userId);
        onLogin();
        console.log("Success:", data);
      }
    } catch (error) {
      setLoginFailed(error.message);
    }
  };

  return (
    <div className="form__container">
      <form onSubmit={handleSubmit}>
        {!isLogin ? (
          <div className="input__container">
            <label>Name:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        ) : null}

        <div className="input__container">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input__container">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">{isLogin ? "Log in" : "Sign in"}</button>
        {loginFailed ? <p className="submit__error">{loginFailed}</p> : null}
        {isLogin ? (
          <p>
            Don&apos;t have an account yet?{" "}
            <a onClick={() => navigate("/register")}>Sign up</a>
          </p>
        ) : (
          <p>
            You already have an account?{" "}
            <a onClick={() => navigate("/login")}>Log in</a>
          </p>
        )}
      </form>
    </div>
  );
};

AuthForm.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  onLogin: PropTypes.func.isRequired,
};

export default AuthForm;
