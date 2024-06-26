import User from "../models/User.model.js";

export default class AdminService {
  getAllUsers = async () => {
    const allUsers = await User.find({});
    return allUsers;
  };
}
