import { Router } from "express";

import GearController from "../controllers/Gear.controller.js";
import AuthMiddleware from "../middleware/Auth.middleware.js";

export default class GearRouter {
  #path;
  #controller;
  #router;

  constructor(controller = new GearController()) {
    this.#path = "/gear";
    this.#controller = controller;
    this.#router = new Router();
    this.#initialise();
  }

  #initialise = () => {
    this.#router.post(
      "/",
      [AuthMiddleware.verifyToken],
      this.#controller.createGear
    );
    this.#router.get(
      "/",
      [AuthMiddleware.verifyToken],
      this.#controller.getAllGear
    );
  };

  getRouterPath = () => {
    return this.#path;
  };

  getRouter = () => {
    return this.#router;
  };
}
