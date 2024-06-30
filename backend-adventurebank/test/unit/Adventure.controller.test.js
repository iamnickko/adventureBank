import { expect } from "chai";
import sinon from "sinon";

import AdventureController from "../../src/controllers/Adventure.controller.js";
import testData from "../data/testData.js";

// const { testAdventures } = testData;
const testAdventures = [
  { _id: 1, name: "abc", description: "xyz" },
  { _id: 2, name: "def", description: "123" },
];

describe("AdventureController tests", () => {
  let adventureController;
  let adventureService;
  let req;
  let res;

  beforeEach(() => {
    adventureService = {
      createAdventure: sinon.stub(),
      getAllAdventures: sinon.stub(),
      deleteAdventure: sinon.stub(),
    };
    adventureController = new AdventureController(adventureService);
    req = {
      body: {},
      params: {},
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };
  });

  describe("createAdventure tests", () => {
    it("should respond with a 201 status code", async () => {
      adventureService.createAdventure.resolves(testAdventures[0]);
      await adventureController.createAdventure(req, res);
      expect(res.status.calledWith(201)).to.be.true;
    });

    it("should respond with 500 if createAdventure fails", async () => {
      const errorMessage = "yuck!";
      adventureService.createAdventure.rejects(new Error(errorMessage));
      await adventureController.createAdventure(req, res);
      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ message: errorMessage }));
    });

    it("should respond with an error message if createAdventure fails", async () => {
      const errorMessage = "out of petrol";
      adventureService.createAdventure.rejects(new Error(errorMessage));
      await adventureController.createAdventure(req, res);
      expect(res.json.calledWith({ message: errorMessage })).to.be.true;
    });
  });

  describe("getAllAdventures tests", () => {
    it("should respond with 200 when valid", async () => {
      adventureService.getAllAdventures.resolves(testAdventures);
      await adventureController.getAllAdventures(req, res);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(testAdventures)).to.be.true;
    });

    it("should respond with 500 if getAllAdventures fails", async () => {
      const errorMessage = "OH NO!";
      adventureService.getAllAdventures.rejects(new Error(errorMessage));
      await adventureController.getAllAdventures(req, res);
      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ message: errorMessage }));
    });

    it("should respond with an error message if getAllAdventures fails", async () => {
      const errorMessage = "Do more frontend tests...";
      adventureService.getAllAdventures.rejects(new Error(errorMessage));
      await adventureController.getAllAdventures(req, res);
      expect(res.json.calledWith({ message: errorMessage })).to.be.true;
    });
  });

  describe("deleteAdventure tests", () => {
    let adventureId;

    beforeEach(() => {
      adventureId = testAdventures[0]._id;
      req.params = { id: adventureId };
    });

    it("should respond with 200 status code", async () => {
      adventureService.deleteAdventure
        .withArgs(adventureId)
        .resolves(testAdventures[0]);
      await adventureController.deleteAdventure(req, res);
      expect(res.status.calledWith(200)).to.be.true;
    });

    it("should respond with a 500 when deleteAdventure fails", async () => {
      adventureService.deleteAdventure
        .withArgs(adventureId)
        .rejects(new Error("It fails..."));
      await adventureController.deleteAdventure(req, res);
      expect(res.status.calledWith(500)).to.be.true;
    });

    it("should respond with an error message if deleteAdventure fails", async () => {
      const errorMessage = "pineapple on pizza";
      adventureService.deleteAdventure
        .withArgs(adventureId)
        .rejects(new Error(errorMessage));
      await adventureController.deleteAdventure(req, res);
      expect(res.json.calledWith({ message: errorMessage })).to.be.true;
    });
  });
});
