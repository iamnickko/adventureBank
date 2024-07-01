import axios from "axios";
import { authHeader } from "./auth.services";

export const createGear = async (formInput) => {
  const response = axios.post(
    `${import.meta.env.VITE_APP_API}/gear`,
    { ...formInput },
    { headers: authHeader() }
  );
  return response.data;
};

export const getAllGear = async () => {
  const response = await axios.get(`${import.meta.env.VITE_APP_API}/gear`, {
    headers: authHeader(),
  });
  return response.data;
};

export const deleteGear = async (id) => {
  const response = axios.delete(`${import.meta.env.VITE_APP_API}/gear/${id}`, {
    headers: authHeader(),
  });
  return response.data;
};
