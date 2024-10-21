const weatherForm = document.querySelector("form");
const searchElement = document.querySelector("input");
const forecast = document.querySelector("#forecast");
const loc = document.querySelector("#location");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = searchElement.value;
  const address = "/weather?address=" + location;

  forecast.innerHTML = "Loading...";
  loc.innerHTML = "";

  fetch(address).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        return (forecast.innerHTML = data.error);
      }
      forecast.textContent = data.forecastData;
      loc.textContent = data.location;
    });
  });
});
