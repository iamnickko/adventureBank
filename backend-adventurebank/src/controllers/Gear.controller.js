import GearService from "../services/Gear.service.js";

export default class GearController {
  #service;

  constructor(service = new GearService()) {
    this.#service = service;
  }
  createGear = async (req, res) => {
    const gearToCreate = { userId: req.userId, ...req.body };
    try {
      const newGear = await this.#service.createGear(gearToCreate);
      res.status(201).json(newGear);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  getAllGear = async (req, res) => {
    try {
      const allGear = await this.#service.getAllGear(req.userId);
      res.status(200).json(allGear);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}
