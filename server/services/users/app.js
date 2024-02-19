require('dotenv').config()
const express = require('express'); 

const app = express();
const port = process.env.PORT || 4001;
const cors = require("cors");
const { connect } = require('./config/mongo')

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(require("./routes/index"))

connect()
  .then(() => (
    app.listen(port, () => {
      console.log(`Welcome to Andra Project ${port}`);
    })
  ))
  .catch(error => {
    console.error("Error starting the server:", error);
  });
