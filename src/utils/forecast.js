const request = require('request');

const forecast = (lat, long, callback) => {
    const url = `https://api.darksky.net/forecast/9fdd97f4a5d6188eff59f4de5b7cec15/${lat},${long}`;

    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback('unable to connect to weather service', undefined);
        } else if (body.error) {
            callback('unable to find location', undefined)
        } else {
            let percent = body.daily.data[0].precipProbability * 100;
            callback(undefined, `${body.daily.data[0].summary} it is currently ${body.currently.temperature} degrees out. There is a ${percent}% chance of rain. The high for today is ${body.daily.data[0].temperatureHigh} degrees, and ${body.daily.data[0].temperatureLow} degrees for the low.`);
        }
    })
}

module.exports = forecast;