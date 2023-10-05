const express = require("express");
const { createServer } = require("http");
const url = require("url");
require("dotenv").config();
const axios = require("axios");
const config = require("./config");
const app = express();
const cors = require("cors");

const port = 5000;
const MongoDB = require("./db");
const chalk = require("chalk");

MongoDB();


const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET",
};

const decodeParams = (searchParams) =>
  Array.from(searchParams.keys()).reduce(
    (acc, key) => ({ ...acc, [key]: searchParams.get(key) }),
    {}
  );

const server = createServer((req, res) => {
  const requestURL = url.parse(req.url);
  const decodedParams = decodeParams(
    new url.URLSearchParams(requestURL.search)
  );
  const { search, country = "gb" } = decodedParams;

  const targetURL = `${config.BASE_URL}/${country.toLowerCase()}/${
    config.BASE_PARAMS
  }&app_id=${config.API_ID}&app_key=${config.API_KEY}&what=${search}`;

  if (req.method === "GET") {
    console.log(chalk.green(`Proxy GET request to: ${targetURL}`));
    axios
      .get(targetURL)
      .then((response) => {
        res.writeHead(200, headers);
        res.end(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(chalk.red(error));
        res.writeHead(500, headers);
        res.end(JSON.stringify(error));
      });
  }
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Routes

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(express.json());

app.use("/api", require("./Routes/NewUser"));

server.listen(port, () => {
  console.log(`Server Running on Port ${port}`);
});
