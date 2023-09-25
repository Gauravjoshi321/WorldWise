import { Link } from "react-router-dom";

function NavBar () {
return (
  <ul>
    <li>
      <Link to={"/"}>HOMEPAGE</Link>
    </li>
    <li>
      <Link to={"/pricing"}>PRICING</Link>
    </li>
    <li>
      <Link to={"/product"}>PRODUCT</Link>
    </li>
  </ul>
)
}

export default NavBar;