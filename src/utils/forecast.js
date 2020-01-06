const request = require("request");

const forecast = (latitude, longitude, callback) => {

    const keyDarkSky = "187176a92232dd2938d86175bc845a52";
    const url = `https://api.darksky.net/forecast/${keyDarkSky}/${latitude},${longitude}?units=si&lang=fr`;
    console.log(url);

    //utilisation de la simplification d"écriture ES6 des paramètres (url: url)
    request({url, json: true}, (error, {body}) => {
        try {
            if (body.error) {
                throw new Error(body.error);
            }
            const {temperature, precipProbability} = body.currently || {};
            const {summary, sunriseTime, sunsetTime, temperatureHigh, temperatureLow} = body.daily.data[0] || {}
            //const {summary} = body.daily.data[0] || {};
            //console.log(`${body.daily.data[0].summary} Il fait actuellement ${temperature} degrés. Il y a  ${precipProbability}% de chance de précipitation.`);
            /*const forecastDetails = {
                summary,
                temperature,
                precipProbability
            }*/
            const returnTime = (ts) => {
                // return new Date(ts);
                const time = new Date(ts);
                return time.getHours() + "h" + time.getMinutes() + "mn";

            }
            callback(undefined, `${summary} Il fait actuellement ${temperature} degrés. Il y a  ${precipProbability}% de chance de précipitation. Le soleil se lèvera à ${returnTime(sunriseTime)} et se couchera à ${returnTime(sunsetTime)} ( !!! ces horaires sont faux !!!) , la température minimale sera de ${temperatureLow}°C et atteindra un maximum de ${temperatureHigh}°C`);
            //callback(undefined, forecastDetails);
        } catch (e) {
            if (error)
                callback("Unable to connect to weather service!", undefined);
            else
                callback(e.message, undefined);
        }
    });
};
module.exports = forecast;
