// Import express and axios
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

//Create an express app and set the port number.

const app     = express();
const port    = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

// public folder for static files.
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.
app.get("/", async (req,res) => {
    try {
        const result = await axios.get(API_URL + "/random")
        res.render("index.ejs", {secret: result.data.secret, user: result.data.username});
    } catch (error) {
        res.render("index.ejs", JSON.stringify(error.response.data))
    }
})

// Listen on your predefined port and start the server.
app.listen(port, () => {
    console.log(`Listening at port" ${port}`);
})