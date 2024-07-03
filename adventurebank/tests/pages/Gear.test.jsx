import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import Gear from "../../src/pages/Gear";
import { getAllGear, createGear } from "../../src/utils/gear.services";

// Mock the gear.services module
vi.mock("../../src/utils/gear.services", () => ({
  getAllGear: vi.fn(),
  createGear: vi.fn(),
}));

const mockGear = [
  {
    _id: 1,
    name: "MSR Hubba Hubba",
    category: "Tent",
    description: "high qual tent!",
  },
  {
    _id: 2,
    name: "Exped inflatable mat",
    category: "Sleep System",
    description: "Comes with an inflating dry bag",
  },
];

const renderScreen = () => {
  const routes = [{ path: "/gear", element: <Gear hasCookie={true} /> }];
  const router = createMemoryRouter(routes, { initialEntries: ["/gear"] });

  render(<RouterProvider router={router} />);
};

describe("Gear Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should display a loading message before the gear is loaded", async () => {
    getAllGear.mockResolvedValueOnce([]);
    renderScreen();
    expect(screen.getByText("Loading Gear...")).toBeInTheDocument();
  });

  it("should display the gear after the fetch request is successful", async () => {
    getAllGear.mockResolvedValueOnce(mockGear);
    renderScreen();
    expect(await screen.findByText(mockGear[0].name)).toBeInTheDocument();
  });

  it("should display a new item of gear once created", async () => {
    const newGear = {
      name: "Hiking shorts",
      category: "Clothing",
      description: "has pockets for biscuits",
    };
    getAllGear.mockResolvedValueOnce([]);
    createGear.mockResolvedValueOnce(newGear);
    getAllGear.mockResolvedValueOnce([newGear]);
    renderScreen();

    const nameInput = await screen.findByPlaceholderText(
      "e.g. Osprey Rook 60L"
    );
    await userEvent.type(nameInput, newGear.name);
    const categorySelect = await screen.getByRole("combobox", {
      name: "Choose a Category:",
    });
    await userEvent.selectOptions(categorySelect, newGear.category);
    const descriptionInput = await screen.findByPlaceholderText(
      "Add some details about your piece of gear..."
    );
    await userEvent.type(descriptionInput, newGear.description);
    const submitButton = await screen.getByRole("button", {
      name: "Add Gear",
    });
    await userEvent.click(submitButton);

    expect(await screen.findByText(newGear.name)).toBeInTheDocument();
  });
});
