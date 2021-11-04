var express = require('express');
var router = express.Router();
const request = require('request');

const baseUrl = "https://bpdts-test-app.herokuapp.com/";
const usersUrl = `${baseUrl}/users`;

/* GET home page. */
router.get('/', function(req, res, next) {
  //Takes an error if any, a http response and the userData in JSON format
  request.get(usersUrl, (error, response, userData) => {
    const parsedData = JSON.parse(userData);
    res.json(parsedData);
  })
});

module.exports = router;
