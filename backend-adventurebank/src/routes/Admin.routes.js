import { Router } from "express";
import AuthMiddleware from "../middleware/Auth.middleware.js";
import AdminController from "../controllers/Admin.controller.js";

export default class AdminRoutes {
  #path;
  #router;
  #controller;

  constructor(controller = new AdminController()) {
    this.#path = "/admin";
    this.#router = new Router();
    this.#controller = controller;
    this.#initialise();
  }

  #initialise = () => {
    this.#router.get(
      "/",
      [AuthMiddleware.verifyToken, AuthMiddleware.isAdmin],
      this.#controller.getAllUsers
    );
    this.#router.delete(
      "/user/:id",
      [AuthMiddleware.verifyToken, AuthMiddleware.isAdmin],
      this.#controller.deleteUser
    );
  };

  getRouterPath = () => {
    return this.#path;
  };

  getRouter = () => {
    return this.#router;
  };
}
