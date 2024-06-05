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

//Async Functions
async function fetchCountries(){
  try{
    const response = await db.query("SELECT country_code FROM visited_countries");
    countries = response.rows.map(obj => obj.country_code); //Returns an array like => ['FR','US','BR']

  }catch(err){
    console.error("An error has ocurred", err.stack);
  }
}

async function postCountry(country){
  try{
    const result = await db.query("SELECT country_code FROM countries WHERE country_name = $1", [country]);

    if(result.rows.length > 0){
      const countryCode = result.rows[0].country_code;

      //Now let's insert this countryCode in the Database!

      await db.query("INSERT INTO visited_countries (country_code) VALUES ($1)", [countryCode]);
    }else{
      console.log("No country was found for " + country);
    }

  }catch(err){
    console.error("An error has ocurred", err.stack);
  }
}

//Functions
function capitalizeString(string){
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  //Write your code here.

  await fetchCountries();

  res.render("index.ejs", {countries, total: countries.length});
  console.log(countries);
});

app.post("/add", async (req,res)=>{
  const country = capitalizeString(req.body.country);
  
  await postCountry(country);

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
