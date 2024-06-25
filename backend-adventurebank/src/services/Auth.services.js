import bcrypt from "bcrypt";
import User from "../models/User.model.js";

export default class AuthServices {
  register = async (newUser) => {
    const { password, ...others } = newUser;
    try {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const createdUser = await User.create({
        ...others,
        password: hashedPassword,
      });
      return createdUser;
    } catch (error) {
      throw new Error(error);
    }
  };
}
