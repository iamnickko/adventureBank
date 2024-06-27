import { expect } from "chai";
import bcrypt from "bcrypt";
import sinon from "sinon";

import AuthService from "../../src/services/Auth.service.js";
import Config from "../../src/config/Config.js";
import testData from "../data/testUsers.js";
import User from "../../src/models/User.model.js";

describe("AuthService tests", () => {
  let authService;
  let userFindStub;
  let userCreateStub;
  let mockDBUser;
  let newUser;
  const { testUsers, existingUser } = testData;

  before(() => {
    Config.load();
  });

  beforeEach(async () => {
    authService = new AuthService();
    const hashedPassword = bcrypt.hashSync(testUsers[1].password, 10);
    newUser = {
      username: testUsers[1].username,
      email: testUsers[1].email,
      password: testUsers[1].password,
      //   role: testUsers[1].role
    };
    mockDBUser = {
      username: testUsers[1].username,
      email: testUsers[1].email,
      password: hashedPassword,
      //   role: testUsers[1].role,
    };
    userFindStub = sinon.stub(User, "findOne").resolves(mockDBUser);
    userCreateStub = sinon.stub(User, "create").resolves(mockDBUser);
  });

  afterEach(() => {
    userFindStub.restore();
    userCreateStub.restore();
  });

  describe("Register tests", () => {
    it("should return a createdUser when username, email, and password are valid", async () => {
      const register = await authService.register(newUser);
      expect(register).to.have.property("createdUser");
    });

    it("should return an accessToken when username, email, and password are valid", async () => {
      const register = await authService.register(newUser);
      expect(register).to.have.property("accessToken");
    });

    it("should throw an error if registration fails", async () => {
      userCreateStub.rejects(new Error("Whomp Whomp Beep Boop!"));
      try {
        await authService.register(newUser);
      } catch (error) {
        expect(error).to.be.instanceOf(Error);
      }
    });
  });

  describe("Login tests", () => {
    it("should return a dbUser when email and password are valid", async () => {
      const login = await authService.login({
        email: existingUser.email,
        password: existingUser.password,
      });
      expect(login).to.have.property("dbUser");
    });

    it("should return an accessToken when email and password are valid", async () => {
      const login = await authService.login({
        email: existingUser.email,
        password: existingUser.password,
      });
      expect(login).to.have.property("dbUser");
    });

    it("should throw an error when email is invalid", async () => {
      try {
        await authService.login({
          email: "invalid",
          password: existingUser.password,
        });
      } catch (error) {
        expect(error.message).to.equal("Invalid credentials.");
      }
    });

    it("should throw an error when password is invalid", async () => {
      try {
        await authService.login({
          email: existingUser.email,
          password: "thisIsGoingToFail123!",
        });
      } catch (error) {
        expect(error.message).to.equal("Invalid credentials.");
      }
    });
  });
});
