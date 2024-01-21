import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Map from "../components/Map";

import styles from "./AppLayout.module.css";
import User from "../components/User";
import { useCities } from "../contexts/CitiesContext";

export default function AppLayout() {
  const { cities, fetchCities } = useCities();

  useEffect(function () {
    fetchCities();
  }, []);

  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
}
