import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

import AdventureForm from "../../src/components/AdventureForm";
import * as adventureService from "../../src/utils/adventure.services";

vi.mock("../../src/utils/adventure.services", () => ({
  createAdventure: vi.fn(),
}));
const mockOnSubmitEdit = vi.fn();
const mockAdventure = {
  _id: 1,
  name: "To Lidl!",
  description: "For budget biscuits!",
};

describe("AdventureForm tests", () => {
  const renderWithRouter = () => {
    const routes = [
      {
        path: "/adventures",
        element: (
          <AdventureForm
            handleSubmit={mockOnSubmitEdit}
            adventureData={mockAdventure}
          />
        ),
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
      expect(mockOnSubmitEdit).toHaveBeenCalled();
    });
  });

  describe("Display error messages", async () => {
    it("should render an error message if invalid character in name input", async () => {
      renderWithRouter();
      const nameInput = await screen.findByPlaceholderText(
        "e.g. One can simply walk into Mordor"
      );
      await userEvent.type(nameInput, "Ü");
      nameInput.blur();
      expect(
        await screen.findByText(
          "Please use only alphanumeric characters and !-@./#&+"
        )
      ).toBeInTheDocument();
    });

    it("should render an error message if invalid character in description input", async () => {
      renderWithRouter();
      const descriptionInput = await screen.findByPlaceholderText(
        "Add some details to your adventure..."
      );
      await userEvent.type(descriptionInput, "Ü");
      descriptionInput.blur();
      expect(
        await screen.findByText(
          "Please use only alphanumeric characters and !-@./#&+"
        )
      ).toBeInTheDocument();
    });
  });
});
