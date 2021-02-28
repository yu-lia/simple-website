const request = require('postman-request');
const { log } = require('util');

//const url = '';
const forecast = (latitude, longitude, callback) => {
    const url ='http://api.weatherstack.com/current?access_key=7e1dd1ee482246462063e4f605d07dc1&query=' + latitude + ',' + longitude + '&units=m';
    request({ url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('No weather service connection', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            const data = body;
            callback(undefined, data.current.weather_descriptions[0] + ". It is " + data.current.temperature + " degrees. It feels like " + data.current.feelslike + " degrees." );
            }
    });
}

module.exports = forecast;

