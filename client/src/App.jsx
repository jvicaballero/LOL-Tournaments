import React from "react";
import { useRoutes, Link } from "react-router-dom";
import Matches from "./pages/Matches";
import MatchDetail from "./pages/MatchDetail";
import Venues from "./pages/Venues";
import VenueDetail from "./pages/VenueDetail";
import "./App.css";

const App = () => {
  let element = useRoutes([
    {
      path: "/",
      element: <Venues />,
    },
    {
      path: "/matches",
      element: <Matches />,
    },
    {
      path: "/matches/:id",
      element: <MatchDetail />,
    },
    {
      path: "/venues/:id",
      element: <VenueDetail />,
    },
  ]);

  return (
    <div className="app">
      <header className="main-header">
        <div className="header-title-card">
          <h1>LOL Tournaments</h1>
          <p className="header-subtitle">Schedule for League of Legends Tournaments</p>
        </div>

        <div className="header-buttons">
          <Link to="/" role="button">
            Home
          </Link>
          <Link to="/matches" role="button">
            Matches
          </Link>
        </div>
      </header>

      <main>{element}</main>
    </div>
  );
};

export default App;
