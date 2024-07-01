// import { render, screen } from "@testing-library/react";
// import { RouterProvider, createMemoryRouter } from "react-router-dom";
// import userEvent from "@testing-library/user-event";

// import Admin from "../../src/pages/Admin";
// import * as adminServices from "../../src/utils/admin.services";

// vi.mock("../../src/utils/admin.services", {
//   deleteUser: vi.fn(),
// });

// const mockUsers = [
//   {
//     _id: "1",
//     username: "Captain Planet",
//     email: "hesOur@hero.com",
//     adventures: [],
//     createdAt: "2021-01-01",
//     updatedAt: "2021-01-02",
//   },
//   {
//     _id: "2",
//     username: "Johnny Quest",
//     email: "goesOn@quests.com",
//     adventures: [],
//     createdAt: "2021-02-01",
//     updatedAt: "2021-02-02",
//   },
// ];

// const renderScreen = () => {
//   const routes = [
//     {
//       path: "/admin",
//       element: <Admin />,
//     },
//   ];
//   const router = createMemoryRouter(routes, {
//     initialEntries: ["/admin"],
//   });

//   render(<RouterProvider router={router} />);
// };

// describe("Admin page tests", () => {
//   beforeEach(() => {
//     vi.clearAllMocks();
//     adminServices.getAllUsers.mockResolvedValue(mockUsers);
//   });

//   it("should render and fetch user data correctly", async () => {
//     renderScreen();
//     expect(screen.getByText(/loading data.../i)).toBeInTheDocument();
//     await screen.findByText(mockUsers[0].username);
//     expect(screen.queryByText(/loading data.../i)).not.toBeInTheDocument();
//     expect(screen.getByText(mockUsers[0].username)).toBeInTheDocument();
//     expect(screen.getByText(mockUsers[1].username)).toBeInTheDocument();
//   });

//   it("should display the correct number of users", async () => {
//     renderScreen();
//     await screen.findAllByRole("article");
//     expect(screen.getAllByRole("article")).toHaveLength(mockUsers.length);
//   });

//   it.skip("should call deleteUser on button click", async () => {
//     renderScreen();
//     await screen.findByText(mockUsers[0].username);
//     const deleteButtons = await screen.getAllByText("Delete");
//     await userEvent.click(deleteButtons[0]);
//     expect(adminServices.deleteUser).toHaveBeenCalledWith(mockUsers[0]._id);
//   });
// });

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Admin from "../../src/pages/Admin";
import * as adminServices from "../../src/utils/admin.services";

// Mock the admin.services module
vi.mock("../../src/utils/admin.services");

const mockUsers = [
  {
    _id: "1",
    username: "Captain Planet",
    email: "hesOur@hero.com",
    adventures: [],
    createdAt: "2021-01-01",
    updatedAt: "2021-01-02",
  },
  {
    _id: "2",
    username: "Johnny Quest",
    email: "goesOn@quests.com",
    adventures: [],
    createdAt: "2021-02-01",
    updatedAt: "2021-02-02",
  },
];

describe("Admin page tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    adminServices.getAllUsers.mockResolvedValue(mockUsers);
  });

  it("renders user data after fetching", async () => {
    render(<Admin />);
    expect(await screen.findByText(mockUsers[0].username)).toBeInTheDocument();
    expect(screen.getByText(mockUsers[1].username)).toBeInTheDocument();
  });

  it("calls deleteUser with correct user ID on delete button click", async () => {
    adminServices.deleteUser.mockResolvedValue({});
    render(<Admin />);
    expect(await screen.findByText(mockUsers[0].username)).toBeInTheDocument();

    const deleteButtons = screen.getAllByText("Delete");
    await userEvent.click(deleteButtons[0]);

    expect(adminServices.deleteUser).toHaveBeenCalledWith(mockUsers[0]._id);
  });
});
