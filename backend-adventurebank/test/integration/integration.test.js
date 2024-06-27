import bcrypt from "bcrypt";
import { expect } from "chai";
import sinon from "sinon";
import supertest from "supertest";

import AdminController from "../../src/controllers/Auth.controller.js";
import AdminService from "../../src/services/Admin.service.js";
import AuthRouter from "../../src/routes/Auth.routes.js";
import AuthService from "../../src/services/Auth.service.js";
import Config from "../../src/config/Config.js";
import Database from "../../src/database/Database.js";
import Router from "../../src/routes/Router.js";
import Server from "../../src/server/Server.js";
import testData from "../data/testUsers.js";
import AuthController from "../../src/controllers/Auth.controller.js";
import User from "../../src/models/User.model.js";

const { testUsers, newUser, existingUser } = testData;

describe("Integration Tests:", () => {
  let server;
  let database;
  let request;
  let router;
  let authController;
  let adminController;

  before(async () => {
    Config.load();
    const { PORT, HOST, DB_URI } = process.env;
    const authService = new AuthService();
    const adminService = new AdminService();
    authController = new AuthController(authService);
    adminController = new AdminController(adminService);
    router = new Router();
    const adminRouter = new AuthRouter();
    router.addRouter(adminRouter);
    database = new Database(DB_URI);
    server = new Server(PORT, HOST, router);
    server.start();
    await database.connect();
    request = supertest(server.getApp());
  });

  after(async () => {
    await database.close();
    await server.close();
  });

  beforeEach(async () => {
    await database.connect();
    try {
      await User.deleteMany();
      console.log("Database successfully cleared.");
    } catch (error) {
      console.log(error.message);
      console.log("Error whilst clearing database.");
      throw new Error();
    }
    try {
      const hashedPassword = bcrypt.hashSync(testUsers[0].password, 10);
      const hashedTestUser0 = { ...testUsers[0], password: hashedPassword };
      await User.create(hashedTestUser0);
      console.log("Successfully inserted first user.");
    } catch (error) {
      console.log(error.message);
      console.log("Error when inserting first user.");
      throw new Error();
    }
    try {
      const hashedPassword = bcrypt.hashSync(testUsers[1].password, 10);
      const hashedTestUser1 = { ...testUsers[1], password: hashedPassword };
      await User.create(hashedTestUser1);
      console.log("Successfully inserted second user.");
    } catch (error) {
      console.log(error.message);
      console.log("Error when inserting second user.");
      throw new Error();
    }
  });

  describe.skip("POST requests to /register on AuthRouter:", () => {
    it("should respond with a 201 status code when registering a valid user.", async () => {
      const response = await request.post("/auth/register").send(newUser);
      expect(response.status).to.equal(201);
    });

    it("should response with a 422 status code when invalid data is sent", async () => {
      const response = await request
        .post("/auth/register")
        .send("invalid data");
      expect(response.status).to.equal(422);
    });

    it("should respond with a 500 status code when there is an error", async () => {
      await database.close();
      const response = await request.post("/auth/register").send(newUser);
      expect(response.status).to.equal(500);
    });

    it("should respond with a 422 status code if invalid data - missing email", async () => {
      const invalidUser = { ...newUser, email: null };
      const response = await request.post("/auth/register").send(invalidUser);
      expect(response.status).to.equal(422);
      expect(response.body).to.have.property("message");
    });

    it("should respond with a 422 status code if invalid data - missing password", async () => {
      const invalidUser = { ...newUser, password: null };
      const response = await request.post("/auth/register").send(invalidUser);
      expect(response.status).to.equal(422);
      expect(response.body).to.have.property("message");
    });

    it("should respond with a 422 status code if invalid data - no email key", async () => {
      const invalidUser = { ...newUser };
      delete invalidUser.email;
      const response = await request.post("/auth/register").send(invalidUser);
      expect(response.status).to.equal(422);
      expect(response.body).to.have.property("message");
    });

    it("should respond with a 422 status code if invalid data - no password key", async () => {
      const invalidUser = { ...newUser };
      delete invalidUser.password;
      const response = await request.post("/auth/register").send(invalidUser);
      expect(response.status).to.equal(422);
      expect(response.body).to.have.property("message");
    });

    it("should respond with a 422 status code if invalid data - with additional key", async () => {
      const invalidUser = { ...newUser, injection: "bad person code" };
      delete invalidUser.password;
      const response = await request.post("/auth/register").send(invalidUser);
      expect(response.status).to.equal(422);
      expect(response.body).to.have.property("message");
    });

    it("should respond with a 400 status code if email already exists - prevent duplicate", async () => {
      const response = await request.post("/auth/register").send(existingUser);
      expect(response.status).to.equal(400);
      expect(response.body).to.have.property("message");
      expect(response.body.message).to.equal(
        "Registration failed - email already exists."
      );
    });
  });

  describe("POST requests to /login on AuthRouter", () => {
    it("should respond with 200 with valid login details", async () => {
      const response = await request.post("/auth/login").send(existingUser);
      expect(response.status).to.equal(200);
    });

    it("should respond with a 'X-Access-Token' header when valid login", async () => {
      const response = await request.post("/auth/login").send(existingUser);
      expect(response.headers["x-access-token"]).to.exist;
    });
  });
});
