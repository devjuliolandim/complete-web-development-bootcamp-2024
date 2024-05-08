import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res)=>{
    res.send("Hello, man! Welcome to my server.");
})

app.listen(port, ()=>{
    console.log(`The server is running in the ${port} port.`);
})