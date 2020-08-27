console.log('Client side javascript file is loaded!')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })





// fetch('http://localhost:3000/weather?address=boston').then((response) => {
//     response.json().then((data) => {
//         if(data.error){
//             console.log(data.error)
//         } else{
//             console.log(data.Location)
//             console.log(data.forecast)
//             console.log(data.address)
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    const url = 'http://localhost:3000/weather?address=' + location

    messageOne.textContent = 'Loading ...'
    messageOne.textContent = ' '

    if(!location){
        messageOne.textContent = 'Unable to find location. Try another search.'
    } else{
        fetch(url).then((response) => {
            response.json().then((data) => {
                if(data.error){
                    messageOne.textContent = data.error
                } else{
                    messageOne.textContent = data.Location
                    messageOne.textContent = data.forecast
                }
            })
        })
    }
    
})