const request = require('postman-request')

// // MapBox
const keyMapBox = 'pk.eyJ1IjoiYW1hcmluOTAiLCJhIjoiY2tkbmZ6ZWFsMGpjYjMwbmNicGRld2gxYyJ9.bP-dWnoz9T_eLoHYRlyYvw'

const geocode = (address, callback) =>{
    const placesLimit = 1
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=' + keyMapBox + '&limit=' + placesLimit

    request({ url: url, json: true }, (error, { body }) => {
        if(error){
            callback('Unable to connect to location service!', undefined)
        }
        else if(body.features.length === 0){
            callback('Unable to find location. try another search.', undefined)
        }
        else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports.geocode = geocode;

// request({ url: geoCodeMapBox, json: true }, (error, response) => {
//     if(error){
//         console.log('Unable to connect to location  service!')
//     }
//     else if(response.body.features.length == 0){
//         console.log('Unable to find location. try another search.')
//     }
//     else{
//         const latitude = response.body.features[0].center[1]
//         const longitude = response.body.features[0].center[0]
//         console.log(latitude, longitude)
//         // console.log(response)
//     }
// })


// geocode.geocode('Philadelphia', (error, data) => {
//     console.log('Error', error)
//     console.log('Data', data)
// })