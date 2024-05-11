//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import express from "express";
import {dirname} from "path";
import { fileURLToPath,} from "url";

const PORT = 3000;
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.urlencoded({extended: true}));

function verify(req, res, next){
    let password = req.body.password;

    if(password == "ILoveProgramming"){
        res.sendFile(__dirname + "/public/secret.html");
    }else{
        res.sendFile(__dirname + "/public/index.html");
    }

    next();
}

app.use(verify);

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req,res)=>{

})

app.listen(PORT, (req,res)  =>{
    console.log(`The server is running in the port ${PORT}`);
});