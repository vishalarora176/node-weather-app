// Open Weather
const request = require('request')
// const url = 'https://api.openweathermap.org/data/2.5/weather?q=London&appid=6159f48e0bf5b4f9736f5bd1bd2b72f1&units=metric'

const forecast = (lat, long, callback) => {

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=6159f48e0bf5b4f9736f5bd1bd2b72f1&units=metric`
    
    request({ url }, (error, response) => {
        if (error) {
            console.log('err 1')
            callback(undefined, 'Could not fetch the weather information at the moment')
        } else {
            const data = JSON.parse(response.body)
            if (data.message) {
                console.log('err 2')
                callback(undefined, 'something wrong with the request')
            } else {
                callback({
                    data
                }, undefined)
            }
        }
    })
}

module.exports = forecast
