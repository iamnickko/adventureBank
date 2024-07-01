import axios from "axios";
import { authHeader } from "../../src/utils/auth.services";
import { createAdventure } from "../../src/utils/adventure.services";

vi.mock("axios");
vi.mock("../../src/utils/auth.services");

describe("adventure.service tests", () => {
  let mockAdventure1 = {
    _id: 1,
    name: "To Tescos",
    description: "FOR BISCUITS!",
  };
  let mockAdventure2 = {
    _id: 2,
    name: "Return to Tescos",
    description: "forgot to get milk",
  };
  let adventureArray = [mockAdventure1, mockAdventure2];

  describe("createAdventure tests", () => {
    const formInput = {
      name: "To Tescos",
      description: "FOR BISCUITS!",
    };

    afterEach(() => {
      vi.clearAllMocks();
    });

    it("should return the created adventure object", async () => {
      axios.post.mockResolvedValue({ data: mockAdventure1 });
      authHeader.mockReturnValue({ "X-Access-Token": "rich tea" });

      const newAdventure = await createAdventure(formInput);

      expect(newAdventure).toEqual(mockAdventure1);
    });

    it("should throw an error if it fails", async () => {
      const errorMessage = "an error";
      axios.post.mockRejectedValue(new Error(errorMessage));
      authHeader.mockReturnValue({ "X-Access-Token": "crumbly cookie" });

      try {
        await createAdventure(formInput);
        throw new Error("making it throw an error");
      } catch (error) {
        expect(error.message).toContain(errorMessage);
      }
    });
  });
});
