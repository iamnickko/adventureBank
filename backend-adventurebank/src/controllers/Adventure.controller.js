import AdventureService from "../services/Adventure.service.js";

export default class AdventureController {
  #service;

  constructor(service = new AdventureService()) {
    this.#service = service;
  }

  createAdventure = async (req, res) => {
    const adventureToCreate = { userId: req.userId, ...req.body };
    try {
      const newAdventure = await this.#service.createAdventure(
        adventureToCreate
      );
      res.status(201).json(newAdventure);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  getAllAdventures = async (req, res) => {
    try {
      const allAdventures = await this.#service.getAllAdventures(req.userId);
      res.status(200).json(allAdventures);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  getOneAdventure = async (req, res) => {
    const { id } = req.params;
    try {
      const adventure = await this.#service.getOneAdventure(id);
      res.status(200).json(adventure);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  deleteAdventure = async (req, res) => {
    const { id } = req.params;
    try {
      const deleteAdventure = await this.#service.deleteAdventure(id);
      res.status(200).json(deleteAdventure);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  editAdventure = async (req, res) => {
    try {
      const editAdventure = await this.#service.editAdventure({ ...req.body });
      res.status(200).json(editAdventure);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}
