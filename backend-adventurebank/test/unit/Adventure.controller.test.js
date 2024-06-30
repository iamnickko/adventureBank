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
    };
    res = {
      headers: sinon.stub().returnsThis(),
      set: sinon.stub().returnsThis(),
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
  });
});
