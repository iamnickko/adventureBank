import { useSearchParams } from "react-router-dom";
import AuthForm from "../components/AuthForm";

const Auth = ({ setHasCookie }) => {
  const [searchParams] = useSearchParams();
  const isLoggingIn = searchParams.get("mode") === "login";

  return (
    <>
      <h1 className="text-3xl text-center">
        {isLoggingIn ? "Login" : "Register"}
      </h1>
      <AuthForm isLoggingIn={isLoggingIn} setHasCookie={setHasCookie} />
    </>
  );
};
export default Auth;
