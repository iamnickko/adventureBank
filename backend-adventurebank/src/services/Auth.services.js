import User from "../models/User.model.js";

export default class AuthServices {
  register = async (newUser) => {
    console.log(newUser);
    try {
      const createdUser = await User.create(newUser);
      return createdUser;
    } catch (error) {
      throw new Error(error);
    }
  };
}
