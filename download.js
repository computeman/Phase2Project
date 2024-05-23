import fs from "fs/promises";
import fetch from "node-fetch";

// Function to download data
const fetchData = async (url) => {
  const response = await fetch(url);
  return response.json();
};

// Function to download data and save it to a JSON file
const downloadAndSaveData = async (url, fileName) => {
  try {
    const data = await fetchData(url);

    // Save data to a local JSON file
    await fs.writeFile(fileName, JSON.stringify(data, null, 2));

    console.log(`Data downloaded and saved to ${fileName}`);
    return data;
  } catch (error) {
    console.error("Error downloading data:", error.message);
    throw error;
  }
};

const baseUrl = "https://api-football-standings.azharimm.dev/leagues";
const seasons = [2019, 2020, 2021, 2022, 2023];

// Download and save standings data for all leagues
const downloadAllStandingsData = async () => {
  try {
    const allStandingsData = {};

    const leaguesResponse = await fetchData(baseUrl);
    const leaguesData = leaguesResponse.data;

    for (const league of leaguesData) {
      const leagueId = league.id;

      // Download standings data for each season
      const standingsData = {};
      for (const season of seasons) {
        standingsData[season] = await downloadAndSaveData(
          `${baseUrl}/${leagueId}/standings?season=${season}&sort=asc`,
          `${leagueId}_Standings_${season}.json`
        );
      }

      // Store standings data in one file per league
      allStandingsData[leagueId] = standingsData;
    }

    // Save allStandingsData to a single JSON file
    await fs.writeFile(
      "AllStandingsData.json",
      JSON.stringify(allStandingsData, null, 2)
    );
    console.log(
      "All standings data downloaded and saved to AllStandingsData.json"
    );
  } catch (error) {
    console.error("Error downloading all standings data:", error.message);
  }
};

// Download and save seasons data for all leagues
const downloadAllSeasonsData = async () => {
  try {
    const allSeasonsData = {};

    const leaguesResponse = await fetchData(baseUrl);
    const leaguesData = leaguesResponse.data;

    for (const league of leaguesData) {
      const leagueId = league.id;

      // Download seasons data
      allSeasonsData[leagueId] = await downloadAndSaveData(
        `${baseUrl}/${leagueId}/seasons`,
        `${leagueId}_SeasonsData.json`
      );
    }

    // Save allSeasonsData to a single JSON file
    await fs.writeFile(
      "AllSeasonsData.json",
      JSON.stringify(allSeasonsData, null, 2)
    );
    console.log("All seasons data downloaded and saved to AllSeasonsData.json");
  } catch (error) {
    console.error("Error downloading all seasons data:", error.message);
  }
};

// Run the functions to download data for all leagues
downloadAllStandingsData();
downloadAllSeasonsData();
