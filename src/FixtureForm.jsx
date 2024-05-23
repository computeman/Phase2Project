// FixtureForm.jsx
import React, { useState } from "react";
import "./FixtureForm.css";

const FixtureForm = ({ teams, onSubmit }) => {
  const [leagueId, setLeagueId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [homeTeam, setHomeTeam] = useState("");
  const [awayTeam, setAwayTeam] = useState("");
  const [venue, setVenue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a fixture object
    const fixture = {
      leagueId,
      date,
      time,
      homeTeam,
      awayTeam,
      venue,
    };

    // Pass the fixture object to the onSubmit callback
    onSubmit(fixture);

    // Reset form fields
    setLeagueId("");
    setDate("");
    setTime("");
    setHomeTeam("");
    setAwayTeam("");
    setVenue("");
  };

  return (
    <form id="fixture-form" onSubmit={handleSubmit}>
      <label>
        {" "}
        Date:{" "}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />{" "}
      </label>{" "}
      <br />{" "}
      <label>
        {" "}
        Time:{" "}
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />{" "}
      </label>
      <div className="team-container">
        <div className="team-side">
          <label>
            Home Team:
            <select
              value={homeTeam}
              onChange={(e) => setHomeTeam(e.target.value)}
            >
              <option value="">Select Team</option>
              {teams.map((team, index) => (
                <option key={index} value={team}>
                  {team}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="team-side">
          <label>
            Away Team:
            <select
              value={awayTeam}
              onChange={(e) => setAwayTeam(e.target.value)}
            >
              <option value="">Select Team</option>
              {teams.map((team, index) => (
                <option key={index} value={team}>
                  {team}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
      <br />
      <label>
        Venue:
        <input
          type="text"
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Add Fixture</button>
    </form>
  );
};

export default FixtureForm;
