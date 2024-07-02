import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

import Adventures from "../../src/pages/Adventures";
import { getAllAdventures } from "../../src/utils/adventure.services";

vi.mock("../../src/utils/adventure.services", () => ({
  getAllAdventures: vi.fn(),
}));

const mockAllAdventures = [
  { _id: "1", name: "To M&S", description: "For the fanciest of biscuits" },
  { _id: "2", name: "Trip to garage", description: "Petrol biscuits" },
];
const mockHasCookie = vi.fn();

const renderScreen = () => {
  const routes = [
    {
      path: "/adventures",
      element: <Adventures hasCookie={mockHasCookie} />,
    },
  ];
  const router = createMemoryRouter(routes, {
    initialEntries: ["/adventures"],
  });

  render(<RouterProvider router={router} />);
};

describe("AdventureList tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("displays a message when the AdventureList is loading", async () => {
    getAllAdventures.mockResolvedValue(mockAllAdventures);
    renderScreen();
    expect(await screen.getByText("Loading adventures...")).toBeInTheDocument();
  });
});
