import { expect } from "chai";
import sinon from "sinon";

import AdminController from "../../src/controllers/Admin.controller.js";
import testData from "../data/testData.js";

// const { testUsers } = testData;
const testUsers = [
  { _id: 1, name: "John Doe" },
  { _id: 2, name: "Jane Doe" },
];

describe("AdminController tests", () => {
  let adminController;
  let adminService;
  let req;
  let res;

  beforeEach(() => {
    adminService = {
      getAllUsers: sinon.stub(),
      deleteUser: sinon.stub(),
    };
    adminController = new AdminController(adminService);
    req = {
      body: {},
      params: {},
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };
  });

  describe("getAllUsers tests", () => {
    it("should respond with a 200 status code", async () => {
      adminService.getAllUsers.resolves(testUsers);
      await adminController.getAllUsers(req, res);
      expect(res.status.calledWith(200)).to.be.true;
    });

    it("should respond with an array of user objects", async () => {
      adminService.getAllUsers.resolves(testUsers);
      await adminController.getAllUsers(req, res);
      expect(res.json.calledWith(testUsers)).to.be.true;
    });

    it("should respond with a 500 status code when there's an error", async () => {
      adminService.getAllUsers.rejects(new Error("aaaahhhhh!"));
      await adminController.getAllUsers(req, res);
      expect(res.status.calledWith(500)).to.be.true;
    });

    it("should respond with an error message when an error is thrown", async () => {
      const errorMessage = "Oh no, this is the worst";
      adminService.getAllUsers.rejects(new Error(errorMessage));
      await adminController.getAllUsers(req, res);
      expect(res.json.calledWith({ message: errorMessage })).to.be.true;
    });
  });

  describe("deleteUser test", () => {
    let userId;
    beforeEach(() => {
      userId = testUsers[0]._id;
      req.params = { id: userId };
    });

    it("should respond with a 200 status code", async () => {
      adminService.deleteUser.withArgs(req.params).resolves(testUsers[0]);
      await adminController.deleteUser(req, res);
      expect(res.status.calledWith(200)).to.be.true;
    });

    it("should respond with a 500 status code if it fails", async () => {
      adminService.deleteUser.withArgs(userId).rejects(new Error("MooOoOOo"));
      await adminController.deleteUser(req, res);
      expect(res.status.calledWith(500)).to.be.true;
    });

    it("should respond with an error message if it fails", async () => {
      const errorMessage = "we're out of milk";
      adminService.deleteUser.withArgs(userId).rejects(new Error(errorMessage));
      await adminController.deleteUser(req, res);
      expect(res.json.calledWith({ message: errorMessage })).to.be.true;
    });
  });
});
