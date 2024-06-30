import { Router } from "express";
import AdventureController from "../controllers/Adventure.controller.js";
import AuthMiddleware from "../middleware/Auth.middleware.js";

export default class AdventureRouter {
  #path;
  #controller;
  #router;

  constructor(controller = new AdventureController()) {
    this.#path = "/adventures";
    this.#router = new Router();
    this.#controller = controller;
    this.#initialise();
  }

  #initialise = () => {
    // this.#router.post("/", [AuthMiddleware.verifyToken], (req, res) => {
    //   res.status(200).json({ message: "New adventures await!" });
    // });
    this.#router.post(
      "/",
      [AuthMiddleware.verifyToken],
      this.#controller.createAdventure
    );
    this.#router.get(
      "/",
      [AuthMiddleware.verifyToken],
      this.#controller.getAllAdventures
    );
    this.#router.delete(
      "/:id",
      [AuthMiddleware.verifyToken],
      this.#controller.deleteAdventure
    );
  };

  getRouterPath = () => {
    return this.#path;
  };

  getRouter = () => {
    return this.#router;
  };
}
