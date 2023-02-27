require('dotenv').config();
const axios = require("axios");
const apiKey = process.env.RapidApi_Key;
const RapidApi_Host = process.env.RapidApi_Host;

async function getClima(lat, lon) {
    //si latitud y longitud vienen vacios se pone por default lat y lon de buenos aires.
    console.log(lat, "lon " , lon)
    if (lat === undefined || lat === " ") {
        lat = '-34.61315';
    }
    if (lon == undefined || lon == " ") {
        lon = '-58.37723';
    }
    let result = null;
    const options = {
        method: 'GET',
        url: 'https://weatherbit-v1-mashape.p.rapidapi.com/current',
        params: { lat: lat, lon: lon },
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': RapidApi_Host
        }
    };

    try {
        await axios.request(options).then(function (response) {
            result = response.data.data[0].weather.description
            console.log(response.data.data[0].weather.description)
        })
    } catch (error) {
        console.log(error);
        return response;
    }
    return result;
}

module.exports = { getClima }