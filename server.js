// Setup empty JS object to act as endpoint for all routes
projectData = {};



// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors")
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

//Initialize Routes

/**
 * @description This is get route which return projectData
 * @returns {Object<projectData>} projectData  
 */
app.get("/all", (req, res) => {
    res.send(projectData);
})

/**
 * @description This is post route which receive three key point 
 *  temperature , date ,user response and add them to projectData
 */
app.get("/all", (req, res) => {
    const {temperature,date,userResponse} = req.body
    projectData.temperature = temperature
    projectData.date = date
    projectData.userResponse = userResponse
})

// Setup Server
const port = 5500
app.listen(port, function () {
    console.log(`Server is now running on ${5500} port`);
});