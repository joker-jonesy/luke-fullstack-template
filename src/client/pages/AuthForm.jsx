import { useState } from "react";
import { useLoginMutation, useRegisterMutation } from "../reducers/auth";
import {useNavigate} from "react-router-dom";

/**
 * AuthForm allows a user to either login or register for an account.
 */
function AuthForm() {
  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();
  const [error, setError] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isLogin, setIsLogin] = useState(true);
  const authType = isLogin ? "Login" : "Register";
  const navigate = useNavigate();
  const oppositeAuthCopy = isLogin
    ? "Don't have an account?"
    : "Already have an account?";
  const oppositeAuthType = isLogin ? "Register" : "Login";

  /**
   * Send credentials to server for authentication
   */
  async function attemptAuth(event) {
    event.preventDefault();
    setError(null);

    const authMethod = isLogin ? login : register;
    const credentials = { username, password };

    try {
      await authMethod(credentials).unwrap();
      navigate("/")
    } catch (error) {
      setError(error.data);
    }
  }

  return (
    <>
      <h1>{authType}</h1>
      <form onSubmit={attemptAuth} name={authType}>
        <label>
          Username
          <input
            type="text"
            name="username"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </label>
        <button type="submit">{authType}</button>
      </form>
      <p>
        {oppositeAuthCopy}{" "}
        <a
          onClick={() => {
            setIsLogin(!isLogin);
          }}
        >
          {oppositeAuthType}
        </a>
      </p>
      {error && <p>{error}</p>}
    </>
  );
}

export default AuthForm;