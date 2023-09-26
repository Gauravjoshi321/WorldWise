import Logo from "./Logo";
import styles from "./SideBar.module.css";
import AppNav from "../components/AppNav";
import { Outlet } from "react-router-dom";


function SideBar () {
  return (
    <div className={styles.sidebar}>
     <Logo/>
     <AppNav/>

     <Outlet />

     <footer className={styles.footer}>
      <p className={styles.copyright}>
        &copy; Copyright {new Date().getFullYear()} by WorldWise Inc.
      </p>
     </footer>
    </div>
  )
}

export default SideBar;