const request = require("request")

const weather = (longitude, latitude, callback) => {
  const token = "09df213755f599cb76ec710b1f7bdc9c"
  const url = "https://api.darksky.net/forecast/" + token + "/" + latitude + "," + longitude + "?units=si"

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to the weather service", undefined)
    } else if (body.error) {
      callback("Unable to find location", undefined)
    } else {
      const forecast = `<b>Currently:</b> ${body.currently.summary} / Temperature: ${body.currently.temperature}°C / Risk of rain: ${body.currently.precipProbability}<br>
      <b>Tomorrow:</b> ${body.daily.data[1].summary}`

      callback(undefined, forecast)
    }
  })
}

module.exports = weather
