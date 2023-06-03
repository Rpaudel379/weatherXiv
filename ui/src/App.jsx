import { useState } from "react";

function App() {
  const [cities, setCities] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/getWeather", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cities: cities.split(",") }),
      });
      const data = await response.json();
      setWeatherData(data.weather);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
    setCities("");
  };

  return (
    <>
      <div className="max-w-lg mx-auto mt-32">
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col bg-slate-100 rounded-lg p-5 space-y-10"
        >
          <label>
            Cities:
            <input
              type="text"
              value={cities}
              placeholder="enter name of cities."
              onChange={(e) => setCities(e.target.value)}
              className="bg-slate-50 ml-5 border-2 p-2"
            />
          </label>
          <button
            type="submit"
            className="text-left bg-slate-400 w-fit p-3 rounded-lg text-slate-100"
          >
            Get Weather
          </button>
        </form>

        {Object.keys(weatherData).length === 0 ? (
          ""
        ) : (
          <>
            <div className="mt-20 bg-slate-100 p-5 rounded-lg">
              {Object.entries(weatherData).map(([city, temperature]) => (
                <ul key={city} className="list-inside list-disc">
                  <li className="text-xl font-medium">
                    {city}: {temperature}
                  </li>
                </ul>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
