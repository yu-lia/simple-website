const request = require('postman-request');
const { log } = require('util');

const geocode = (address, callback) => {
    const addressForUrl = encodeURIComponent(address);
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + addressForUrl + '.json?access_token=pk.eyJ1IjoieXVsaWFhYSIsImEiOiJja2xmMXVnYmwxNjhxMndtaml4dThmMnNpIn0.SYnKhS0fn5ucIF2HgAPXZg&limit=1';
    request ({ url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect!', undefined);
        } else if (body.features.length === 0) {
            callback('No location found', undefined);
        } else {
            const {center, place_name:location} = body.features[0];
            callback(undefined, {
                longitude: center[0],
                latitude: center[1],
                location
            });
        }
    });
}

module.exports = geocode;