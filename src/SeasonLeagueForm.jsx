// SeasonLeagueForm.jsx
import React from "react";
import "./SeasonLeagueForm.css"

function SeasonLeagueForm({
  seasons,
  leagues,
  selectedSeason,
  selectedLeague,
  onSeasonChange,
  onLeagueChange,
}){
  return (
    <form>
      <label>
        <b>League By Year:</b>   Season:
        <input type="text" value={selectedSeason} onChange={onSeasonChange} />
      </label>
      <label>
        League:
        <select value={selectedLeague?.id || ""} onChange={onLeagueChange}>
          <option value="" disabled>
            Select a league
          </option>
          {leagues.map((league) => (
            <option key={league.id} value={league.id}>
              {league.name}
            </option>
          ))}
        </select>
      </label>
    </form>
  );
};

export default SeasonLeagueForm;
