const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();

//Define paths for Express config
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

hbs.registerPartials(partialsPath);

//Setup handlebars engine and views location
app.set("view engine", "hbs");
//app.engine("html", require("hbs").__express);
app.set("views", viewsPath);

// Setup static directory to serve
app.use(express.static(publicDirectory));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Wisevolk"
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address !"
        })
    }
    geocode(req.query.address, (error, {location, latitude, longitude} = {}) => {
        if (error) {
            return res.send({error});
        }
        forecast(latitude, longitude, (error, foreCastData) => {
            if (error) {
                return res.send({error});
            }
            res.send({
                forecast: foreCastData,
                location,
                address: req.query.address
            });
        })
    });
});

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }
    console.log(req.query.search);
    res.send({
        product: []
    });
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About me",
        name: "Wisevolk"
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        message: "Helpful message",
        title: "Help",
        name: "Wise"
    });
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404 Page not Found",
        errorText: "Help article not find !",
        name: "Wise"
    });
});

/*app.get("/weather", (req, res) => {
    res.send({
        forecast: {
            temperature: "11",
            precipProbability: "0"
        },
        location: {
            city: "Paris",
            country: "France"
        }
    });
});*/

app.get("*", (req, res) => {
    res.render("404", {
        title: "404 Page not Found",
        errorText: "This page can't be find !",
        name: "Wise"
    });
});

app.listen(3001, () => {
    console.log("Server is on port 3001");
});

