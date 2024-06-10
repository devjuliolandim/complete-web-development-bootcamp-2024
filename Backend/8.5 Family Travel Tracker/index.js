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
  port: 5432,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

//Async Functions
async function checkVisisted(userID) {
  try{
    const result = await db.query("SELECT country_code FROM visited_countries WHERE user_id = $1", [userID]);
    
    const countries = result.rows.map((country)=> country.country_code);

    return countries;
  }catch(err){
    console.error("Error querying visited countries: ", err);
    throw err;
  }
}

async function queryUsers(){
  try{
    const result = await db.query("SELECT * FROM users");

    const users = result.rows.map((user)=>({
      id: user.id,
      name: user.name,
      color: user.color
    }));

    return users;
  }catch(err){
    console.error("Error querying users: ", err);
    throw err;
  }
}

//App Methods
app.get("/", async (req, res) => {
  
  const users = await queryUsers();
  
  const countries = await checkVisisted(users[0].id);

  console.log(countries);
  
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: users[0].color,
  });
});

app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code) VALUES ($1)",
        [countryCode]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/user", async (req, res) => {

  const userID = req.body.user
  const countries = await checkVisisted(userID);

});

app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
