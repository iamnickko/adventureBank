import User from "../models/User.model.js";

export default class AdminService {
  getAllUsers = async () => {
    try {
      const allUsers = await User.find({});
      if (!allUsers) {
        throw new Error("There are no users to display.");
      }
      return allUsers;
    } catch (error) {
      throw new Error(
        "An unexpected error ocurred whilst searching for all users."
      );
    }
  };
}
