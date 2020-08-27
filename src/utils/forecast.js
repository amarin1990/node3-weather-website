const request = require('postman-request')

// // MapBox
const key = 'a3b196827d5f666d202df009dd136c21'

const forecast = (lat, long, callback) =>{
    const place = lat + ',%' + long
    const key = 'a3b196827d5f666d202df009dd136c21'
    const units = '&units=m'
    const url = 'http://api.weatherstack.com/current?access_key=' + key + '&query=' + place + units

    request({ url , json: true }, (error, { body }) => {
        if(error){
            callback('Unable to connect to weather service!', undefined)
        }
        else if(body.error){
            callback('Unable to find location.', undefined)
        }
        else{
            callback(undefined, 'It is currently ' + body.current.temperature + ' degress out. It feels like ' + body.current.feelslike + ' degress out.')
        }
    })
}

module.exports.forecast = forecast;

// request({ url:url, json:true }, (error, response, body) => {
    // Page home information
    // console.log('error:', error); // Print the error if one occurred
    // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    // console.log('body:', body); // Print the HTML for the Google homepage.

    // Using JSON.parser but without json:true in line:9 and without units in line:7
    // const data = JSON.parse(body)
    // console.log(data)
    // console.log(data.current)

    // Using json:true in line:9 and without units in line:7
    // console.log(body.current)

    // test Using json:true in line:9  and without units in line:7
    // const temperature = body.current.temperature
    // const feelsLike = body.current.feelslike

    // console.log('It is currently ' + temperature + ' degress out. It feels like ' + feelsLike + ' degress out.')

    // test Using json:true in line:9 and units in line:7
    // const temperature = body.current.temperature
    // const feelsLike = body.current.feelslike

    // console.log('It is currently ' + temperature + ' degress out. It feels like ' + feelsLike + ' degress out.')

    // Error solution
    // if(error){
    //     console.log('Unable to connect to weather service!')
    // }
    // else if(response.body.error){
    //     console.log(response.body.error.info)
    // }
    // else{
    //     // test Using json:true in line:9 and units in line:7
    //     const temperature = body.current.temperature
    //     const feelsLike = body.current.feelslike

    //     console.log('It is currently ' + temperature + ' degress out. It feels like ' + feelsLike + ' degress out.')
    // }

// })