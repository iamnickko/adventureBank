import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

export default class AuthService {
  register = async (newUser) => {
    const { password, ...others } = newUser;
    try {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const createdUser = await User.create({
        ...others,
        password: hashedPassword,
      });
      const accessToken = jwt.sign(
        { id: createdUser._id },
        process.env.JWT_SECRET,
        {
          expiresIn: 86400,
        }
      );
      return { accessToken, createdUser };
    } catch (error) {
      throw new Error(error);
    }
  };

  login = async (user) => {
    const dbUser = await User.findOne({ email: user.email });
    if (!dbUser) {
      throw new Error("Invalid credentials.");
    }

    const validPassword = bcrypt.compareSync(user.password, dbUser.password);
    if (!validPassword) {
      throw new Error("Invalid credentials.");
    }

    const accessToken = jwt.sign({ id: dbUser._id }, process.env.JWT_SECRET, {
      expiresIn: 86400,
    });
    return { accessToken, dbUser };
  };
}
