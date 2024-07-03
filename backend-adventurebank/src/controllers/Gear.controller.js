import GearService from "../services/Gear.service.js";

export default class GearController {
  #service;

  constructor(service = new GearService()) {
    this.#service = service;
  }

  createGear = async (req, res) => {
    const gearToCreate = { ...req.body, userId: req.userId };
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
      res.status(500).json({ message: error.message });
    }
  };

  deleteGear = async (req, res) => {
    const { id } = req.params;
    try {
      const deleteGear = await this.#service.deleteGear(id);
      res.status(200).json(deleteGear);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}
