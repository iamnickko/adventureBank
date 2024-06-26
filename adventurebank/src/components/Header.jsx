import { NavLink } from "react-router-dom";
import { logout } from "../utils/auth.services";

const Header = ({ hasCookie, setHasCookie, isAdmin, setIsAdmin }) => {
  const onClickHandler = () => {
    logout();
    setHasCookie(false);
    setIsAdmin(false);
  };

  return (
    <header className="pb-7">
      <nav className="flex justify-between">
        <span>
          <ul className="flex gap-7">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/adventures">Adventures</NavLink>
            </li>
            <li>
              <NavLink to="/gear">Gear</NavLink>
            </li>
          </ul>
        </span>
        {hasCookie && (
          <span>
            {hasCookie && isAdmin && <NavLink to="/admin">Admin</NavLink>}
            <button onClick={onClickHandler}>Logout</button>
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
