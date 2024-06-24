import { NavLink } from "react-router-dom";

const Header = () => {
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
        <span>
          <ul>
            <li>
              <NavLink to="/auth">Register/Login</NavLink>
            </li>
          </ul>
        </span>
      </nav>
    </header>
  );
};
export default Header;
