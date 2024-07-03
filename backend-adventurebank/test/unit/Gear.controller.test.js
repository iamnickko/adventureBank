import { expect } from "chai";
import sinon from "sinon";

import GearController from "../../src/controllers/Gear.controller.js";

const testGear = [
  {
    _id: 1,
    name: "a 60L backpack",
    category: "Backpack",
    description: "can hold lots of biscuits",
  },
  {
    _id: 2,
    name: "cooking pot",
    category: "Kitchen",
    description: "has no business with biscuits",
  },
];

describe("GearController tests", () => {
  let gearController;
  let gearService;
  let req;
  let res;
  let newGear;

  beforeEach(() => {
    gearService = {
      createGear: sinon.stub(),
      getAllGear: sinon.stub(),
      deleteGear: sinon.stub(),
    };
    gearController = new GearController(gearService);
    req = {
      body: {},
      params: {},
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };
  });

  describe("createGear tests", () => {
    newGear = {
      name: "spork",
      category: "Kitchen",
      description: "weird choice for biscuits",
    };

    it("should return a 201 status code if data is valid", async () => {
      gearService.createGear.resolves(newGear);
      await gearController.createGear(req, res);
      expect(res.status.calledWith(201)).to.be.true;
    });

    it("should return a 500 status code if the function fails", async () => {
      gearService.createGear.rejects(new Error("fails!"));
      await gearController.createGear(req, res);
      expect(res.status.calledWith(500)).to.be.true;
    });

    it("should throw an error message if the function fails", async () => {
      const errorMessage = "we dropped the biscuits!";
      gearService.createGear.rejects(new Error(errorMessage));
      await gearController.createGear(req, res);
      expect(res.json.calledWith({ message: errorMessage }));
    });
  });
});
