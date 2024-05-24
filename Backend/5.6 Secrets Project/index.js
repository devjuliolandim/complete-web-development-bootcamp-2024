// HINTS:
// 1. Import express and axios

// 2. Create an express app and set the port number.

// 3. Use the public folder for static files.

// 4. When the user goes to the home page it should render the index.ejs file.

// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.

// 6. Listen on your predefined port and start the server.

//Imports
import express from "express";
import axios from "axios";


//Constants
const PORT = 3000;
const app = express();
const API_URL = "https://secrets-api.appbrewery.com/";

//Middlewares
app.use(express.static("public"));

//GET
app.get("/", async (req, res)=>{

    try{
        const response = await axios.get(API_URL + "random");
        const result = response.data;
        res.render("index.ejs" , {secret: result.secret, user: result.username});
    }catch(err){
        console.error(err);
        res.status(500).send("Error to generate a secret");
    }
});


app.listen(PORT, (req, res)=>{
    console.log(`The server is running in port ${PORT}`);
})