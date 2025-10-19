// import React, { useEffect } from "react";
import { useState } from "react";
import Vocabulary from "../Vocabulary";
import Dashboard from "../Dashboard";
import "../Nav/Navbar.css";

export default function Navbar() {

  const views = {
    DASHBOARD: "dashboard",
    VOCABULARY: "vocabulary"
  };
  const [activeView, setActiveView] = useState(views.DASHBOARD);

  return (
    <div>

      <div className="nav-layout">

        <nav className="sidenav">

          <div className="nav-top">
            <div
              onClick={() => setActiveView(views.DASHBOARD)}
              className={`nav-item ${activeView === views.DASHBOARD ? "active" : ""}`}
              > Dashboard
            </div>

            <div
              onClick={() => setActiveView(views.VOCABULARY)}
              className={`nav-item ${activeView === views.VOCABULARY ? "active" : ""}`}
              > Vocabulary
            </div>
          </div>

        </nav>

        <main className="main-content">
          {activeView === views.DASHBOARD && (
            <div className="sub-content">
              <Dashboard />
            </div>
          )}
          {activeView === views.VOCABULARY && (
            <div className="sub-content">
              <Vocabulary />
            </div>
          )}

        </main>

      </div>

    </div>
  );

}