import { useSearchParams } from "react-router-dom";
import AuthForm from "../components/AuthForm";

const Auth = ({ setHasCookie, setIsAdmin }) => {
  const [searchParams] = useSearchParams();
  const isLoggingIn = searchParams.get("mode") === "login";

  return (
    <>
      <h1 className="text-3xl text-center">
        {isLoggingIn ? "Login" : "Register"}
      </h1>
      <AuthForm
        isLoggingIn={isLoggingIn}
        setHasCookie={setHasCookie}
        setIsAdmin={setIsAdmin}
      />
    </>
  );
};
export default Auth;
