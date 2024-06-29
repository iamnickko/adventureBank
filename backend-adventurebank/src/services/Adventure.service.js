import Adventure from "../models/Adventure.model.js";

export default class AdventureService {
  createAdventure = async (newAdventure) => {
    try {
      const adventure = await Adventure.create(newAdventure);
      return adventure;
    } catch (error) {
      throw error;
    }
  };

  getAllAdventures = async (userId) => {
    try {
      const allAdventures = await Adventure.find({ userId });
      return allAdventures;
    } catch (error) {
      throw error;
    }
  };
}
