import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

import GearList from "../../src/components/GearList";
import { deleteGear } from "../../src/utils/gear.services";

vi.mock("../../src/utils/gear.services", () => ({
  deleteGear: vi.fn(),
}));

const mockFetchAllGear = vi.fn();
const mockAllGear = [
  {
    _id: "1",
    name: "Sea to Summit",
    category: "Sleep System",
    description: "Interior pocket for night time biscuits",
  },
  {
    _id: "2",
    name: "5L Dry Bag",
    category: "Organiser",
    description: "Capacity for 5L of digestives",
  },
];

const renderScreen = ({ allGear = mockAllGear } = {}) => {
  const routes = [
    {
      path: "/gear",
      element: <GearList allGear={allGear} fetchAllGear={mockFetchAllGear} />,
    },
  ];
  const router = createMemoryRouter(routes, {
    initialEntries: ["/gear"],
  });

  render(<RouterProvider router={router} />);
};

describe("GearList tests", () => {
  it("displays a message when there is no gear", async () => {
    renderScreen({ allGear: [] });
    expect(
      await screen.getByText("You have no gear - Let's create some!")
    ).toBeInTheDocument();
  });

  it("displays gear correctly", () => {
    renderScreen();
    mockAllGear.forEach((gear) => {
      expect(screen.getByText(gear.name)).toBeInTheDocument();
      expect(screen.getByText(gear.description)).toBeInTheDocument();
    });
  });

  it("calls deleteGear on button click", async () => {
    renderScreen();
    const deleteBtn = await screen.findAllByRole("button", { name: "Delete" });
    await userEvent.click(deleteBtn[0]);
    expect(deleteGear).toHaveBeenCalled(mockAllGear[0]._id);
  });
});
