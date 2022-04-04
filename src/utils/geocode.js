const request = require('request')

const geocode = (address, callback) => {
    const geoCodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?types=place%2Cpostcode%2Caddress&access_token=pk.eyJ1Ijoid2lzaC1kZXYiLCJhIjoiY2p2ZGUxMG5qMGUzNDQ0cGN1enRiMTBrayJ9.OtpVF6SUFWqqqztnEi2Zsg&limit=1`
    request({ url: geoCodingUrl, json: true }, (error, response) => {
        if (error) {
            callback(undefined, 'Could not fetch the geocode information at the moment')
        } else if (response.body.features.length === 0) {
            callback(undefined, 'Something wrong with geocode request')
        } else {
            const place = response.body.features[0];
            callback({
                location: place.place_name, 
                lat: place.center[1], 
                long: place.center[0]
            }, undefined)
        }
    })
}

module.exports = geocode