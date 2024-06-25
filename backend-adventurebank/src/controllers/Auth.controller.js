import AuthServices from "../services/Auth.services.js";

export default class AuthController {
  #service;

  constructor(service = new AuthServices()) {
    this.#service = service;
  }

  register = async (req, res) => {
    try {
      const newUser = await this.#service.register(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}
