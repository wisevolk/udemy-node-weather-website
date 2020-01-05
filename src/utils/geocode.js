const request = require('request');

const geocode = (address, callback) => {
    const keyMapBox = "pk.eyJ1Ijoid2lzZXZvbGsiLCJhIjoiY2s0d2wydDB5MDU3cjNtbXl6MmNjdTE0aCJ9.yQtDZRHIsuSVUvrT5O4NAA";
    address = encodeURIComponent(address);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${keyMapBox}`;
    console.log(url);


    /*    request({
            url,
            json: true
        }, (error, {body: {message, features, features: [{place_name, geometry: {coordinates: [longitude, latitude]}}]}})*/
    request({
        url,
        json: true
    }, (error, {body}) => {
        try {
            //destructuration de l'objet response
            //const {body: {message, features}} = response || {};

            if (body.message) {
                throw new Error(body.message);
            }
            if (body.features.length === 0) {
                throw new Error("No result found, try another location");
            }
            //const location = place_name;

            // DESTRUCTURATION MODIFIÉE POUR RÉSOUDRE LE PROBLÈME DES OBJETS NULL
            //Destructuration de l'objet features pour les coordonnées GPS
            //const {geometry: {coordinates: [latitude, longitude]}} = features[0] || {};
            //console.log(`${decodeURIComponent(address)} se trouve à une latitude de ${latitude} et une longitude de ${longitude}`);
            // console.log(urlMapBox);
            callback(undefined, {
                location: body.features[0].place_name,
                latitude: body.features[0].geometry.coordinates[1],
                longitude: body.features[0].geometry.coordinates[0]
            })
        } catch (e) {
            if (error) {
                callback("Unable to connect Geocoding service", undefined);
            } else {
                callback(e.message, undefined);

            }
        }
    });
};

module.exports = geocode;
