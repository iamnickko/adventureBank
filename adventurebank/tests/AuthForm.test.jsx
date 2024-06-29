// import { render, screen } from "@testing-library/react";
// import { RouterProvider, createMemoryRouter } from "react-router-dom";
// import userEvent from "@testing-library/user-event";

// import AuthForm from "../src/components/AuthForm";

// describe("AuthForm tests", () => {
//   const setHasCookie = vi.fn();
//   let isLoggingIn;

//   beforeEach(() => {
//     const renderWithRouter = (isLoggingIn) => {
//       const routes = (isLoggingIn) => [
//         {
//           path: "/auth",
//           element: (
//             <AuthForm isLoggingIn={isLoggingIn} setHasCookie={setHasCookie} />
//           ),
//         },
//         { path: "/", element: <p>redirected</p> },
//       ];

//       const router = () =>
//         createMemoryRouter(routes, {
//           initialEntries: ["/auth"],
//         });

//       render(<RouterProvider router={router} />);
//     };
//   });

//   describe("Submit functionality", () => {
//     const mockLogin = vi.fn();
//     const mockRegister = vi.fn();

//     it("should call login when the login button is clicked", async () => {
//       isLoggingIn = true;
//       screen.debug();
//       const submitButton = await screen.getByRole("button", { name: "submit" });
//       await userEvent.click(submitButton);
//       expect(mockLogin).toHaveBeenCalled();
//     });
//   });
// });
