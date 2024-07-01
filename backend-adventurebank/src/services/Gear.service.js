import Gear from "../models/Gear.model.js";

export default class GearService {
  createGear = async (gearToAdd) => {
    try {
      const newGear = await Gear.create(gearToAdd);
      return newGear;
    } catch (error) {
      throw new Error(
        "An unexpected error occurred whilst trying to create a new adventure."
      );
    }
  };

  getAllGear = async (userId) => {
    try {
      const allGear = await Gear.find({ userId });
      if (!allGear) {
        throw new Error("There is no gear to display.");
      }
      return allGear;
    } catch (error) {
      throw new Error(
        "An unexpected error occurred whilst searching for your gear."
      );
    }
  };

  deleteGear = async (gearId) => {
    try {
      const deleteGear = await Gear.findByIdAndDelete({
        _id: gearId,
      });
      return deleteGear;
    } catch (error) {
      throw new Error(
        "An unexpected error occurred whilst trying to delete the gear item."
      );
    }
  };
}
