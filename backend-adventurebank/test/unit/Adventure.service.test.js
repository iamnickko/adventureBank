import { expect } from "chai";
import sinon from "sinon";

import AdventureService from "../../src/services/Adventure.service.js";
import Adventure from "../../src/models/Adventure.model.js";
import Config from "../../src/config/Config.js";

describe("AdventureService tests", () => {
  let adventureService;
  let createAdventureStub;
  let findAdventuresStub;
  let deleteAdventureStub;
  let mockDBAdventure;
  let mockDBAdventure2;
  let adventureArray;

  before(() => {
    Config.load();
  });

  beforeEach(() => {
    adventureService = new AdventureService();
    mockDBAdventure = {
      _id: 1,
      name: "Journey To The West",
      description: "Sun Wukong and some mates go for a walk...",
    };
    mockDBAdventure2 = {
      _id: 2,
      name: "Homeward Bound",
      description: "A bunch of pupper dogs head home",
    };
    adventureArray = [mockDBAdventure, mockDBAdventure2];
    createAdventureStub = sinon
      .stub(Adventure, "create")
      .resolves(mockDBAdventure);
    findAdventuresStub = sinon.stub(Adventure, "find").resolves(adventureArray);
    deleteAdventureStub = sinon
      .stub(Adventure, "findByIdAndDelete")
      .resolves(mockDBAdventure2);
  });

  afterEach(() => {
    createAdventureStub.restore();
    findAdventuresStub.restore();
    deleteAdventureStub.restore();
  });

  describe("getAllAdventures tests", () => {
    it("should return an array of adventure objects", async () => {
      const fetchAdventures = await adventureService.getAllAdventures();
      expect(fetchAdventures).to.equal(adventureArray);
    });

    it("should return an error if there are no adventures to display", async () => {
      findAdventuresStub.resolves([]);
      try {
        await adventureService.getAllAdventures();
        expect.fail("There are no adventures to display.");
      } catch (error) {
        expect(error.message).to.equal("There are no adventures to display.");
      }
    });

    it("should return an error if getAllAdventures fails", async () => {
      findAdventuresStub.rejects(new Error());
      try {
        await adventureService.getAllAdventures();
        expect.fail(
          "An unexpected error occurred whilst searching for all adventures."
        );
      } catch (error) {
        expect(error.message).to.equal(
          "An unexpected error occurred whilst searching for all adventures."
        );
      }
    });
  });
});
