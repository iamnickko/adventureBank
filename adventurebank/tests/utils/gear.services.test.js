import axios from "axios";
import { authHeader } from "../../src/utils/auth.services";
import {
  createGear,
  getAllGear,
  deleteGear,
} from "../../src/utils/gear.services";

vi.mock("axios");
vi.mock("../../src/utils/auth.services");

describe("gear.services tests", () => {
  let mockGear1 = {
    _id: 1,
    name: "4-Wheeled Trolley",
    category: "Backpack",
    description: "Great for carrying all the biscuits",
  };
  let mockGear2 = {
    _id: 2,
    name: "Titanium Mug",
    category: "Kitchen",
    description: "Holds coffee that fuels the biscuit buying",
  };
  let gearArray = [mockGear1, mockGear2];

  describe("createGear tests", () => {
    const formInput = {
      name: "Wallet",
      category: "Other",
      description: "Holds cash used to purchase biscuits",
    };

    afterEach(() => {
      vi.clearAllMocks();
    });

    it("should return the created gear object", async () => {
      axios.post.mockResolvedValue({ data: mockGear1 });
      authHeader.mockReturnValue({ "X-Access-Token": "ginger nuts" });

      const newGear = await createGear(formInput);
      expect(newGear).toEqual(mockGear1);
    });
  });

  describe("getAllGear tests", () => {
    it("should return an array of gear objects", async () => {
      axios.get.mockResolvedValue({ data: gearArray });
      authHeader.mockReturnValue({ "X-Access-Token": "could be a penguin" });

      const allGear = await getAllGear();
      expect(allGear).toEqual(gearArray);
    });

    describe("deleteGear tests", () => {
      it("should return the gear object that was deleted", async () => {
        axios.delete.mockResolvedValue({ data: mockGear2 });
        authHeader.mockReturnValue({
          "X-Access-Token": "probably a chocolate penguin",
        });

        const deleteTheGear = await deleteGear(mockGear2._id);
        expect(deleteTheGear).toEqual(mockGear2);
      });
    });
  });
});
