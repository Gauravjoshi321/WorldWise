import { NavLink } from "react-router-dom";

function NavBar () {
return (
  <ul>
    <li>
      <NavLink to={"/"}>HOMEPAGE</NavLink>
    </li>
    <li>
      <NavLink to={"/pricing"}>PRICING</NavLink>
    </li>
    <li>
      <NavLink to={"/product"}>PRODUCT</NavLink>
    </li>
  </ul>
)
}

export default NavBar;