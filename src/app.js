const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//! Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//! Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views' , viewsPath)
hbs.registerPartials(partialsPath)

//! Setup static directory to serve 
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {

    res.render('index' , {
        title: 'Weather App',
        name: 'Ayush Senapati'
    })
})

app.get('/about' , (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ayush Senapati'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Ayush Senapati'
    })
})

app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Must provide an address term'
        })
    }

    geocode(req.query.address, (error , {latitude,longitude,location} = {}) => {
        if(error){
            return res.send({error})
        }

        forecast(latitude , longitude , (error , forecastData) => {
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })

    })
    
    // res.send({
    //     forecast:'This is forecast',
    //     location:'This is location',
    //     address: req.query.address
    // })
})

//! Goal: Wire up /weather
//1. Require geocode/forecast into app.js
//2. Use the address to geocode
//3. Use the coordinates to get forecast
//4. Send back the real forecast and location

app.get('/products' , (req,res) => {
    //! if search query is not provided then show user error
    if (!req.query.search) {
        return res.send({
            error: 'You must provide an search term'
        })
    }

    //! yeh console mein sirf search ka result dikhayega
    console.log(req.query.search)

    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Ayush',
        errorMessage: 'Help Article not found'
    })
})

app.get('*' , (req,res) => {
    res.render('404' , {
        title: '404',
        name: 'Ayush Senapati',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
