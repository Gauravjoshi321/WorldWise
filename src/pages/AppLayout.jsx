import SideBar from "../components/SideBar";
import Map from "../components/Map";
import styles from "./AppLayout.module.css";
import User from "../components/User";
import { useAuth } from "../contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function AppLayout() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(function () {
    if (!isAuthenticated) navigate('/')
  }, [isAuthenticated, navigate])

  return isAuthenticated ? (
    <div className={styles.app}>
      <SideBar />
      <Map />
      <User />
    </div>
  ) : null
}

export default AppLayout;