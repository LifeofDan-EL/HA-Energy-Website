require('dotenv').config();

const values = document.getElementsByClassName("value")
console.log(values)
let apiValue = []
let load = document.getElementById("load")
//const progressBar1 = document.querySelector('.pb1'); no grid
const progressBar2 = document.querySelector('.pb2');
const progressBar3 = document.querySelector('.pb3');
const progressBar4 = document.querySelector('.pb4');


const url = "https://lifeofdanel.xyz/api/states"; // API URL
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJiYjQyNGNiMjMyN2Y0YjllYmJhZDRlYmEzODg2MDMzMCIsImlhdCI6MTcxMTEzODk4MSwiZXhwIjoyMDI2NDk4OTgxfQ.s02OfVx9bUaaXzj92Jejs6zrPzFL2QyyWWY8Y_sH9Ug"; // Token
const method = "GET"; // Request method, change for what's needed


async function fetchPosts() {


    const response = await fetch(url, {
        method,
        mode: "cors",
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
        }
         })
    let data = await response.json()

    if (response){
        console.log(data)
    } else{
        console.log("error")
    }  
    // values[1].innerHTML = `${data[57].state}W` No grid yet
    values[1].innerHTML = `${data[57].state}W`
    values[2].innerHTML = `${data[55].state}W`
    values[3].innerHTML = `${data[181].state}W`
    values[4].innerHTML = `Battery ${data[180].state}%`

    // values[5].innerHTML = `${data[57].state} W` No eletrcicity used
    values[6].innerHTML = `${data[29].state}kWh`
    values[7].innerHTML = `${data[70].state}kWh`
    values[8].innerHTML = `${data[13].state}W`
    values[9].innerHTML = `${data[14].state}W`
    values[10].innerHTML = `${data[179].state}A`
    values[11].innerHTML = `${data[178].state}V`
    values[12].innerHTML = `${data[184].state}ah`
    values[13].innerHTML = `-${data[32].state}kWh`
    values[14].innerHTML = `${data[33].state}kWh`

    // Get the value from data source
    //const valueNow1 = data[57].state; no grid yet
    const valueNow2 = data[57].state;
    const valueNow3 = data[55].state;
    const valueNow4 = data[180].state;


    // Update the value attribute of the progress bars
   // progressBar1.value = valueNow1;  no grid yet
    progressBar2.value = valueNow2;
    progressBar3.value = valueNow3;
    progressBar4.value = valueNow4;

    // Gets the value of load in percentage
    load.innerHTML = `Load ${((data[55].state / 3000) * 100).toFixed(1)}%`
    console.log(load)
  }

  

  fetchPosts()

