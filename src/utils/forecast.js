const request = require('request')

const forecast = (latitude,longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=03a8ad1031ecb34117ccc72368c57cb3&query=" + latitude + ","+ longitude // 28.44416088073966,77.00031893738951"

    //! url: url ke jagan url because variable ka name bhi url hi hai 
    //! response hata diya because that slot is for response and humme uska body access karna hai so directly body likh diya
    // request({url: url , json: true} , (error,response) => {
    request({url , json: true} , (error,{ body }) => {
        if(error){
            callback('Unable to connect to weather service!' , undefined)
        }
        // else if(response.body.error){
        else if(body.error){
            callback('Unable to find location!' , undefined)
        }
        else{
            // temperature = response.body.current.temperature
            temperature = body.current.temperature
            // precip = response.body.current.precip
            precip = body.current.precip
            callback(undefined , "It is currently " + temperature + " degrees out. There is " + precip + "% chance of rain.")
        }
    })

}

module.exports = forecast
