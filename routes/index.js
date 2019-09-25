/* Calls modules as variables to be used */
const express = require('express')
const app = express()
var router = express.Router();
const fs = require('fs')
const bodyParser = require('body-parser')
const helmet = require("helmet");
const fetch = require("node-fetch");
/* Calls custom json file to use it's data */
var favs = require("../favourites.json")
/* Executes values passed, parsed as json */
app.use(bodyParser.json())
app.use(express.json())
/* Creates a variable that stores an empty string */
var api = ""

/* Makes a POST request to add data */
router.post("/api" , (req, res) => {
	/* Manipulates variables text with the string value with the requested bodies value */
	api = "https://itunes.apple.com/search?term=" + req.body.artistName + "&entity="+ req.body.songOrBook + "&limit=10";
})

/* Makes a GET request to retrieve data */
router.get("/api", (req, res) => {
	/* Retrieves variables string value */
    fetch(api)
    /* Parses data as json */
    .then(res => res.json())
    /* Responds with the converted data */
    .then((json) => res.send(json));
})

/* Makes a POST request to add data */
router.post("/favs", (req, res) => {     
	/* Pushes the bodies stored data to the array in the json file */   
	favs.push(req.body)
	/* Writes data requested to the specified JSON file and converts data to a readable format for the file */
	fs.writeFile("../favourites.json", JSON.stringify(favs), (err) => {
		/* If an error occurs, outputs the console string */
		if(err){
			console.log("Could not add to favourites");
          /* If data is added successfully, outputs the console string */
      }else{
         console.log("Added to favourites");
     }
 })

})

/* Makes a GET request to retrieve data */
router.get("/favs", (req, res) => {
	/* Reads data stored in the file */
	fs.readFile("../favourites.json", (err, data) => {
		/* If an error occurs, responds with the string value */
        if (err) {
            res.send("File Not Found");
            /* If no error occurs, execute the JSON files data */
        } else {
            res.send(favs);
        }
    })
})

/* Makes a DELETE request to retrieve data */
router.delete("/favs", (req, res) => {
    /* Executes a filter function on the JSON file */
    favs = favs.filter((id) => {
        /* Returns all objects in the array that does not have the requested id */
        return id.trackID != req.body.id;
    });
    /* Writes data requested to the specified JSON file and converts data to a readable format for the file */
    fs.writeFile("../favourites.json", JSON.stringify(favs), (err) => {
        /* If an error occurs, responds with this string value */
        if (err) {
         console.log("Could not remove file")
         /* If an does not error occur, responds with this string value */
     } else {
        console.log("Data Removed")
    }
})
})

module.exports = router;
