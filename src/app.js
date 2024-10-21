const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();

//Defin paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Jobin R",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Jobin R",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "Jobin R",
    message: "This is a help message",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: "You must provide an address",
    });
  }
  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      return res.json({
        forecastData: forecastData,
        location: location,
        address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  res.send({
    product: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("error_404", {
    title: "Error - 404",
    name: "Jobin R",
    message: "Help Aritcle not found!",
  });
});

app.get("*", (req, res) => {
  res.render("error_404", {
    title: "Error - 404",
    name: "Jobin R",
    message: "This page doesn't exist now!",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
