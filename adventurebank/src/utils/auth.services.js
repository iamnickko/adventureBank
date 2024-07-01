import axios from "axios";
import Cookies from "js-cookie";

export const login = async (formInput) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_API}/auth/login`,
      {
        email: formInput.email,
        password: formInput.password,
      }
    );
    Cookies.set("user", response.data.accessToken, {
      expires: 86400,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const logout = () => {
  Cookies.remove("user");
};

export const register = async (formInput) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_API}/auth/register`,
      {
        username: formInput.username,
        email: formInput.email,
        password: formInput.password,
      }
    );
    Cookies.set("user", response.data.accessToken, {
      expires: 86400,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const checkForCookie = () => {
  const userCookie = Cookies.get("user");
  if (userCookie) return true;
};

export const authHeader = () => {
  const user = Cookies.get("user");
  if (user) {
    return { "X-Access-Token": user };
  } else {
    return {};
  }
};
