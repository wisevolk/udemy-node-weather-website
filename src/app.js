const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

//Define paths for Express config
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

hbs.registerPartials(partialsPath);

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);

// Setup static directory to serve
app.use(express.static(publicDirectory));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Wisevolk'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Wisevolk'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Helpful message',
        title: 'Help',
        name: 'Wise'
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Page not Found',
        errorText: "Help article not find !",
        name: 'Wise'
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
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page not Found',
        errorText: "This page can't be find !",
        name: 'Wise'
    });
});

app.listen(3000, () => {
    console.log('Server is on port 3000');
});

