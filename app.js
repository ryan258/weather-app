const request = require('postman-request')

// place urls here
const url = `http://api.weatherstack.com/current?access_key={{WEATHSTACK_KEY}}=36.371868,-94.202721&units=f`
const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token={{MAPBOX_TOKEN}}&limit=1`

// arg1 - options obj - outlines what we'd like to do, url, etc
// arg2 - function to run when we get the response
request(
  {
    url: url,
    json: true
  },
  (error, response) => {
    // console.log(response)
    // const data = JSON.parse(response.body)
    // console.log(data)
    // console.log(data.current)
    //! now that we have json: true
    // console.log(response.body.current)
    // const data = JSON(response.body)
    const { weather_descriptions, temperature, precip, feelslike } = response.body.current
    const message = `${weather_descriptions[0]}\nIt is currently ${temperature}ºF degrees out.\nIt feels like ${feelslike}ºF.\nThere is a ${precip}% chance of rain.`
    // console.log(message)
  }
)

// Geocoding
// Address => Lat/Long => Weather
request(
  {
    url: geocodeURL,
    json: true
  },
  (error, response) => {
    const [lng, lat] = response.body.features[0].center
    console.log(`Lat: ${lat}\nLong: ${lng}`)
  }
)
