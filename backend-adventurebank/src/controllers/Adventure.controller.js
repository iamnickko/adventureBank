import AdventureService from "../services/Adventure.service.js";

export default class AdventureController {
  #service;

  constructor(service = new AdventureService()) {
    this.#service = service;
  }

  createAdventure = async (req, res) => {
    try {
      const newAdventure = await this.#service.createAdventure(req.body);
      res.status(201).json(newAdventure);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}
