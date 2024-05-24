import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "julhaolandim";
const yourPassword = "abc";
const yourAPIKey = "8da21a6f-d520-43ad-befe-2dcfa19cedc1";
const yourBearerToken = "442e9ade-4fed-4008-98a0-fc61169a5612";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
  try{
    const response = await axios.get(API_URL + "random");
    const result = response.data;
    const resultString = JSON.stringify(result);
    res.render("index.ejs", {content: resultString});

  }catch (error){
    console.error("An error occourred: " + error);
    res.status(500).send("An error occurred while fetching data.");
  }

});

app.get("/basicAuth", async (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */

    try{
      const response = await axios.get(API_URL + "all?page=2",{
        auth:{
          username: yourUsername,
          password: yourPassword
        }
      });

      const result = response.data;
      const resultString = JSON.stringify(result);

      res.render("index.ejs", {content : resultString});

    }catch(error){
      console.error("An error occurred " + error);
      res.status(500).send("An error occurred while fetching data.");
    }

});

app.get("/apiKey", async (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
  try{
    const response = await axios.get(API_URL + "filter", {
      params:{
        score: 5,
        apiKey: yourAPIKey
      },
    });
    res.render("index.ejs", {content: JSON.stringify(response.data)});
  }catch(error){
    console.error("An error occurred: " + error);
    res.status(500).send("An error occurred while fetching data.");
  }
});

app.get("/bearerToken", async (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
  try {
    const response = await axios.get(`${API_URL}secrets/42`, {
      headers: {
        Authorization: `Bearer ${yourBearerToken}`
      },
    });

    res.render("index.ejs", { content: JSON.stringify(response.data) });
  } catch (err) {
    console.error("An error occurred: ", err);
    res.status(500).send("An error occurred while fetching data.");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
