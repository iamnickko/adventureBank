import axios from "axios";

export const login = async (formInput) => {
  console.log(formInput);
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_API}/auth/login`,
      {
        email: formInput.email,
        password: formInput.password,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
