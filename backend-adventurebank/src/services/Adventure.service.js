import Adventure from "../models/Adventure.model.js";

export default class AdventureService {
  createAdventure = (newAdventure) => {
    console.log("AdventureService: ", newAdventure);
    try {
      const adventure = Adventure.create(newAdventure);
      return adventure;
    } catch (error) {
      throw error;
    }
  };
}
