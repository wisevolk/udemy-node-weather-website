console.log("Client side JS is loaded");

/*
fetch("http://puzzle.mead.io/puzzle")
    .then(response => {
        response.json().then(data => {
            console.log(data);
        })
    })
*/

const getLocation = (location, callback) => {
    fetch(`/weather?address=${location}`)
        .then(response => {
            response.json().then(data => {
                if (data.error)
                    callback(data.error, undefined);
                else
                    callback(undefined, data);
            });
        });
}

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const locationMessage = document.getElementById("location");
const forecastMessage = document.getElementById("forecast")

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    locationMessage.textContent = "Loading...";
    forecastMessage.textContent = "";
    console.log(search.value);
    getLocation(search.value, ((error, forecast) => {
        if (error){
            locationMessage.textContent = error;
        }else {
            locationMessage.textContent = forecast.location;
            forecastMessage.textContent = forecast.forecast;
        }
    }));
});
