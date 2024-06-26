import AdminService from "../services/Admin.service.js";

export default class AdminController {
  #service;

  constructor(service = new AdminService()) {
    this.#service = service;
  }

  getAllUsers = async (req, res) => {
    try {
      const allUsers = await this.#service.getAllUsers();
      res.status(200).json(allUsers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}
