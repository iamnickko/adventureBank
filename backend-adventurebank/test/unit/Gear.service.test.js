import { expect } from "chai";
import sinon from "sinon";

import GearService from "../../src/services/Gear.service.js";
import Gear from "../../src/models/Gear.model.js";
import Config from "../../src/config/Config.js";
import testData from "../data/testData.js";

const { testGearItems } = testData;

describe("GearService tests", () => {
  let gearService;
  let createGearStub;
  let findGearStub;
  let deleteGearStub;
  let mockDBGear1;
  let mockDBGear2;
  let gearArray;

  before(() => {
    Config.load();
  });

  beforeEach(() => {
    gearService = new GearService();
    mockDBGear1 = testGearItems[1];
    mockDBGear2 = testGearItems[3];
    gearArray = [mockDBGear1, mockDBGear2];
    createGearStub = sinon.stub(Gear, "create").resolves(mockDBGear1);
    findGearStub = sinon.stub(Gear, "find").resolves(gearArray);
    deleteGearStub = sinon
      .stub(Gear, "findByIdAndDelete")
      .resolves(mockDBGear2);
  });

  afterEach(() => {
    createGearStub.restore();
    findGearStub.restore();
    deleteGearStub.restore();
  });

  describe("getAllGear tests", () => {
    it("should return an array of gear objects", async () => {
      const fetchGear = await gearService.getAllGear();
      expect(fetchGear).to.equal(gearArray);
    });

    it("should return an error if there is no gear to display", async () => {
      findGearStub.resolves([]);
      try {
        await gearService.getAllGear();
        expect.fail("There is no gear to display.");
      } catch (error) {
        expect(error.message).to.equal("There is no gear to display.");
      }
    });

    it("should return an error if getAllGear fails", async () => {
      findGearStub.rejects(new Error());
      try {
        await gearService.getAllGear();
        expect.fail(
          "An unexpected error occurred whilst searching for your gear."
        );
      } catch (error) {
        expect(error.message).to.equal(
          "An unexpected error occurred whilst searching for your gear."
        );
      }
    });
  });

  describe("createGear tests", () => {
    it("should return the gear object if details are valid", async () => {
      const newGearItem = await gearService.createGear(mockDBGear1);
      expect(newGearItem).to.equal(mockDBGear1);
    });

    it("should throw an error if createGear fails", async () => {
      createGearStub.rejects(new Error());
      try {
        await gearService.createGear(mockDBGear1);
        expect.fail(
          "An unexpected error occurred whilst trying to create new gear."
        );
      } catch (error) {
        expect(error.message).to.equal(
          "An unexpected error occurred whilst trying to create new gear."
        );
      }
    });
  });

  describe("deleteGear tests", () => {
    it("should return the gear object if id is valid", async () => {
      const deleteTheGear = await gearService.deleteGear(mockDBGear2._id);
      expect(deleteTheGear).to.equal(mockDBGear2);
    });

    it("should throw an error if deleteGear fails", async () => {
      deleteGearStub.rejects(new Error());
      try {
        await gearService.deleteGear(mockDBGear2._id);
        expect.fail(
          "An unexpected error occurred whilst trying to delete the gear item."
        );
      } catch (error) {
        expect(error.message).to.equal(
          "An unexpected error occurred whilst trying to delete the gear item."
        );
      }
    });
  });
});
