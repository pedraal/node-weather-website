const request = require("request")

const geocode = (location, callback) => {
  const token = "pk.eyJ1IjoicGVkcmFhbCIsImEiOiJjanY4M3Rkb2wwYzBtNDRueTY5eWZoNGlxIn0.fNYKcXIW-P5yv4m8ojYoUw"
  const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(location) + ".json?access_token=" + token
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to the geocoding service", undefined)
    } else if (body.features.length === 0) {
      callback("Unable to find corresponding coordinates, try another search", undefined)
    } else {
      callback(undefined, {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name
      })
    }
  })
}

module.exports = geocode
