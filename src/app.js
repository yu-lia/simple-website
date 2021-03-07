const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
///configure ports for the public deployment
const port = process.env.PORT || 3000; //equals forst value if it exists, second if not

const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {title: "Yulia's Page", name: "Yulia"})
});

app.get('/projects', (req, res) => {
    res.render('projects', {
        title: "Projects", name: "Yulia"
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About", name: "Yulia"
    });
});

app.get('/weather', (req, res) => {
    res.render('weather', {
        title: "Who Hasn't Made a Weather App?", 
        name: "Yulia",
        subtitle: "Here is mine"
    });
});


app.get('/weatherRoute', (req, res) => {

    const city = req.query.address;

    if (!city) {
        return res.send({error: "You must provide an address"});
    }

    geocode(city, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error});
        } 
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return  res.send({error});
            } 
            res.send({
                forecast: forecastData,
                location,
                address: city
            });
        });
    });

   
    
});

///404 error pages

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: "404",
        errorMessage: "No help article found",
        name: "Yulia"
    });
});

app.get('*', (req, res) => {
    res.render('error', {
        title: "404",
        errorMessage: "No page found", 
        name: "Yulia"
     });
});

app.listen(port, () => {
    console.log("Server started on port " + port);
});