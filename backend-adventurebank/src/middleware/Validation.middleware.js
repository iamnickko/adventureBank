import User from "../models/User.model.js";

export default class ValidationMiddleware {
  static checkDuplicate = async (req, res, next) => {
    try {
      const userToCheck = await User.findOne({ email: req.body.email });
      if (userToCheck) {
        res
          .status(400)
          .json({ message: "Registration failed - email already exists" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "An error ocurred whilst validating your email." });
    }
    next();
  };
}
