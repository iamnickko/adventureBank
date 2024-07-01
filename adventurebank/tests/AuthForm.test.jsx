import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

import AuthForm from "../src/components/AuthForm";

import * as authService from "../src/utils/auth.services";
vi.mock("../src/utils/auth.services", () => ({
  login: vi.fn(),
  register: vi.fn(),
}));

describe("AuthForm tests", () => {
  let isLoggingIn;
  const setHasCookie = vi.fn();

  const renderWithRouter = (isLoggingIn) => {
    const routes = [
      {
        path: "/auth",
        element: (
          <AuthForm isLoggingIn={isLoggingIn} setHasCookie={setHasCookie} />
        ),
      },
      { path: "/", element: <p>redirected</p> },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/auth"],
    });
    render(<RouterProvider router={router} />);
  };

  describe("Submit functionality", () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it("should call login when the login button is clicked", async () => {
      isLoggingIn = true;
      renderWithRouter(isLoggingIn);
      const emailInput = await screen.findByPlaceholderText(
        /email@domain.com/i
      );
      await userEvent.type(emailInput, "email@test.com");
      const passwordInput = await screen.findByPlaceholderText(/password/i);
      await userEvent.type(passwordInput, "Password123!");
      const submitButton = await screen.getByRole("button", { name: "Login" });
      await userEvent.click(submitButton);
      expect(authService.login).toHaveBeenCalled();
    });

    it("should call register when the register button is clicked", async () => {
      isLoggingIn = false;
      renderWithRouter(isLoggingIn);
      const usernameInput = await screen.findByPlaceholderText(
        /e.g. epicAdventuringChamp/i
      );
      await userEvent.type(usernameInput, "epicAdventuringChamp");
      const emailInput = await screen.findByPlaceholderText(
        /email@domain.com/i
      );
      await userEvent.type(emailInput, "email@test.com");
      const passwordInput = await screen.findByPlaceholderText(/password/i);
      await userEvent.type(passwordInput, "Password123!");
      const submitButton = await screen.getByRole("button", {
        name: "Register",
      });
      await userEvent.click(submitButton);
      expect(authService.register).toHaveBeenCalled();
    });
  });
});
