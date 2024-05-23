import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import StandingsTable from "./StandingsTable";
import SeasonLeagueForm from "./SeasonLeagueForm";
import "./NavBar.css";
import FixtureManagement from "./FixtureManagement";

function NavBar() {
  const [leagues, setLeagues] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState("2023");

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const response = await fetch("http://localhost:3000/data");
        const data = await response.json();
        setLeagues(data);
      } catch (error) {
        console.error("Error fetching league data:", error);
      }
    };

    fetchLeagues();
  }, []);

  useEffect(() => {
    if (leagues.length > 0) {
      const eplLeague = leagues.find(
        (league) => league.name === "English Premier League"
      );
      setSelectedLeague(eplLeague);
    }
  }, [leagues]);

  const handleSeasonChange = (event) => {
    setSelectedSeason(event.target.value);
  };

  const handleLeagueChange = (event) => {
    const selectedLeagueId = event.target.value;
    const selectedLeague = leagues.find(
      (league) => league.id === selectedLeagueId
    );
    setSelectedLeague(selectedLeague);
  };

  const [showLeagues, setShowLeagues] = useState(false);

  const handleHover = () => {
    setShowLeagues(true);
  };

  const handleLeave = () => {
    setShowLeagues(false);
  };

  return (
    <>
      <BrowserRouter>
        <Link to="/" className="navbar-title">
          Mpira
        </Link>
        <nav className="navbar">
          <Link to="/">Home</Link>
          <div
            className="dropdown"
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
          >
            <a href="#league" className="dropbtn">
              League
            </a>
            {showLeagues && (
              <div className="dropdown-content">
                {leagues.map((league) => (
                  <Link
                    key={league.id}
                    to={`/standings/${league.id}`}
                    onClick={() => setSelectedLeague(league)}
                  >
                    {league.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link to="/fixtures">Fixtures</Link>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <StandingsTable
                  leagueId={selectedLeague?.id || "epl"}
                  season={selectedSeason}
                />
              </div>
            }
          />
          <Route
            path="/standings/:leagueId"
            element={
              <div>
                {selectedLeague && (
                  <StandingsTable
                    leagueId={selectedLeague.id}
                    season={selectedSeason}
                  />
                )}
              </div>
            }
          />
        </Routes>
      </BrowserRouter>

      <SeasonLeagueForm
        seasons={["2020", "2021", "2022"]}
        leagues={leagues}
        selectedSeason={selectedSeason}
        selectedLeague={selectedLeague}
        onSeasonChange={handleSeasonChange}
        onLeagueChange={handleLeagueChange}
      />
    </>
  );
}

export default NavBar;
