import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../utils/auth.services";

const Header = ({ hasCookie, setHasCookie, isAdmin, setIsAdmin }) => {
  const navigate = useNavigate();
  const onClickHandler = () => {
    logout();
    setHasCookie(false);
    setIsAdmin(false);
    navigate("/auth?mode=login");
  };

  return (
    <header className="pb-3 mb-5 text-xl border-b-2 border-whiskey/50">
      <nav className="flex justify-between">
        <span>
          <ul className="flex gap-7">
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-whiskey" : "text-neutral-400"
                }
                to="/"
              >
                Home
              </NavLink>
            </li>
            {hasCookie && (
              <>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "text-whiskey" : "text-neutral-400"
                    }
                    to="/adventures"
                  >
                    Adventures
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "text-whiskey" : "text-neutral-400"
                    }
                    to="/gear"
                  >
                    Gear
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </span>
        {hasCookie && (
          <span>
            {hasCookie && isAdmin && (
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-whiskey mr-5" : "text-neutral-400 mr-5"
                }
                to="/admin"
              >
                Admin
              </NavLink>
            )}
            <button className="text-neutral-400" onClick={onClickHandler}>
              Logout
            </button>
          </span>
        )}

        {!hasCookie && (
          <span>
            <ul>
              <li>
                <NavLink to="/auth?mode=register">Register</NavLink>/
                <NavLink to="/auth?mode=login">Login</NavLink>
              </li>
            </ul>
          </span>
        )}
      </nav>
    </header>
  );
};
export default Header;
