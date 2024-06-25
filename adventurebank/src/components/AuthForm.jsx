import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, register } from "../utils/auth.services";

const AuthForm = ({ isLoggingIn, setHasCookie }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <div className="mt-8 max-w-md mx-auto">
      <form onSubmit={onSubmitHandler} className="grid grid-cols-1 gap-6">
        {!isLoggingIn && (
          <label htmlFor="name" className="block">
            <span className="text-gray-700">Username</span>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="e.g. hikingChamp1337"
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
            placeholder="email@domain.com"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        <label htmlFor="password" className="block">
          <span>Password</span>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        <button
          className="mx-auto mb-5 w-1/3 border-2 border-lime-400 bg-lime-200/50 rounded-full"
          type="submit"
        >
          {isLoggingIn ? "Login" : "Register"}
        </button>
      </form>
      {isLoggingIn ? (
        <Link to="/auth?mode=register" className="text-sm underline">
          New? Register an account
        </Link>
      ) : (
        <Link to="/auth?mode=login" className="text-sm underline">
          Already registered? Login
        </Link>
      )}
    </div>
  );
};
export default AuthForm;
