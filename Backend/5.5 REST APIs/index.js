import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

// HINTs: Use the axios documentation as well as the video lesson to help you.
// https://axios-http.com/docs/post_example
// Use the Secrets API documentation to figure out what each route expects and how to work with it.
// https://secrets-api.appbrewery.com/

//TODO 1: Add your own bearer token from the previous lesson.
const yourBearerToken = "442e9ade-4fed-4008-98a0-fc61169a5612";
const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

function resetEJS(res){
  res.render("index.ejs", { content: "Waiting for data..." });
}

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for data..." });
});

app.post("/get-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.get(API_URL + "/secrets/" + searchId, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/post-secret", async (req, res) => {
  // TODO 2: Use axios to POST the data from req.body to the secrets api servers.

  //Catch the data from the form in "index.ejs"
  const secretForm = req.body.secret;
  const scoreForm = req.body.score;

  //Start the "try 'n' catch" block
  try{
    await axios.post(API_URL + '/secrets', {
      secret: secretForm,
      score: scoreForm
    },config);
  }catch(err){
    console.error("Error to send data: " + err);
    res.status(500).send("Error to send data. Please, try again");
  }

  resetEJS(res);
});

app.post("/put-secret", async (req, res) => {
  const searchId = req.body.id;
  // TODO 3: Use axios to PUT the data from req.body to the secrets api servers.

  //Catch the data from the form in "index.ejs"
  const secretForm = req.body.secret;
  const scoreForm = req.body.score;

  try{
    await axios.put(API_URL + "/secrets/" + searchId, {
      secret: secretForm,
      score: scoreForm
    }, config);
  }catch(err){
    console.error("An error has ocurred: " + err);
    res.status(500).send("Failed to put data");
  }

  resetEJS(res);
});

app.post("/patch-secret", async (req, res) => {
  const searchId = req.body.id;
  // TODO 4: Use axios to PATCH the data from req.body to the secrets api servers.

  //Catch the data from the form in "index.ejs"
  const secretForm = req.body.secret;
  const scoreForm = req.body.score;

  try{
    await axios.patch(API_URL + "/secrets/" + searchId, {
      secret: secretForm,
      score: scoreForm
    }, config);
  }catch(err){
    console.error(err);
    res.status(500).send("Failed to patch with the API");
  }

  resetEJS(res);
});

app.post("/delete-secret", async (req, res) => {
  const searchId = req.body.id;
  // TODO 5: Use axios to DELETE the item with searchId from the secrets api servers.


  try{
    await axios.delete(API_URL + "/secrets/" + searchId, config);
    res.render("index.ejs", {content: `Secret with ID ${searchId} has been deleted successfully`});
  }catch(err){
    console.error(err);
    res.status(500).send("Error to delete the secret");
  }

});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
