import axios from "axios";
import { authHeader } from "../../src/utils/auth.services";
import { getAllUsers, deleteUser } from "../../src/utils/admin.services";

vi.mock("axios");
vi.mock("../../src/utils/auth.services");

describe("admin.services tests", () => {
  describe("getAllUsers tests", () => {
    it("should return an array of users", async () => {
      const mockUserArray = [
        { _id: 1, name: "Custard Cream" },
        { _id: 2, name: "Biscoff" },
      ];
      axios.get.mockReturnValue({ data: mockUserArray });
      authHeader.mockReturnValue({ "X-Access-Token": "crumbs" });

      const users = await getAllUsers();

      expect(users).toEqual(mockUserArray);
      expect(axios.get).toHaveBeenCalledWith(
        `${import.meta.env.VITE_APP_API}/admin/`,
        {
          headers: authHeader(),
        }
      );
    });

    it("should throw an error if it fails", async () => {
      const errorMessage = "It error-ed";
      axios.get.mockRejectedValue(new Error(errorMessage));
      authHeader.mockReturnValue({ "X-Access-Token": "crumbly cookie" });

      await expect(getAllUsers()).rejects.toThrow(errorMessage);
    });
  });

  describe.skip("deleteUser tests", () => {
    it("should return the value of the deleted user", async () => {
      const mockDeletedUser = { _id: 1, name: "Custard Cream" };
      axios.delete.mockResolvedValue({ data: mockDeletedUser });
      authHeader.mockReturnValue({ "X-Access-Token": "digestive powder" });
      const userId = 1;

      const result = await deleteUser(userId);

      expect(result).toEqual(mockDeletedUser);
      expect(axios.delete).toHaveBeenCalledWith(
        `${import.meta.env.VITE_APP_API}/admin/user/${userId}`,
        {
          headers: { "X-Access-Token": "digestive powder" },
        }
      );
    });

    it("should throw an error when it fails", async () => {
      const errorMessage = "Error deleting user";
      axios.delete.mockRejectedValue(new Error(errorMessage));
      authHeader.mockReturnValue({ "X-Access-Token": "tetleys" });
      const userId = 1;

      await expect(deleteUser(userId)).rejects.toThrow(errorMessage);
    });
  });
});
