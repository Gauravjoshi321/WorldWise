import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css"

function NavBar () {
return (
  <nav className={styles.nav}>
  <ul className="flexNav">
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
  </nav>
)
}

export default NavBar;