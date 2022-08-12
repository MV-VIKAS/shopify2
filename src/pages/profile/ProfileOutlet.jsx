import React from "react";
import { Outlet } from "react-router-dom";
import './profile.css'

function ProfileOutlet() {
    return <section className="dashboardOutlet">
      <Outlet/>
  </section>;
}

export default ProfileOutlet;
