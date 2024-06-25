import { body, validationResult } from "express-validator";
import User from "../models/User.model.js";

export default class ValidationMiddleware {
  static checkDuplicateEmail = async (req, res, next) => {
    try {
      const userToCheck = await User.findOne({ email: req.body.email });
      if (userToCheck) {
        res
          .status(400)
          .json({ message: "Registration failed - email already exists" });
      } else {
        next();
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "An error ocurred whilst validating your email." });
    }
  };

  static checkSignUpFields = () => {
    try {
      return [
        body("email").trim().exists().normalizeEmail().escape().isEmail(),
        body("password").trim().exists().isLength({ min: 8 }).escape(),
        ValidationMiddleware.handleValidationErrors,
      ];
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  static handleValidationErrors = (req, res, next) => {
    const validationErrors = validationResult(req);
    if (validationErrors.errors.length !== 0) {
      return res
        .status(422)
        .json({ message: "Unable to process because the data is invalid." });
    }
    next();
  };
}

export const checkDuplicateEmail = ValidationMiddleware.checkDuplicateEmail;
export const checkSignUpFields = ValidationMiddleware.checkSignUpFields;
