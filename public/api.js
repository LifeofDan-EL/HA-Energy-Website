require('dotenv').config();
const axios = require('axios');
const { response } = require('express');

const apiUrl = process.env.API_URL;
const apiToken = process.env.API_TOKEN;


async function fetchdata(){
   return axios({
        method: 'GET',
        url: apiUrl,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiToken}`
          }
        })
        .then(response => {
            console.log(response)
           return  transformResponse(response)})
        
        .catch(error => {
          console.error('Axios error:', error);
        })
    } 

function transformResponse(response){
    const data = response.data
    return {
          // values[1].innerHTML = `${data[57].state}W` No grid yet
    solarPV : data[57].state,
    inverterLoad : data[55].state,
    batteryCurrent: data[181].state,
    batterySOC: data[180].state,

    // values[5].innerHTML = `${data[57].state} W` No eletrcicity used
    solarGeneration: data[29].state,
    totalSolarGeneration: data[70].state,
    peakSolar: data[13].state,
    peakLoad: data[14].state,
    // batteryCurrent: data[179].state,
    batteryCurrent: 400,
    batteryVolts: data[178].state,
    batteryEnergy: data[184].state,
    batteryDischarge: data[32].state,
    batteryCharge:  data[33].state,
    inverterLoadPercentage: ((data[55].state / 3000) * 100).toFixed(1)

    }
}


module.exports = {
    fetchdata
}