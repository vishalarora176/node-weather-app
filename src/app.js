const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup statuc directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Wish'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Wish'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Wish',
        helpText: 'Contact me for any queries'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Location is mandatory'
        })
    } else {
        geocode(req.query.address, ({lat, long, location} = {}, error) => {
            if (error) {
                return res.send({ error })
            }
            forecast(lat, long, (forecastResponse, error) => {
                if (error) {
                    return res.send({ error })
                }
                res.send({
                    forecast: forecastResponse.data.weather[0].description,
                    temperature: forecastResponse.data.main.temp,
                    location: location,
                    address: req.query.address
                })
            })
        }); 
    }
    // res.send({
    //     location: 'Bengaluru',
    //     temp: 21,
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Wish',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Wish',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})