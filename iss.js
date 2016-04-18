var request = require("request");
var address = "https://api.wheretheiss.at/v1/satellites/25544";

request(address, function(err, result) {
    var resultObject = JSON.parse(result.body);
	console.log("The ISS is at latitude: " + resultObject.latitude.toFixed(2));
	console.log("The ISS is at longitude: " + resultObject.longitude.toFixed(2));
});