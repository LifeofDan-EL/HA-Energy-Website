require('dotenv').config();
const axios = require('axios');

const apiUrl = process.env.API_URL;
const apiToken = process.env.API_TOKEN;

  // Specify the entity_ids you want to filter
const entityIdsToFilter = [
    'sensor.esphome_web_a2e2e8_pv_power',
    'sensor.esphome_web_a2e2e8_current_load_power',
    'sensor.battery1_power',
    'sensor.battery1_soc',
    'sensor.pv_generation_daily',
    'sensor.esphome_web_a2e2e8_accumulated_solar_generation',
    'sensor.peak_solar',
    'sensor.peak_load',
    'sensor.battery1_current',
    'sensor.battery1_voltage',
    'sensor.battery1_charge',
    'sensor.battery_discharge',
    'sensor.battery_charge_2'
];

const responseData = {}

async function fetchdata() {
    try {
        const response = await axios({
            method: 'GET',
            url: apiUrl,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiToken}`
            }
        });

        if (response.status === 200) {
            const data = transformResponse(response.data);
            console.log(data)
            for (const[key, value] of Object.entries(data)){
                data[key] = getValueOrZero(value)
            }
            return data;
        } else {
            console.error('Unexpected response status:', response.status);
            return null;
        }
    } catch (error) {
        console.error('Axios error:', error);
        return null;
    }
}

function transformResponse(response){
        const data = {}
        response.filter(item => {
      return entityIdsToFilter.includes(item.entity_id)
    }).forEach(item => {
       data[item.entity_id] = item
    })
   console.log(data)
   

    return {
    // First row data
    solarPV : data['sensor.esphome_web_a2e2e8_pv_power'].state,
    inverterLoad : data['sensor.esphome_web_a2e2e8_current_load_power'].state,
    batteryPower: data['sensor.battery1_power'].state,
    batterySOC: data['sensor.battery1_soc'].state,

    //Progress bar calculations
    solarWidth: Math.trunc((data['sensor.esphome_web_a2e2e8_pv_power'].state/1400)*100),
    loadWidth: Math.trunc((data['sensor.esphome_web_a2e2e8_current_load_power'].state/3000)*100),
    batteryWidth: data['sensor.battery1_soc'].state,

    //Second table value
    solarGeneration: data['sensor.pv_generation_daily'].state,
    totalSolarGeneration: data['sensor.esphome_web_a2e2e8_accumulated_solar_generation'].state,
    peakSolar: Math.trunc(data['sensor.peak_solar'].state),
    peakLoad: Math.trunc(data['sensor.peak_load'].state),
    batteryCurrent: data['sensor.battery1_current'].state,
    batteryVolts: data['sensor.battery1_voltage'].state,
    batteryEnergy: data['sensor.battery1_charge'].state,
    batteryDischarge: roundToTwoDecimalPlaces(data['sensor.battery_discharge'].state),
    batteryCharge:  roundToTwoDecimalPlaces(data['sensor.battery_charge_2'].state),
    inverterLoadPercentage: ((data['sensor.esphome_web_a2e2e8_current_load_power'].state / 3000) * 100).toFixed(1),
    }
}

function roundToTwoDecimalPlaces(value) {
    return Math.round(value * 100) / 100;
}
//When an enity data is unavailable, it retuens a value of 0
function getValueOrZero (value){
    return  !isNaN(value) ? value : 0
}

module.exports = {
    fetchdata
}
