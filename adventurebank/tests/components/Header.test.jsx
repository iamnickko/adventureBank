import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

import Header from "../../src/components/Header";
import * as authService from "../../src/utils/auth.services";

vi.mock("../../src/utils/auth.services", () => ({
  login: vi.fn(),
  logout: vi.fn(),
}));

const mockSetHasCookie = vi.fn();
const mockSetIsAdmin = vi.fn();

const renderScreen = ({ hasCookie = false, isAdmin = false } = {}) => {
  const routes = [
    {
      path: "/",
      element: (
        <Header
          hasCookie={hasCookie}
          isAdmin={isAdmin}
          setHasCookie={mockSetHasCookie}
          setIsAdmin={mockSetIsAdmin}
        />
      ),
    },
  ];
  const router = createMemoryRouter(routes, {
    initialEntries: ["/"],
  });

  render(<RouterProvider router={router} />);
};
describe("Header component tests", () => {
  it("should render links to authPage when user is not logged in", () => {
    renderScreen({ hasCookie: false });

    expect(screen.getByText("Register")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.queryByText("Logout")).not.toBeInTheDocument();
  });

  it("should render logout button when user is logged in", () => {
    renderScreen({ hasCookie: true });

    expect(screen.getByText("Logout")).toBeInTheDocument();
    expect(screen.queryByText("Register")).not.toBeInTheDocument();
    expect(screen.queryByText("Login")).not.toBeInTheDocument();
  });

  it("should render admin button when logged in user is an admin", () => {
    renderScreen({ hasCookie: true, isAdmin: true });

    expect(screen.getByText("Admin")).toBeInTheDocument();
  });

  it("should call logout when logout button is clicked", async () => {
    renderScreen({ hasCookie: true });

    await userEvent.click(screen.getByText("Logout"));

    expect(authService.logout).toHaveBeenCalled();
  });
});
