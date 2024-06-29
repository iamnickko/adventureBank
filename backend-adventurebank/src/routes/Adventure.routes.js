import { Router } from "express";

export default class AdventureRouter {
  #path;
  #controller;
  #router;

  constructor() {
    this.#path = "/adventures";
    this.#router = new Router();
    this.#initialise();
  }

  #initialise = () => {
    this.#router.post("/", (req, res) => {
      res.status(200).json({ message: "New adventures await!" });
    });
  };

  getRouterPath = () => {
    return this.#path;
  };

  getRouter = () => {
    return this.#router;
  };
}
