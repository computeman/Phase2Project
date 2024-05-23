import React, { useEffect, useState } from "react";
import "./StandingsTable.css"
import FixtureManagement from "./FixtureManagement";

const StandingsTable = ({ leagueId, season }) => {
  const [standingsData, setStandingsData] = useState(null);
  console.log(leagueId)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/${leagueId}`);
        const data = await response.json();
        console.log("API response:", data);
        setStandingsData(data[season].data);
        console.log("standingsdata:", standingsData)
        // console.log("name:",standingsData.name);
      } catch (error) {
        console.error("Error fetching standings data:", error);
      }
    };

    fetchData();
  }, [leagueId, season]);

  if (!standingsData) {
    return <p>Loading...</p>;
  }

  const { name, seasonDisplay, standings } = standingsData;
  const teamNames = standings.map((teamStanding) => teamStanding.team.name);
  console.log("teams:", teamNames)


  return (
    <div>
      <h2>{name}</h2>
      <p>{`Season: ${seasonDisplay} (${season})`}</p>
      {standings && standings.length > 0 ? (
        <table border="1">
          <thead>
            <tr>
              <th>Team</th>
              <th>Rank</th>
              <th>Games Played</th>
              <th>Wins</th>
              <th>Draws</th>
              <th>Losses</th>
              <th>Goal Difference</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((teamStanding, index) => (
              <tr key={index}>
                <td>{teamStanding.team.name}</td>
                <td>
                  {
                    teamStanding.stats.find((stat) => stat.name === "rank")
                      .value
                  }
                </td>
                <td>
                  {
                    teamStanding.stats.find(
                      (stat) => stat.name === "gamesPlayed"
                    ).value
                  }
                </td>
                <td>
                  {
                    teamStanding.stats.find((stat) => stat.name === "wins")
                      .value
                  }
                </td>
                <td>
                  {
                    teamStanding.stats.find((stat) => stat.name === "ties")
                      .value
                  }
                </td>
                <td>
                  {
                    teamStanding.stats.find((stat) => stat.name === "losses")
                      .value
                  }
                </td>
                <td>
                  {
                    teamStanding.stats.find(
                      (stat) => stat.name === "pointDifferential"
                    ).value
                  }
                </td>
                <td>
                  {
                    teamStanding.stats.find((stat) => stat.name === "points")
                      .value
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No standings data available</p>
      )}
      <FixtureManagement teams = {teamNames}/>
    </div>
  );
};

export default StandingsTable;
