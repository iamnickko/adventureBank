import { expect } from "chai";
import sinon from "sinon";

import AuthController from "../../src/controllers/Auth.controller.js";
import testData from "../data/testUsers.js";

const { testUsers, newUser, existingUser } = testData;

describe("AuthController tests", () => {
  let authController;
  let authService;
  let req;
  let res;
  let createdUser;
  let loginUser;

  beforeEach(() => {
    authService = {
      register: sinon.stub(),
      login: sinon.stub(),
    };
    authController = new AuthController(authService);
    req = {
      body: {},
    };
    res = {
      set: sinon.stub().returnsThis(),
      header: sinon.stub().returnsThis(),
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };
    createdUser = { ...newUser, accessToken: "secretnessInACookie" };
    const { email, password } = existingUser;
    loginUser = { email, password };
  });

  describe("register tests", () => {
    it("should respond with a 201 status code when sent a valid new user", async () => {
      authService.register.resolves(createdUser);
      await authController.register(req, res);
      expect(res.status.calledWith(201)).to.be.true;
    });

    it("should respond with a 500 status code and error message when register fails", async () => {
      const errorMessage = "Screams in error!";
      authService.register.rejects(new Error(errorMessage));
      await authController.register(req, res);
      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ message: errorMessage })).to.be.true;
    });
  });

  describe("login tests", () => {
    it("should respond with a 200 status code if login details are valid", async () => {
      authService.login.resolves(loginUser);
      await authController.login(req, res);
      expect(res.status.calledWith(200)).to.be.true;
    });

    it("should respond with a 401 error if the user is invalid", async () => {
      authService.login.resolves(null);
      await authController.login(req, res);
      expect(res.status.calledWith(401)).to.be.true;
    });
  });
});
