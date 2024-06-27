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

  deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
      const deleteUser = await this.#service.deleteUser(id);
      res.status(200).json(deleteUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}
