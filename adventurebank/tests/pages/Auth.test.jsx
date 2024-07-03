import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import Auth from "../../src/pages/Auth";

const mockSetHasCookie = vi.fn();
const mockSetIsAdmin = vi.fn();

describe("Auth page tests", () => {
  const renderScreen = (mode) => {
    const routes = [
      {
        path: "/auth",
        element: (
          <Auth setHasCookie={mockSetHasCookie} setIsAdmin={mockSetIsAdmin} />
        ),
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: [`/auth?mode=${mode}`],
    });

    render(<RouterProvider router={router} />);
  };

  it("should display 'Login' when mode is login", async () => {
    renderScreen("login");
    expect(
      await screen.findByRole("button", { name: "Login" })
    ).toBeInTheDocument();
  });

  it("should display Register when mode is not login", async () => {
    renderScreen("register");
    expect(
      await screen.findByRole("button", { name: "Register" })
    ).toBeInTheDocument();
  });
});
