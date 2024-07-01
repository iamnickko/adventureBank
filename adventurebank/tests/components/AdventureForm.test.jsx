import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

import AdventureForm from "../../src/components/AdventureForm";
import * as adventureService from "../../src/utils/adventure.services";

vi.mock("../../src/utils/adventure.services", () => ({
  createAdventure: vi.fn(),
}));
const mockFetchAllAdventures = vi.fn();

describe("AdventureForm tests", () => {
  const renderWithRouter = () => {
    const routes = [
      {
        path: "/adventures",
        element: <AdventureForm fetchAllAdventures={mockFetchAllAdventures} />,
      },
      { path: "/", element: <p>redirected</p> },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/adventures"],
    });
    render(<RouterProvider router={router} />);
  };

  describe("Submit functionality", () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it("should call createAdventure when the 'Create Adventure' button is clicked", async () => {
      renderWithRouter();
      const nameInput = await screen.findByPlaceholderText(
        "e.g. One can simply walk into Mordor"
      );
      await userEvent.type(nameInput, "Adventure to Lidl!");
      const descriptionInput = await screen.findByPlaceholderText(
        "Add some details to your adventure..."
      );
      await userEvent.type(descriptionInput, "To get some off-brand biscuits!");
      const submitButton = await screen.getByRole("button", {
        name: "Create Adventure",
      });
      await userEvent.click(submitButton);
      expect(adventureService.createAdventure).toHaveBeenCalled();
    });
  });
});
