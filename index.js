// importing libraries
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");

// configuring app
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('tiny'))

// connecting database
mongoose.connect(process.env.DB_CONNECTION, (err) => {
    console.log(`Database connected`);
})

// routers
const productRouters = require("./routers/products");

// configuring routers
app.use("/products", productRouters);

// running server
const port = process.env.PORT || 3000;
app.listen(port, (err) => {
    console.log(`Server is up and running on port ${port}`);
})