import { expect } from "chai";
import sinon from "sinon";

import AdventureController from "../../src/controllers/Adventure.controller.js";

describe("AdventureController tests", () => {
  let adventureController;
  let adventureService;
  let req;
  let res;

  beforeEach(() => {
    adventureService = {
      createAdventure: sinon.stub().returnsThis(),
      getAllAdventures: sinon.stub().returnsThis(),
      deleteAdventure: sinon.stub().returnsThis(),
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
    it("should respond with a 200 status code", async () => {
      adventureService.createAdventure.resolves();
    });
  });
});
