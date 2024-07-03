import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AdventureDetails from "../../src/pages/AdventureDetails";
import * as adventureServices from "../../src/utils/adventure.services";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

vi.mock("../../src/utils/adventure.services");

const mockAdventure = {
  _id: "1",
  name: "Lost in Space",
  description: "Joey from friends is stuck on a spaceship",
};
const updatedAdventure = {
  _id: "1",
  name: "Lost in Space",
  description: "No longer as we found a packet of biscuits",
};

describe("AdventureDetails page tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    adventureServices.getOneAdventure.mockResolvedValue(mockAdventure);
  });

  it("should render the one adventure data after fetching", async () => {
    const router = createMemoryRouter(
      [
        {
          path: "/adventures/:id",
          element: <AdventureDetails />,
        },
      ],
      {
        initialEntries: ["/adventures/1"],
      }
    );

    render(<RouterProvider router={router} />);

    const nameInput = await screen.findByLabelText("Name Your Adventure");

    expect(nameInput.value).toBe(mockAdventure.name);
    expect(screen.getByText(mockAdventure.description)).toBeInTheDocument();
  });
});
