
const values = document.getElementsByClassName("value")
console.log(values)
let apiValue = []
let load = document.getElementById("load")

const url = ""; // API URL
const token = ""; // Token
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

    values[1].innerHTML = `${data[57].state}W`
    values[2].innerHTML = `${data[55].state}W`
    values[3].innerHTML = `${data[181].state}W`
    values[4].innerHTML = `Battery ${data[180].state}%`

    // values[5].innerHTML = `${data[57].state} W`
    values[6].innerHTML = `${data[29].state}kWh`
    values[7].innerHTML = `${data[70].state}kWh`
    values[8].innerHTML = `${data[13].state}W`
    values[9].innerHTML = `${data[14].state}W`
    values[10].innerHTML = `${data[179].state}A`
    values[11].innerHTML = `${data[178].state}V`
    values[12].innerHTML = `${data[184].state}ah`
    values[13].innerHTML = `-${data[32].state}kWh`
    values[14].innerHTML = `${data[33].state}kWh`


    load.innerHTML = `Load ${((data[55].state / 3000) * 100).toFixed(1)}%`
    console.log(load)
  }


  fetchPosts()

