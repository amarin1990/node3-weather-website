const path = require('path')
const express = require ('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

// console.log(__dirname)
// console.log(__filename)
// console.log(path.join(__dirname, '../public'))

const app= express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and viewa location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath) 
 

// 
app.use(express.static( publicDirectoryPath ))

// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })

// app.get('help', (req, res) => {
//     res.send([{
//         name: 'Andres'
//     },{
//         name:'Diana'
//     }])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1> About page </h1>')
// })

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Andres'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andres',
        img: '/img/robot.png'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help page',
        name: 'Andres'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            Error: 'You must provide an address!'
        })
    }
    else{
        geocode.geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
            if(error){
                return res.send({error})
            }
        
            forecast.forecast(latitude, longitude, (error, forecastData) => {
                if(error){
                    return res.send({error})
                }

                res.send({
        
                    forecast: forecastData,
                    Location: location,
                    address: req.query.address
                })
            })
        })
    }
})

app.get('/products', (req, res) => {
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found.',
        name: 'Andres'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page no found.',
        name: 'Andres'
    })
})

app.listen(port, () => {
    console.log('Server is up on ' + port)
})