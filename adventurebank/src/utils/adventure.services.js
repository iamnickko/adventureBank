import axios from "axios";
import { authHeader } from "./auth.services";

export const createAdventure = async (formInput) => {
  const response = await axios.post(
    `${import.meta.env.VITE_APP_API}/adventures`,
    {
      name: formInput.name,
      description: formInput.description,
    },
    { headers: authHeader() }
  );
  return response.data;
};

export const getAllAdventures = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_APP_API}/adventures`,
    { headers: authHeader() }
  );
  return response.data;
};

export const getOneAdventure = async (id) => {
  console.log(id);
  const response = await axios.get(
    `${import.meta.env.VITE_APP_API}/adventures/${id}`,
    { headers: authHeader() }
  );
  return response.data;
};

export const deleteAdventure = async (id) => {
  const response = await axios.delete(
    `${import.meta.env.VITE_APP_API}/adventures/${id}`,
    {
      headers: authHeader(),
    }
  );
  return response.data;
};

export const editAdventure = async (formInput, id) => {
  const response = await axios.put(
    `${import.meta.env.VITE_APP_API}/adventures/${id}`,
    { formInput },
    { headers: authHeader() }
  );
  return response.data;
};
