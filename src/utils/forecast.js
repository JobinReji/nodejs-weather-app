const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.weatherstack.com/current?access_key=6f5a9c10afbf52a6cd68317a8482a8ec&query=" +
    encodeURIComponent(latitude) +
    "," +
    encodeURIComponent(longitude) +
    "&units=m";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location. Try another search", undefined);
    } else {
      // callback(undefined, {
      //   location: body.location.name,
      //   forecast: body.current.weather_descriptions[0],
      //   temperature: body.current.temperature + "°C",
      //   feelslike: body.current.feelslike + "°C",
      // });
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          " at " +
          body.current.observation_time +
          ". It is currently " +
          body.current.temperature +
          "°C out. There is " +
          body.current.precip +
          "% chances of rain."
      );
    }
  });
};

module.exports = forecast;
