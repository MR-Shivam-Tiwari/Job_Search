const express = require("express");
const MongoDB = require("./db");
const app = express();
const port = 5000;

MongoDB();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type, Accept"
  );
  next();
});
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use(express.json());

app.use("/api", require("./Routes/NewUser"));

app.listen(port, () => {
  console.log(`Server Running on Port ${port}`);
});
