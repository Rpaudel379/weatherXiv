import express, { response } from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const key = "ffe76a58893244a3b5264856230306";

app.post("/getWeather", async (req, res) => {
  try {
    const cities = req.body.cities;
    const data = await getWeather(cities);
    res.json({ weather: data });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

const getWeather = async (cities) => {
  const allWeathersRequests = cities.map(async (city) => {
    const resp = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`
    );
    const data = await resp.json();
    // console.log(data.location.name, data.current.temp_c);
    // weathers[data.location.name] = `${data.current.temp_c}°C`;
    if (!resp.ok) {
      return { [city]: "No matching location found." };
    }

    if (data.error?.message.includes("No matching location found.")) {
      return { [city]: "No matching location found." };
    }
    return { [city]: `${data.current.temp_c}C` };
  });

  return Object.assign({}, ...(await Promise.all(allWeathersRequests)));
};

app.listen(5000, () => {
  console.log(`Server is running on port 5000`);
});
