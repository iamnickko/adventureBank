import axios from "axios";
import { authHeader } from "./auth.services";

export const getAllUsers = async () => {
  const response = await axios.get(`${import.meta.env.VITE_APP_API}/admin/`, {
    headers: authHeader(),
  });
  return response.data;
};
