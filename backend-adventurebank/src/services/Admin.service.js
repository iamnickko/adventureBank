import User from "../models/User.model.js";

export default class AdminService {
  getAllUsers = async () => {
    try {
      const allUsers = await User.find({});
      // .populate("adventures")
      // .populate("gear")
      // .exec();
      if (!allUsers) {
        throw new Error("There are no users to display.");
      }
      return allUsers;
    } catch (error) {
      throw new Error(
        "An unexpected error occurred whilst searching for all users."
      );
    }
  };

  deleteUser = async (id) => {
    try {
      const userToDelete = await User.findByIdAndDelete({ _id: id });
      if (!userToDelete) {
        throw new Error("There is no such user.");
      }
      return userToDelete;
    } catch (error) {
      throw new Error(
        "An unexpected error occurred whilst trying to delete user."
      );
    }
  };
}
