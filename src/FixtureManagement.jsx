import React, { useState, useEffect } from "react";
import FixtureForm from "./FixtureForm";

const FixtureManagement = ({ teams }) => {
  const [fixtures, setFixtures] = useState([]);

  useEffect(() => {
    // Fetch the fixtures from the database when the component mounts
    fetchFixtures();
  }, []);

  const fetchFixtures = () => {
    // Make a GET request to the fixtures endpoint
    fetch("http://localhost:3002/fixtures")
      .then((response) => {
        // Check if the request was successful (status code 2xx)
        if (response.ok) {
          return response.json();
        } else {
          console.error("Failed to fetch fixtures:", response.statusText);
          throw new Error("Failed to fetch fixtures");
        }
      })
      .then((fetchedFixtures) => {
        // Update the fixtures state with the fetched data
        setFixtures(fetchedFixtures);
      })
      .catch((error) => {
        console.error("Error fetching fixtures:", error);
      });
  };

  const handleFixtureSubmit = (fixture) => {
    console.log("Fixture object:", fixture);
    // Make a POST request to the fixtures endpoint
    fetch("http://localhost:3002/fixtures", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fixture),
    })
      .then((response) => {
        // Check if the request was successful (status code 2xx)
        if (response.ok) {
          console.log("Fixture added successfully!");

          // Fetch the updated list of fixtures after the successful POST
          return fetchFixtures();
        } else {
          console.error("Failed to add fixture:", response.statusText);
          throw new Error("Failed to add fixture");
        }
      })
      .catch((error) => {
        console.error("Error adding fixture:", error);
      });
  };

  return (
    <div>
      <FixtureForm teams={teams} onSubmit={handleFixtureSubmit} />
      {/* Render the list of fixtures or perform other actions as needed */}
      {fixtures.map((fixture, index) => (
        <div key={index}>
          <p>
            {`Fixture ${index + 1}: ${fixture.homeTeam} vs ${fixture.awayTeam}`}
          </p>
          {/* Render other details of the fixture as needed */}
        </div>
      ))}
    </div>
  );
};

export default FixtureManagement;