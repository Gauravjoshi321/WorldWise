import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css"

function NavBar () {
return (
  <div className={styles.nav}>
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
  </div>
)
}

export default NavBar;