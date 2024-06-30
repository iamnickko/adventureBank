import Adventure from "../models/Adventure.model.js";

export default class AdventureService {
  createAdventure = async (newAdventure) => {
    try {
      const adventure = await Adventure.create(newAdventure);
      return adventure;
    } catch (error) {
      throw new Error(
        "An unexpected error occurred whilst trying to creating a new adventure."
      );
    }
  };

  getAllAdventures = async (userId) => {
    try {
      const allAdventures = await Adventure.find({ userId });
      if (!allAdventures) {
        throw new Error("There are no adventures to display.");
      }
      return allAdventures;
    } catch (error) {
      throw new Error(
        "An unexpected error occurred whilst searching for all adventures."
      );
    }
  };

  deleteAdventure = async (adventureId) => {
    try {
      const deleteAdventure = await Adventure.findByIdAndDelete({
        _id: adventureId,
      });
      return deleteAdventure;
    } catch (error) {
      throw new Error(
        "An unexpected error occurred whilst trying to delete the adventure."
      );
    }
  };
}
