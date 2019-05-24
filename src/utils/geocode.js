const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiamVzc2ljYWphZGVjb2RlcyIsImEiOiJjanZwc2VhdHgwdjhoNDRyaDkyZWtrejcxIn0.nTClNnf9b5rG8JMOArDEoA&limit=1';

    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback('unable to connect to location services', undefined);
        } else if (body.features.length === 0) {
            callback('unable to find location, try another search', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    });
}

module.exports = geocode;