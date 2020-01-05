console.log('Client side JS is loaded');

/*
fetch('http://puzzle.mead.io/puzzle')
    .then(response => {
        response.json().then(data => {
            console.log(data);
        })
    })
*/

fetch('http://localhost:3001/weather?address=Boston')
    .then(response => {
        response.json().then(data => {
            if (data.error)
                console.log(data.error);
            else
                console.log(data);
        });
    });
