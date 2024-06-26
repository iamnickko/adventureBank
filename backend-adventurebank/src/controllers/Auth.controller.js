import AuthService from "../services/Auth.service.js";

export default class AuthController {
  #service;

  constructor(service = new AuthService()) {
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

  login = async (req, res) => {
    try {
      const validUser = await this.#service.login(req.body);
      if (!validUser) {
        res.status(401).json({ message: "Invalid credentials." });
      }
      res
        .set("X-Access-Token", validUser.accessToken)
        .status(200)
        .json(validUser);
    } catch (error) {
      if (error.message === "Invalid credentials.") {
        res.status(401).json({ message: error.message });
      } else {
        res
          .status(500)
          .json({ message: "An unexpected error ocurred during login." });
      }
    }
  };
}
