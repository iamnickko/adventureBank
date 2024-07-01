import bcrypt from "bcrypt";
import { expect } from "chai";
import jwt from "jsonwebtoken";
import supertest from "supertest";

import AdminController from "../../src/controllers/Auth.controller.js";
import AdminService from "../../src/services/Admin.service.js";
import AdminRouter from "../../src/routes/Admin.routes.js";
import AdventureController from "../../src/controllers/Adventure.controller.js";
import Adventure from "../../src/models/Adventure.model.js";
import AdventureService from "../../src/services/Adventure.service.js";
import AdventureRouter from "../../src/routes/Adventure.routes.js";
import AuthController from "../../src/controllers/Auth.controller.js";
import AuthRouter from "../../src/routes/Auth.routes.js";
import AuthService from "../../src/services/Auth.service.js";
import Config from "../../src/config/Config.js";
import Database from "../../src/database/Database.js";
import GearController from "../../src/controllers/Gear.controller.js";
import GearRouter from "../../src/routes/Gear.routes.js";
import GearService from "../../src/services/Gear.service.js";
import Router from "../../src/routes/Router.js";
import Server from "../../src/server/Server.js";
import testData from "../data/testData.js";
import User from "../../src/models/User.model.js";
import Gear from "../../src/models/Gear.model.js";

const { testUsers, newUser, existingUser, testAdventures, testGearItems } =
  testData;

