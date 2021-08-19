const request = require('request')

const geocode = (address, callback) => {
    // const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYXl1c2gtMjkiLCJhIjoiY2tybjA1eW5lMHM4YjJzbnZrZWlqaDl5ZSJ9.fOfQTDro2on-LP2Yhie3NQ'
    //! Instead of address , we should use encodeURIComponent(address) , the address will also work but if we give something like a special character for example "?", the the address wala will crash and the encode wala won't
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYXl1c2gtMjkiLCJhIjoiY2tybjA1eW5lMHM4YjJzbnZrZWlqaDl5ZSJ9.fOfQTDro2on-LP2Yhie3NQ'

    // request({url: url , json: true} , (error , response) => {
    request({url , json: true} , (error , { body }) => {
        if (error) {
            // This means error aaya toh yeh print karo and data ko undefined set kardo
            callback('Unable to connect to location services!' , undefined)
        }
        // else if (response.body.features.length === 0) {
        else if (body.features.length === 0) {
            callback('Unable to find location. Try another search' , undefined)
        }
        else {
            callback(undefined , {
                // latitude: response.body.features[0].center[1],
                latitude: body.features[0].center[1],
                // longitude: response.body.features[0].center[0],
                longitude: body.features[0].center[0],
                // location: response.body.features[0].place_name
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode