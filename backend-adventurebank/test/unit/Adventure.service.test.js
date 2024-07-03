import { expect } from "chai";
import sinon from "sinon";

import AdventureService from "../../src/services/Adventure.service.js";
import Adventure from "../../src/models/Adventure.model.js";
import Config from "../../src/config/Config.js";

describe("AdventureService tests", () => {
  let adventureService;
  let createAdventureStub;
  let findAdventuresStub;
  let findOneAdventureStub;
  let deleteAdventureStub;
  let editAdventureStub;
  let mockDBAdventure;
  let mockDBAdventure2;
  let mockDBUpdatedAdventure2;
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
    mockDBUpdatedAdventure2 = {
      _id: 2,
      name: "Homeward Bound",
      description: "they made it home in time for biscuits",
    };
    adventureArray = [mockDBAdventure, mockDBAdventure2];
    createAdventureStub = sinon
      .stub(Adventure, "create")
      .resolves(mockDBAdventure);
    findAdventuresStub = sinon.stub(Adventure, "find").resolves(adventureArray);
    findOneAdventureStub = sinon
      .stub(Adventure, "findById")
      .resolves(mockDBAdventure2);
    editAdventureStub = sinon
      .stub(Adventure, "findByIdAndUpdate")
      .resolves(mockDBUpdatedAdventure2);
    deleteAdventureStub = sinon
      .stub(Adventure, "findByIdAndDelete")
      .resolves(mockDBAdventure2);
  });

  afterEach(() => {
    createAdventureStub.restore();
    findAdventuresStub.restore();
    findOneAdventureStub.restore();
    deleteAdventureStub.restore();
    editAdventureStub.restore();
  });

  describe("createAdventure tests", () => {
    it("should return the adventure object if inputs are valid", async () => {
      const newAdventure = await adventureService.createAdventure({
        name: mockDBAdventure.name,
        description: mockDBAdventure.description,
      });
      expect(newAdventure).to.equal(mockDBAdventure);
    });

    it("should throw an error if createAdventure fails", async () => {
      createAdventureStub.rejects(new Error());
      try {
        await adventureService.createAdventure({
          name: mockDBAdventure.name,
          description: mockDBAdventure.description,
        });
        expect.fail(
          "An unexpected error occurred whilst trying to creating a new adventure."
        );
      } catch (error) {
        expect(error.message).to.equal(
          "An unexpected error occurred whilst trying to creating a new adventure."
        );
      }
    });
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

  describe("deleteAdventure tests", () => {
    it("should return the deleted adventure object if id is valid", async () => {
      const deleteIt = await adventureService.deleteAdventure(
        mockDBAdventure2._id
      );
      expect(deleteIt).to.equal(mockDBAdventure2);
    });

    it("should throw an error if deleteAdventure fails", async () => {
      deleteAdventureStub.rejects(new Error());
      try {
        await adventureService.deleteAdventure(mockDBAdventure2._id);
        expect.fail(
          "An unexpected error occurred whilst trying to delete the adventure."
        );
      } catch (error) {
        expect(error.message).to.equal(
          "An unexpected error occurred whilst trying to delete the adventure."
        );
      }
    });
  });

  describe("getOneAdventure tests", () => {
    it("should return the one adventure object", async () => {
      const findOne = await adventureService.getOneAdventure(
        mockDBAdventure2._id
      );
      expect(findOne).to.equal(mockDBAdventure2);
    });

    it("should throw an error if getOneAdventure fails", async () => {
      findOneAdventureStub.rejects(new Error());
      try {
        await adventureService.getOneAdventure(mockDBAdventure2._id);
        expect.fail(
          "An unexpected error occurred whilst searching for this adventure."
        );
      } catch (error) {
        expect(error.message).to.equal(
          "An unexpected error occurred whilst searching for this adventure."
        );
      }
    });
  });
});
