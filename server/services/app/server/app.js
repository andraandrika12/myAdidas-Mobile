if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const cors = require("cors");
const express = require("express");
const errorHandler = require("./middlewares/errorHandlers");
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(require("./routes/adminRouter"));
app.use(require("./routes/userRouter"));

app.use(errorHandler);



module.exports = app;