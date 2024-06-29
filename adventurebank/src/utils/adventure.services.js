import axios from "axios";

export const createAdventure = async () => {
  const response = await axios.post(`${import.meta.env.VITE_APP_API}`);
};
