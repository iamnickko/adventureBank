import axios from "axios";
import { authHeader } from "./auth.services";

export const createAdventure = async (formInput) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_API}/adventures`,
      {
        name: formInput.name,
        description: formInput.description,
      },
      { headers: authHeader() }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllAdventures = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_API}/adventures`,
      { headers: authHeader() }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteAdventure = async (id) => {
  try {
    const response = axios.delete(
      `${import.meta.env.VITE_APP_API}/adventures/${id}`,
      {
        headers: authHeader(),
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