describe("Integration Tests:", () => {
  let server;
  let database;
  let request;
  let router;
  let authController;
  let adminController;
  let adventureController;
  let gearController;

  before(async () => {
    Config.load();
    const { PORT, HOST, DB_URI } = process.env;
    const authService = new AuthService();
    const adminService = new AdminService();
    const adventureService = new AdventureService();
    const gearService = new GearService();
    authController = new AuthController(authService);
    adminController = new AdminController(adminService);
    adventureController = new AdventureController(adventureService);
    gearController = new GearController(gearService);
    router = new Router();
    const authRouter = new AuthRouter();
    const adminRouter = new AdminRouter();
    const adventureRouter = new AdventureRouter();
    const gearRouter = new GearRouter();
    router.addRouter(authRouter);
    router.addRouter(adminRouter);
    router.addRouter(adventureRouter);
    router.addRouter(gearRouter);
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
      await Adventure.deleteMany();
      await Gear.deleteMany();
      console.log("Database successfully cleared.");
    } catch (error) {
      console.log(error.message);
      console.log("Error whilst clearing database.");
      throw new Error();
    }
    try {
      const hashedPassword = bcrypt.hashSync(testUsers[0].password, 10);
      const hashedTestUser0 = { ...testUsers[0], password: hashedPassword };
      const user = await User.create(hashedTestUser0);
      console.log("Successfully inserted first user.");
      await Adventure.create({ ...testAdventures[0], userId: user._id });
      console.log("and their adventure.");
      await Gear.create({ ...testGearItems[0], userId: user._id });
      await Gear.create({ ...testGearItems[1], userId: user._id });
      console.log("and two pieces of gear.");
    } catch (error) {
      console.log(error.message);
      console.log("Error when inserting first user.");
      throw new Error();
    }
    try {
      const hashedPassword = bcrypt.hashSync(testUsers[1].password, 10);
      const hashedTestUser1 = { ...testUsers[1], password: hashedPassword };
      const user = await User.create(hashedTestUser1);
      console.log("Successfully inserted second user.");
      await Adventure.create({ ...testAdventures[1], userId: user._id });
      console.log("and their adventure.");
      await Gear.create({ ...testGearItems[2], userId: user._id });
      await Gear.create({ ...testGearItems[3], userId: user._id });
      console.log("and two pieces of gear.");
    } catch (error) {
      console.log(error.message);
      console.log("Error when inserting second user.");
      throw new Error();
    }
  });

  describe.skip("AuthRouter Tests", () => {
    describe("POST requests to /register on AuthRouter:", () => {
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
        const response = await request
          .post("/auth/register")
          .send(existingUser);
        expect(response.status).to.equal(400);
        expect(response.body).to.have.property("message");
        expect(response.body.message).to.equal(
          "Registration failed - email already exists."
        );
      });
    });

    describe("POST requests to /login on AuthRouter", () => {
      const { email, password } = existingUser;

      it("should respond with 200 with valid login details", async () => {
        const response = await request.post("/auth/login").send(existingUser);
        expect(response.status).to.equal(200);
      });

      it("should respond with a 'X-Access-Token' header when valid login", async () => {
        const response = await request.post("/auth/login").send(existingUser);
        expect(response.headers["x-access-token"]).to.exist;
      });

      it("should return a 401 status code if email does not exist in the database", async () => {
        const nonExistentUserLogin = {
          email: "nonexistent@example.com",
          password: "Password456!",
        };
        const response = await request
          .post("/auth/login")
          .send(nonExistentUserLogin);
        expect(response.status).to.equal(401);
        expect(response.body.message).to.equal("Invalid credentials.");
      });

      it("should return a 401 status code if email is invalid", async () => {
        const invalidLogin = { email: "wrong", password: "Password456!" };
        const response = await request.post("/auth/login").send(invalidLogin);
        expect(response.status).to.equal(401);
        expect(response.body.message).to.equal("Invalid credentials.");
      });

      it("should return a 401 status code if password is invalid", async () => {
        const invalidLogin = { email, password: "invalid" };
        const response = await request.post("/auth/login").send(invalidLogin);
        expect(response.status).to.equal(401);
        expect(response.body.message).to.equal("Invalid credentials.");
      });
    });
  });

  describe.skip("AdminRouter tests", () => {
    let adminUser;
    let token;
    let userToDelete;

    beforeEach(async () => {
      adminUser = await User.findOne({ email: "ranger@rick.com" });
      token = jwt.sign({ id: adminUser._id }, process.env.JWT_SECRET, {
        expiresIn: 86400,
      });
      userToDelete = await User.findOne({ email: existingUser.email });
    });

    describe("GET requests to /admin on AdminRouter", () => {
      it("should return 200 status when role is 'admin'", async () => {
        const response = await request
          .get("/admin")
          .set("x-access-token", token);
        expect(response.status).to.equal(200);
      });

      it("should return a 401 status code if no token", async () => {
        const response = await request.get("/admin");
        expect(response.status).to.equal(401);
      });

      it("should return a 403 if the token is invalid", async () => {
        token = "invalid";
        const response = await request
          .get("/admin")
          .set("x-access-token", token);
        expect(response.status).to.equal(403);
      });

      it("should return a 403 if the token is valid but role is 'user'", async () => {
        const notAdmin = await User.findOne({ email: existingUser.email });
        token = jwt.sign({ id: notAdmin._id }, process.env.JWT_SECRET, {
          expiresIn: 86400,
        });
        const response = await request
          .get("/admin")
          .set("x-access-token", token);
        expect(response.status).to.equal(403);
      });
    });

    describe("DELETE requests to /admin/user/ on AdminRouter", () => {
      it("should respond with 200 status code when role is admin", async () => {
        const response = await request
          .delete(`/admin/user/${userToDelete._id}`)
          .set("x-access-token", token);
        expect(response.status).to.equal(200);
      });

      it("should respond with 401 status code if no token", async () => {
        const response = await request.delete(
          `/admin/user/${userToDelete._id}`
        );
        expect(response.status).to.equal(401);
      });

      it("should respond with 403 status code if token is invalid", async () => {
        token = "invalid";
        const response = await request
          .delete(`/admin/user/${userToDelete._id}`)
          .set("x-access-token", token);
        expect(response.status).to.equal(403);
      });

      it("should respond with 403 status code if role is 'user'", async () => {
        const notAdmin = await User.findOne({ email: existingUser.email });
        token = jwt.sign({ id: notAdmin._id }, process.env.JWT_SECRET, {
          expiresIn: 86400,
        });
        const response = await request
          .delete(`/admin/user/${userToDelete._id}`)
          .set("x-access-token", token);
        expect(response.status).to.equal(403);
      });
    });
  });

  describe.skip("AdventureRouter tests", () => {
    let jwtToken;
    let user;

    beforeEach(async () => {
      user = await User.findOne({ email: testUsers[1].email });
      jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: 86400,
      });
    });

    describe("POST requests to /adventures on AdventureRouter", () => {
      it("should respond with a 200 status code when adventure is valid", async () => {
        const response = await request
          .post("/adventures")
          .set("x-access-token", jwtToken)
          .send(testAdventures[0]);
        expect(response.status).to.equal(201);
      });

      it("should return a 401 status code if no token", async () => {
        const response = await request
          .post("/adventures")
          .send(testAdventures[0]);
        expect(response.status).to.equal(401);
      });

      it("should return a 403 if the token is invalid", async () => {
        jwtToken = "invalid";
        const response = await request
          .post("/adventures")
          .set("x-access-token", jwtToken);
        expect(response.status).to.equal(403);
      });
    });

    describe("GET requests to /adventures on AdventureRouter", () => {
      it("should respond with a 200 status code if valid", async () => {
        const response = await request
          .get("/adventures")
          .set("x-access-token", jwtToken);
        expect(response.status).to.equal(200);
      });

      it("should return a 401 status code if no token", async () => {
        const response = await request.get("/adventures");
        expect(response.status).to.equal(401);
      });

      it("should return a 403 if the token is invalid", async () => {
        jwtToken = "invalid";
        const response = await request
          .get("/adventures")
          .set("x-access-token", jwtToken);
        expect(response.status).to.equal(403);
      });
    });

    describe("DELETE requests to /adventures/:id on AdventureRouter", () => {
      it("should respond with a 200 status code if valid", async () => {
        user = await User.findOne({ email: testUsers[0].email });
        const adventure = await Adventure.findOne({ userId: user._id });
        const response = await request
          .delete(`/adventures/${adventure._id}`)
          .set("x-access-token", jwtToken);
        expect(response.status).to.equal(200);
      });

      it("should return a 401 status code if no token", async () => {
        user = await User.findOne({ email: testUsers[0].email });
        const adventure = await Adventure.findOne({ userId: user._id });
        const response = await request.delete(`/adventures/${adventure._id}`);
        expect(response.status).to.equal(401);
      });

      it("should return a 403 if the token is invalid", async () => {
        jwtToken = "invalid";
        user = await User.findOne({ email: testUsers[0].email });
        const adventure = await Adventure.findOne({ userId: user._id });
        const response = await request
          .delete(`/adventures/${adventure._id}`)
          .set("x-access-token", jwtToken);
        expect(response.status).to.equal(403);
      });
    });
  });

  describe("GearRouter tests", () => {
    it("should", () => {
      expect(true).to.be.true;
    });
  });
});
