import { Router } from "express";
import AuthController from "../controllers/Auth.controller.js";

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
    // this.#router.post("/register", (req, res) => {
    //   res.status(200).json({ message: "All good!" });
    // });

    this.#router.post("/register", this.#controller.register);
  };

  getRouter = () => {
    return this.#router;
  };

  getRouterPath = () => {
    return this.#path;
  };
}
