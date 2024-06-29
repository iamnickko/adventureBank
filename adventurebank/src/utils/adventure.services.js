import axios from "axios";
import { authHeader } from "./auth.services";

export const createAdventure = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_API}/adventures`,
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
