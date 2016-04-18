// Augmenting our application

// Create a file called iss-augmented.js. It will be similar to iss.js but more difficult!

// Augment your ISS application to tell the user how “far” the ISS is from them. Here is how you will do it:
// Using the prompt module, ask the user to enter their location (e.g. “montreal”)
// Using Google’s Geolocation API, find out the latitude and longitude of the provided location. Here is how:
// This URL: https://maps.googleapis.com/maps/api/geocode/json?address=montreal will show the lat/long for montreal
// Explore this URL in your web browser to figure out where the lat/lng is located. 
// Try to pass different values for “address” for educational purposes :)

// When you are comfortable with finding the location based on an input address, 
// you can then calculate the distance between the ISS and the user:
// Look at this URL: http://www.movable-type.co.uk/scripts/latlong.html
// It specifies a formula for calculating the distance. Scroll the page to the JavaScript portion, 
// and create a function that uses the provided code. You don’t need to understand what is going on in there, 
// it is very mathy!
// NOTE: In order for this code to work, you’ll need to add the following code at the beginning of your program:
// Number.prototype.toRadians = function() {
//     return this * Math.PI / 180;
//   }
// Finally, display a message to the user telling them what their “distance” to the ISS is.

function howFarIsIssFromHome() {

    // provided code
    Number.prototype.toRadians = function() {
        return this * Math.PI / 180;
    };

    // get the location of the user with a prompt
    var prompt = require("prompt");
    prompt.start();
    prompt.get(["location"], function(err, result) {
        console.log("You are located in: " + result.location);

        // Find the coordinates of the user's location
        var request = require("request");
        var address = "https://maps.googleapis.com/maps/api/geocode/json?address="+result.location;
        request(address, function(err, result) {
            var resultObject = JSON.parse(result.body);
            var userLat = resultObject.results[0].geometry.location.lat;
            var userLon = resultObject.results[0].geometry.location.lng;
            console.log("Your coordinates are: latitude: " + resultObject.results[0].geometry.location.lat.toFixed(2) + " and longitude: " + resultObject.results[0].geometry.location.lng.toFixed(2));

            // ISS finder
            var request = require("request");
            var address = "https://api.wheretheiss.at/v1/satellites/25544";
            request(address, function(err, result) {
                var resultObject = JSON.parse(result.body);
                var issLat = resultObject.latitude;
                var issLon = resultObject.longitude;
                console.log("The ISS coordinates are: latitude: " + resultObject.latitude.toFixed(2) + " and longitude: " + resultObject.longitude.toFixed(2));

                // Provided formula to calculate distance between coordinates
                var R = 6371000; // metres
                var φ1 = issLat.toRadians();
                var φ2 = userLat.toRadians();
                var Δφ = (userLat - issLat).toRadians();
                var Δλ = (userLon - issLon).toRadians();

                var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                    Math.cos(φ1) * Math.cos(φ2) *
                    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

                var d = R * c;

                console.log("You are currently " + (d/1000).toFixed(0) + " kilometers away from the ISS.");
            });
        });
    });
}

howFarIsIssFromHome();