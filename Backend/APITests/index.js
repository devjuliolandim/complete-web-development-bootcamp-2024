import express from 'express'
import axios from 'axios'

const app = express();
const port = 3000;

app.get("/", (req,res)=>{
    res.send(`<h1>Hello world!!!</h1>`);
});

app.listen(port, ()=>{
    console.log(`The server is running in the port ${port}`);
})