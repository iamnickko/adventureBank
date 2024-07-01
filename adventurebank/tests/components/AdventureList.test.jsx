import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

import AdventureList from "../../src/components/AdventureList";
import { deleteAdventure } from "../../src/utils/adventure.services";

vi.mock("../../src/utils/adventure.services", () => ({
  deleteAdventure: vi.fn(),
}));

const mockFetchAllAdventures = vi.fn();
const mockAllAdventures = [
  { _id: "1", name: "To M&S", description: "For the fanciest of biscuits" },
  { _id: "2", name: "Trip to garage", description: "Petrol biscuits" },
];

const renderScreen = ({ allAdventures = mockAllAdventures } = {}) => {
  const routes = [
    {
      path: "/adventures",
      element: (
        <AdventureList
          allAdventures={allAdventures}
          fetchAllAdventures={mockFetchAllAdventures}
        />
      ),
    },
  ];
  const router = createMemoryRouter(routes, {
    initialEntries: ["/adventures"],
  });

  render(<RouterProvider router={router} />);
};

describe("AdventureList tests", () => {
  it("displays a message when there are no adventure", async () => {
    renderScreen({ allAdventures: [] });
    expect(
      await screen.getByText("You have no adventures - Let's create one!")
    ).toBeInTheDocument();
  });

  it("displays adventures correctly", () => {
    renderScreen();
    mockAllAdventures.forEach((adventure) => {
      expect(screen.getByText(adventure.name)).toBeInTheDocument();
      expect(screen.getByText(adventure.description)).toBeInTheDocument();
    });
  });

  it("calls deleteAdventure on button click", async () => {
    renderScreen();
    const deleteBtn = await screen.findAllByRole("button", { name: "Delete" });
    await userEvent.click(deleteBtn[0]);
    expect(deleteAdventure).toHaveBeenCalled(mockAllAdventures[0]._id);
  });
});
