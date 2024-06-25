import { Router } from "express";
import AuthController from "../controllers/Auth.controller.js";
import ValidationMiddleware from "../middleware/Validation.middleware.js";

export default class AuthRouter {
  #path;
  #router;
  #controller;

  constructor(controller = new AuthController()) {
    this.#path = "/auth";
    this.#router = new Router();
    this.#controller = controller;
    this.#initialise();
  }

  #initialise = () => {
    this.#router.post(
      "/register",
      [ValidationMiddleware.checkDuplicate],
      this.#controller.register
    );
  };

  getRouter = () => {
    return this.#router;
  };

  getRouterPath = () => {
    return this.#path;
  };
}
