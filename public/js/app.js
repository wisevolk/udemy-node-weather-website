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
    fetch(`http://localhost:3001/weather?address=${location}`)
        .then(response => {
            response.json().then(data => {
                if (data.error)
                    return callback(data.error);
                else
                    return callback(data);
            });
        });
}

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(search.value);
    getLocation(search.value, (data => {
        console.log(data);
    }));

});
