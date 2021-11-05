var express = require("express");
var router = express.Router();
const request = require("request");
const haversine = require('haversine-distance');

const baseUrl = "https://bpdts-test-app.herokuapp.com/";
const usersUrl = `${baseUrl}/users`;
const cityUrl = `${baseUrl}/city/London/users`;

/* GET home page. */

router.get("/", function (req, res, next) {
  //Takes an error if any, a http response and the userData in JSON format
  request.get(usersUrl, (error, response, userData) => {
    const parsedData = JSON.parse(userData);

    let nearLondon = [];
    const london = { latitude: 51.5072, longitude: 0.1276 };
    parsedData.forEach((user) => {
      const userCoords = {
        latitude: user.latitude,
        longitude: user.longitude,
      };

      if (haversine(userCoords, london) / 1609 <= 50) {
        nearLondon.push(user);
      }
    });
    res.render("index", { nearLondon });
  });
});

router.get("/ldn", function (req, res, next) {
  //Takes an error if any, a http response and the userData in JSON format
  request.get(usersUrl && cityUrl, (error, response, userData) => {
    const parsedData = JSON.parse(userData);
    res.render("londonusers", { parsedData });
  });
});
module.exports = router;
