require("dotenv").config();
const axios = require("axios");

const apiUrl = process.env.API_URL;
const apiToken = process.env.API_TOKEN;

// Specify the entity_ids you want to filter
const entityIdsToFilter = [
  "sensor.total_pv",
  "sensor.growatt_inverter_load_consumption",
  "sensor.jk_bms_bms1_power",
  "sensor.total_battery_soc",
  "sensor.growatt_inverter_solar_output_today",
  "sensor.growatt_inverter_lifetime_solar_output",
  "sensor.peak_solar",
  "sensor.peak_load",
  "sensor.jk_bms_bms1_current",
  "sensor.jk_bms_bms1_total_voltage",
  "sensor.jk_bms_bms1_capacity_remaining",
  "sensor.battery2_discharge_daily",
  "sensor.battery2_charge_daily",
  "sensor.growatt_inverter_load_percentage",
  "sensor.jk_bms_bms1_state_of_charge",
];

async function fetchdata() {
  try {
    const response = await axios({
      method: "GET",
      url: apiUrl,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
    });

    if (response.status === 200) {
      const data = transformResponse(response.data);
      console.log("Transformed data:", data);
      return data;
    } else {
      console.error("Unexpected response status:", response.status);
      return null;
    }
  } catch (error) {
    console.error("Axios error:", error);
    return null;
  }
}

function transformResponse(response) {
  if (!Array.isArray(response)) {
    console.error("Unexpected response format. Expected an array.");
    return {};
  }

  const data = {};
  response
    .filter((item) => entityIdsToFilter.includes(item.entity_id))
    .forEach((item) => {
      data[item.entity_id] = item;
    });

  console.log("Filtered data:", data);

  const getValue = (entityId) => {
    const item = data[entityId];
    return item && item.state ? parseFloat(item.state) : 0;
  };

  const result = {
    // First row data
    solarPV: getValue("sensor.total_pv"),
    inverterLoad: getValue("sensor.growatt_inverter_load_consumption"),
    batteryPower: getValue("sensor.jk_bms_bms1_power"),
    batterySOC: getValue("sensor.jk_bms_bms1_state_of_charge"),

    //Progress bar calculations
    solarWidth: Math.trunc((getValue("sensor.total_pv") / 1400) * 100),
    loadWidth: Math.trunc(
      (getValue("sensor.growatt_inverter_load_consumption") / 3000) * 100
    ),
    batteryWidth: getValue("sensor.jk_bms_bms1_state_of_charge"),

    //Second table value
    solarGeneration: getValue("sensor.growatt_inverter_solar_output_today"),
    totalSolarGeneration: getValue(
      "sensor.growatt_inverter_lifetime_solar_output"
    ),
    peakSolar: Math.trunc(getValue("sensor.peak_solar")),
    peakLoad: Math.trunc(getValue("sensor.peak_load")),
    batteryCurrent: getValue("sensor.jk_bms_bms1_current"),
    batteryVolts: getValue("sensor.jk_bms_bms1_total_voltage"),
    batteryEnergy: getValue("sensor.jk_bms_bms1_capacity_remaining"),
    batteryDischarge: roundToTwoDecimalPlaces(
      getValue("sensor.battery2_discharge_daily")
    ),
    batteryCharge: roundToTwoDecimalPlaces(
      getValue("sensor.battery2_charge_daily")
    ),
    inverterLoadPercentage: getValue("sensor.growatt_inverter_load_percentage"),
  };

  // Apply getValueOrZero to all properties
  for (const [key, value] of Object.entries(result)) {
    result[key] = getValueOrZero(value);
  }

  return result;
}

function roundToTwoDecimalPlaces(value) {
  return Math.round(value * 100) / 100;
}

function getValueOrZero(value) {
  return !isNaN(value) ? value : 0;
}

module.exports = {
  fetchdata,
};
