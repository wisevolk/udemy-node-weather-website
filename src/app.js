const path = require('path');
const express = require('express');

const app = express();
const publicDirectory = path.join(__dirname, '../public');

app.set('view engine', 'hbs')
app.use(express.static(publicDirectory));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Wisevolk'
    });
});

app.get('/about', (req, res) => {
    res.render('about',{
        title:'About me',
        name:'Wisevolk'
    });
});

app.get('/help', (req, res) => {
    res.render('help',{
        message: 'Helpful message'
    });
});

app.get('/weather', (req, res) => {
    res.send({
        forecast: {
            temperature: '11',
            precipProbability: '0'
        },
        location: {
            city: 'Paris',
            country: 'France'
        }
    });
})

app.listen(3000, () => {
    console.log('Server is on port 3000');
});

