const express = require("express");

const app = express();
const port = 4000;
const cors = require("cors");
const morgan = require('morgan')


app.use(morgan('dev'))
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(require("./routes/index"));

app.listen(port, () => {
  console.log(`Welcome to Andra Project ${port}`);
});
