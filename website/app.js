/* Global Variables */
const api_key = "5677c1ea2c80ec54d1dfc0cba02883f9";
const url = "https://api.openweathermap.org/data/2.5/forecast"
let generateButton = document.querySelector("#generate")

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

/**
 * @description Get Data from OpenWeatherMap website
 * @param {string} url this is the url of OpenWeatherMap
 * @param {string} zipCode this is zip code of the location that user want
 * @param {string} apiKey this is apiKey for api call
 */
async function GetDataFromWeatherApi(url , zipCode , apiKey) {
    const response = await fetch(`${url}?zip=${zipCode}&appid=${api_key}`)
    try {
        const data = await response.json()
        return data
    } catch (error) {
        throw(error)
    }
}

// Event listener to add function to existing HTML DOM element
generateButton.addEventListener("click" , async()=>{
    console.log("Hi")
    const data = await GetDataFromWeatherApi(url , "94040" , api_key)
    console.log(data)
})