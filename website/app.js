
/* Global Variables */
const api_key = "5677c1ea2c80ec54d1dfc0cba02883f9";
const url = "https://api.openweathermap.org/data/2.5/weather";

//Dom Element
let generateButton = document.querySelector("#generate");
let zipInput = document.querySelector("#zip");
let feelingsTextArea = document.querySelector("#feelings");
let loading = document.querySelector(".loading");
let dateOutput = document.querySelector("#date");
let tempOutput = document.querySelector("#temp");
let contentOutput = document.querySelector("#content")

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

/**
 * @description Get Data from OpenWeatherMap website
 * @param {string} url this is the url of OpenWeatherMap
 * @param {string} zipCode this is zip code of the location that user want
 * @param {string} apiKey this is apiKey for api call
 */
async function GetDataFromWeatherApi(url, zipCode, apiKey) {
    await fetch(`${url}?zip=${zipCode}&appid=${api_key}`)
        .then(response => response.json())
        .then(async(data) => {
            let temperature = data.main.temp;
            let userResponse = feelingsTextArea.value;
            let dataObject = { temperature :  temperature,
                 date : newDate,
                  userResponse: userResponse };
            await PostDataToServer("/postData", dataObject);
        }).catch(error => {
            console.log(error);
        })
}

/**
 * @description Get Data from server 
 * @param {string} url this is the url of get data from server
 */
async function GetDataFromServer(url) {
    await fetch(url)
        .then(response => response.json())
        .then((data) => {
            UpdateUI(data);
        });
}

/**
 * @description Update element ui with data reetive from server
 * @param {Object} data 
 */
function UpdateUI(data) {
    const { temperature, date, userResponse } = data;
    dateOutput.innerHTML = `Date : ${date}`;
    tempOutput.innerHTML = `temperature : ${temperature}`;
    contentOutput.innerHTML = `your response : ${userResponse}`;
}

/**
 * @description Empty element ui 
 */
function EmptyUI() {
    dateOutput.innerHTML = "";
    tempOutput.innerHTML = "";
    contentOutput.innerHTML = "";
}

/**
 * @description Post Data to server
 * @param {string} url this is the url in server
 * @param {Object} dataObject data to send to server
 */
async function PostDataToServer(url, dataObject) {
    await fetch(url, {
        credentials: "same-origin",
        method: "POST",
        body: JSON.stringify(dataObject),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(async()=>{
        await GetDataFromServer("/getData");
    })
}

// Event listener to add function to existing HTML DOM element
generateButton.addEventListener("click", async () => {
    //Empty UI if it data exist
    EmptyUI();

    //Geting zip code from zip input value
    let zipCode = zipInput.value;

    //if the user forget to put zip code alert him 
    if(zipCode == ""){
        alert("zip code is needed ");
        return ;
    }
    //toggle Loadin spin to show 
    loading.classList.toggle("show");

    await GetDataFromWeatherApi(url, zipCode, api_key);

    //toggle Loadin spin to hide
    loading.classList.toggle("show");
})