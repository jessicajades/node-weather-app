const request = require('request');

const forecast = (lat, long, callback) => {
    const url = `https://api.darksky.net/forecast/9fdd97f4a5d6188eff59f4de5b7cec15/${lat},${long}`;

    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback('unable to connect to weather service', undefined);
        } else if (body.error) {
            callback('unable to find location', undefined)
        } else {
            callback(undefined, `${body.daily.data[0].summary} it is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain.`);
        }
    })
}

module.exports = forecast;