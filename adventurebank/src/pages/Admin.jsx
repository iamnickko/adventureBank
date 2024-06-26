import axios from "axios";
import { authHeader } from "../utils/auth.services";

const Admin = () => {
  const onClickHandler = async () => {
    const response = await axios.get(`${import.meta.env.VITE_APP_API}/admin`, {
      headers: authHeader(),
    });
    console.log(response.data);
  };

  return <div onClick={onClickHandler}>Click to send GET to /admin</div>;
};
export default Admin;
