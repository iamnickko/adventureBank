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

  getOneAdventure = async (adventureId) => {
    try {
      const adventure = await Adventure.findById(adventureId);
      if (!adventure) {
        throw new Error("No such adventure exists.");
      }
      return adventure;
    } catch (error) {
      throw new Error(
        "An unexpected error occurred whilst searching for this adventure."
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

  editAdventure = async (adventure, userId) => {
    console.log(adventure, userId);
    try {
      const editAdventure = await Adventure.findByIdAndUpdate(adventure._id, {
        ...adventure,
      });
      return editAdventure;
    } catch (error) {
      throw new Error(
        "An unexpected error occurred whilst trying to edit the adventure."
      );
    }
  };
}
