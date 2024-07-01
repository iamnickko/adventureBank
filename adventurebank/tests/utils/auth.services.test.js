import axios from "axios";
import Cookies from "js-cookie";
import {
  authHeader,
  checkForCookie,
  login,
  logout,
  register,
} from "../../src/utils/auth.services";

vi.mock("axios");
vi.mock("js-cookie");

describe("auth.services tests", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("register tests", () => {
    let formInput = {
      username: "personWhoHikes",
      email: "test@email.com",
      password: "hashed4Sure",
    };

    it("should return data when the request is successful", async () => {
      const data = { success: true };
      axios.post.mockResolvedValue({ data });

      const response = await register(formInput);

      expect(response).toEqual(data);
      expect(axios.post).toHaveBeenCalledWith(
        `${import.meta.env.VITE_APP_API}/auth/register`,
        formInput
      );
    });

    it("should throw an error when the request fails", async () => {
      const errorMessage = "Request failed";
      axios.post.mockRejectedValue({
        response: { data: { message: errorMessage } },
      });

      await expect(register(formInput)).rejects.toThrow(errorMessage);
      expect(axios.post).toHaveBeenCalledWith(
        `${import.meta.env.VITE_APP_API}/auth/register`,
        formInput
      );
    });
  });

  describe("login tests", () => {
    let formInput = {
      email: "test@email.com",
      password: "maybeItsHashed",
    };

    it("should return data when the request is successful", async () => {
      const data = { success: true };
      axios.post.mockResolvedValue({ data });

      const response = await login(formInput);
      expect(response).toEqual(data);
      expect(axios.post).toHaveBeenCalledWith(
        `${import.meta.env.VITE_APP_API}/auth/login`,
        formInput
      );
    });
  });

  describe("logout tests", () => {
    it("should remove the 'user' cookie", () => {
      logout();
      expect(Cookies.remove).toHaveBeenCalledWith("user");
    });
  });

  describe("checkForCookie tests", () => {
    it("should return true if a 'user' cookie exists", () => {
      Cookies.get.mockReturnValue("cookieMonster");
      expect(checkForCookie()).toBe(true);
    });

    it("should return undefined if no 'user' cookie exists", () => {
      Cookies.get.mockReturnValue(undefined);
      expect(checkForCookie()).toBeUndefined();
    });
  });

  describe("authHeader tests", () => {
    let token = "itsMadeOfGold!";

    it("should set the value of 'x-access-token'", () => {
      Cookies.get.mockReturnValue(token);
      const header = { "X-Access-Token": token };
      expect(authHeader()).toEqual(header);
    });

    it("should return an empty object if there is no cookie", () => {
      Cookies.get.mockReturnValue(undefined);
      expect(authHeader()).toEqual({});
    });
  });
});
