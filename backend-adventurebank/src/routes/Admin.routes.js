import { Router } from "express";
import AuthMiddleware from "../middleware/Auth.middleware.js";

export default class AdminRoutes {
  #path;
  #router;
  #controller;

  constructor() {
    this.#path = "/admin";
    this.#router = new Router();
    // this.#controller = controller;
    this.#initialise();
  }

  #initialise = () => {
    this.#router.get(
      "/",
      [AuthMiddleware.verifyToken, AuthMiddleware.isAdmin],
      (req, res) => {
        res.status(200).json({ message: "All good from /admin GET" });
      }
    );
  };

  getRouterPath = () => {
    return this.#path;
  };

  getRouter = () => {
    return this.#router;
  };
}
