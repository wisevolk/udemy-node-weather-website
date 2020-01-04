const request = require('request');

const geocode = (address, callback) => {
    const keyMapBox = "pk.eyJ1Ijoid2lzZXZvbGsiLCJhIjoiY2s0d2wydDB5MDU3cjNtbXl6MmNjdTE0aCJ9.yQtDZRHIsuSVUvrT5O4NAA";
    address = encodeURIComponent(address);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${keyMapBox}`;
    // console.log(url);


    request({
        url,
        json: true
    }, (error, {body: {message, features, features: [{place_name, geometry: {coordinates: [latitude, longitude]}}]}}) => {
        try {
            //destructuration de l'objet response
            //const {body: {message, features}} = response || {};

            if (message) {
                throw new Error(message);
            }
            if (features.length === 0)
                throw new Error("No result found, try another location");

            //const location = place_name;

            //Destructuration de l'objet features pour les coordonnées GPS
            //const {geometry: {coordinates: [latitude, longitude]}} = features[0] || {};
            // console.log(`${decodeURIComponent(address)} se trouve à une latitude de ${latitude} et une longitude de ${longitude}`);
            // console.log(urlMapBox);
            callback(undefined, {
                location: place_name,
                latitude: latitude,
                longitude: longitude
            })
        } catch (e) {
            if (error)
                console.log(e.message);
            else
                console.log("Unable to connect Geocoding service");
        }
    });
};

module.exports = geocode;
