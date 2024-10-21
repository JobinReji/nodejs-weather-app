const request = require("postman-request");

const geocode = (address, callback) => {
  const url =
    "https://api-v2.distancematrix.ai/maps/api/geocode/json?address=" +
    address +
    "&key=gBL0TXsC0rurqMBj3cWNr0NPMj3DRR1vR301Sjdm6IHiQrj58WB8KdRihGc3ZjEP";

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (response.body.result == null) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      callback(undefined, {
        latitude: response.body.result[0].geometry.location.lat,
        longitude: response.body.result[0].geometry.location.lng,
        location: response.body.result[0].address_components[2].long_name,
      });
    }
  });
};

module.exports = geocode;
