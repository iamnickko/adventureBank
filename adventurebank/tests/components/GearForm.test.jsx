import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

import GearForm from "../../src/components/GearForm";
import * as gearService from "../../src/utils/gear.services";

vi.mock("../../src/utils/gear.services", () => ({
  createGear: vi.fn(),
}));
const mockFetchAllGear = vi.fn();

describe("GearForm tests", () => {
  const renderWithRouter = () => {
    const routes = [
      {
        path: "/gear",
        element: <GearForm fetchAllGear={mockFetchAllGear} />,
      },
      { path: "/", element: <p>redirected</p> },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/gear"],
    });
    render(<RouterProvider router={router} />);
  };

  describe("Submit functionality", () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it("should call createGear when the 'Add Gear' button is clicked", async () => {
      renderWithRouter();
      const nameInput = await screen.findByPlaceholderText(
        "e.g. Osprey Rook 60L"
      );
      await userEvent.type(nameInput, "Sainsbury's Bag For Life");
      const categorySelect = await screen.getByRole("combobox", {
        name: "Choose a Category:",
      });
      await userEvent.selectOptions(categorySelect, "Backpack");
      const descriptionInput = await screen.findByPlaceholderText(
        "Add some details about your piece of gear..."
      );
      await userEvent.type(descriptionInput, "It's plastic");
      const submitButton = await screen.getByRole("button", {
        name: "Add Gear",
      });
      await userEvent.click(submitButton);
      expect(gearService.createGear).toHaveBeenCalled();
    });
  });

  describe("Display error messages", () => {
    it("should render an error message if invalid character in name input", async () => {
      renderWithRouter();
      const nameInput = await screen.findByPlaceholderText(
        "e.g. Osprey Rook 60L"
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
        "Add some details about your piece of gear..."
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
