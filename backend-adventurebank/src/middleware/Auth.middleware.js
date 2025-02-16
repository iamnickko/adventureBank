import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

export default class AuthMiddleware {
  static verifyToken = async (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
      return res.status(401).json({ message: "You require a token." });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Unauthorised." });
      }
      req.userId = decoded.id;
      next();
    });
  };

  static isAdmin = async (req, res, next) => {
    const user = await User.findById(req.userId);
    if (!user) {
      res.status(500).json({ message: "Unexpected error." });
    }
    if (user.role === "admin") {
      next();
      return;
    } else {
      res.status(403).json({ message: "You do not have admin privileges!" });
    }
  };
}
