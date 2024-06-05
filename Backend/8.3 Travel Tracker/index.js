import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "123456",
  port: 5432
});

db.connect();

let countries = [];

async function fetchCountries(){
  try{
    const response = await db.query("SELECT country_code FROM visited_countries");
    countries = response.rows.map(obj => obj.country_code); //Returns an array like => ['FR','US','BR']

  }catch(err){
    console.error("An error has ocurred", err.stack);
  }
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  //Write your code here.

  await fetchCountries();

  res.render("index.ejs", {countries, total: countries.length});
  console.log(countries);

  db.end();
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
