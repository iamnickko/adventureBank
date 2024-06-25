import { NavLink } from "react-router-dom";
import { logout } from "../utils/auth.services";

const Header = ({ hasCookie, setHasCookie }) => {
  const onClickHandler = () => {
    logout();
    setHasCookie(false);
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
            <button onClick={onClickHandler}>Logout</button>
          </span>
        )}

        {!hasCookie && (
          <span>
            <ul>
              <li>
                <NavLink to="/auth">Register/Login</NavLink>
              </li>
            </ul>
          </span>
        )}
      </nav>
    </header>
  );
};
export default Header;
