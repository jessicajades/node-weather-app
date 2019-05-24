const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config 
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

// Setup static directory to serve 
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'jess'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'jess'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'jess',
        message: 'example help message'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must provide an address'
        });
    }

    const address = req.query.address;

    geocode(address, (error, {latitude, longitude, location} = {}) => {

        if (error) {
            return res.send({
                error: error
            })
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
    
            if (error) {
                return res.send({
                    error: error
                })
            }
    
            console.log(location);
            console.log(forecastData);

            res.send({
                forecast: forecastData,
                location: location,
                address: address
            });
    
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }

    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Error',
        message: 'help article not found'
    })
});

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error',
        message: 'page not found'
    })
});

app.listen(port, () => {
    console.log(`server is up on port ${port}`);
})