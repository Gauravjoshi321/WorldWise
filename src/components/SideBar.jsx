import Logo from "./Logo";
import styles from "./SideBar.module.css";
import AppNav from "../components/AppNav";


function SideBar () {
  return (
    <div className={styles.sidebar}>
     <Logo/>
     <AppNav/>

     <footer className={styles.footer}>sss</footer>
    </div>
  )
}

export default SideBar;