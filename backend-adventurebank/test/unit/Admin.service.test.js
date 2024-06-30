import { expect } from "chai";
import sinon from "sinon";

import AdminService from "../../src/services/Admin.service.js";
import Config from "../../src/config/Config.js";
import User from "../../src/models/User.model.js";

describe.skip("AdminService tests", () => {
  let adminService;
  let findUsersStub;
  let deleteUserStub;
  let mockDBUser;
  let mockDBUser2;
  let userArray;

  before(() => {
    Config.load();
  });

  beforeEach(async () => {
    adminService = new AdminService();
    mockDBUser = {
      _id: 1,
      username: "YosemiteMound",
      email: "yosemite@mound.com",
      password: "assumeItsHashed",
    };
    mockDBUser2 = {
      _id: 2,
      username: "BikerMiceFromMars",
      email: "childhood@cartoon.com",
      password: "theyreMakingAMovie",
    };
    userArray = [mockDBUser, mockDBUser2];
    findUsersStub = sinon.stub(User, "find").resolves(userArray);
    deleteUserStub = sinon.stub(User, "findByIdAndDelete").resolves(mockDBUser);
  });

  afterEach(() => {
    findUsersStub.restore();
    deleteUserStub.restore();
  });

  describe("getAllUsers tests", () => {
    it("should return an array of user objects", async () => {
      const fetchUsers = await adminService.getAllUsers();
      expect(fetchUsers).to.equal(userArray);
    });

    it("should return an error if there are no users to display", async () => {
      findUsersStub.resolves([]);
      try {
        await adminService.getAllUsers();
        expect.fail("There are no users to display.");
      } catch (error) {
        expect(error.message).to.equal("There are no users to display.");
      }
    });

    it("should return an error message if it fails", async () => {
      findUsersStub.rejects(new Error());
      try {
        await adminService.getAllUsers();
      } catch (error) {
        expect(error.message).to.equal(
          "An unexpected error occurred whilst searching for all users."
        );
      }
    });
  });

  describe("deleteUser tests", () => {
    it("should return the user object that has just been deleted", async () => {
      const deleteUser = await adminService.deleteUser(mockDBUser._id);
      expect(deleteUser).to.equal(mockDBUser);
    });

    it("should return an error message if User doesn't exist", async () => {
      deleteUserStub.resolves({});
      try {
        await adminService.deleteUser(mockDBUser._id);
        expect.fail("There is no such user.");
      } catch (error) {
        expect(error.message).to.equal("There is no such user.");
      }
    });

    it("should return an error message if function fails", async () => {
      deleteUserStub.rejects(new Error());
      try {
        await adminService.deleteUser(mockDBUser._id);
      } catch (error) {
        expect(error.message).to.equal(
          "An unexpected error occurred whilst trying to delete user."
        );
      }
    });
  });
});
