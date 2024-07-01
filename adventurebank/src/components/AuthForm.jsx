import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, register } from "../utils/auth.services";
import { isEmailValid, isPasswordValid } from "../utils/validation.services";

const AuthForm = ({ isLoggingIn, setHasCookie }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btnIsDisabled, setBtnIsDisabled] = useState(true);
  const [formError, setFormError] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (email && password) {
      setBtnIsDisabled(false);
    } else {
      setBtnIsDisabled(true);
    }
    setError("");
    setFormError({});
  }, [username, email, password]);

  const validateEmail = () => {
    const emailValid = isEmailValid(email);
    setBtnIsDisabled(!emailValid);
    setFormError((prevErrors) => ({
      ...prevErrors,
      email: emailValid ? "" : "Invalid email format.",
    }));
  };

  const validatePassword = () => {
    const passwordValid = isPasswordValid(password);
    setBtnIsDisabled(!passwordValid);
    setFormError((prevErrors) => ({
      ...prevErrors,
      password: passwordValid
        ? ""
        : "Password must contain at least one lowercase letter, one capital letter, one number, one special character, and be between 8-15 characters long.",
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (isLoggingIn) {
        await login({ email, password });
      } else {
        await register({ username, email, password });
      }
      setHasCookie(true);
      navigate("/");
    } catch (error) {
      setError(error.message);
      setBtnIsDisabled(false);
    }
  };

  return (
    <div className="mt-8 max-w-md mx-auto">
      <form onSubmit={onSubmitHandler} className="grid grid-cols-1 gap-6 mb-5">
        {!isLoggingIn && (
          <label htmlFor="username" className="block">
            <span className="text-gray-700">Username</span>
            <input
              type="text"
              name="username"
              id="username"
              autoComplete="username"
              placeholder="e.g. epicAdventuringChamp"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </label>
        )}
        <label htmlFor="email" className="block">
          <span className="text-gray-700">Email</span>
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="email"
            placeholder="email@domain.com"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            onBlur={validateEmail}
          />
          {formError.email && (
            <p className="bg-red-300 text-center mx-auto rounded-3xl py-2 w-full">
              {formError.email}
            </p>
          )}
        </label>
        <label htmlFor="password" className="block">
          <span>Password</span>
          <input
            type="password"
            name="password"
            id="password"
            autoComplete={isLoggingIn ? "current-password" : "new-password"}
            placeholder="password"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            onBlur={validatePassword}
          />
          {formError.password && (
            <p className="bg-red-300 text-center mx-auto rounded-3xl py-2 w-full">
              {formError.password}
            </p>
          )}
        </label>
        <button
          name="submit"
          disabled={btnIsDisabled}
          className="mx-auto w-1/3 py-2 border-2 border-lime-400 bg-lime-200/50 rounded-full hover:bg-lime-400/50 active:bg-lime-600/50 focus:outline-none focus:ring focus:ring-lime-300 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none disabled:cursor-not-allowed"
          type="submit"
        >
          {isLoggingIn ? "Login" : "Register"}
        </button>
        {error && (
          <p className="bg-red-300 text-center mx-auto rounded-3xl py-2 w-5/6">
            {error}
          </p>
        )}
      </form>
      {isLoggingIn ? (
        <Link
          to="/auth?mode=register"
          className="text-sm underline text-slate-600"
        >
          New? Register an account
        </Link>
      ) : (
        <Link
          to="/auth?mode=login"
          className="text-sm underline text-slate-600"
        >
          Already registered? Login
        </Link>
      )}
    </div>
  );
};
export default AuthForm;
