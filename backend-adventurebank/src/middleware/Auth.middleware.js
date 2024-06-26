import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

export default class AuthMiddleware {
  static verifyToken = async (req, res, next) => {
    let token = req.headers["x-access-token"];
    console.log("TOKEN IS:", token);
    if (!token) {
      res
        .status(403)
        .json({ message: "You shall not pass...without a token." });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: "Unauthorised." });
      }
      req.userId = decoded.id;
      console.log(req.userId);
      next();
    });
  };

  static isAdmin = async (req, res, next) => {
    const user = await User.findById(req.userId);
    console.log(user);
    if (!user) {
      res.status(500).json({ message: "Unexpected error." });
    }
    if (user.role === "admin") {
      next();
      return;
    } else {
      res.status(403).json({ message: "You shall not pass...you no admin!" });
    }
    next();
  };
}
