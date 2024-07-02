import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Admin from "../../src/pages/Admin";
import * as adminServices from "../../src/utils/admin.services";

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

  it("should render user data after fetching", async () => {
    render(<Admin isAdmin={true} />);
    expect(await screen.findByText(mockUsers[0].username)).toBeInTheDocument();
    expect(screen.getByText(mockUsers[1].username)).toBeInTheDocument();
  });

  it("should call deleteUser with correct user ID on delete button click", async () => {
    adminServices.deleteUser.mockResolvedValue({});
    render(<Admin isAdmin={true} />);
    expect(await screen.findByText(mockUsers[0].username)).toBeInTheDocument();

    const deleteButtons = screen.getAllByText("Delete");
    await userEvent.click(deleteButtons[0]);

    expect(adminServices.deleteUser).toHaveBeenCalledWith(mockUsers[0]._id);
  });
});
