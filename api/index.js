const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log("Connected to MongoDB...!");
});

const app = express();
app.use(bodyparser.json());
app.use(cors());

app.use("/albums", require("./routes/albums"));

app.get("/", (req, res) => {
    res.send({ Project : "ABC"});
})

const PORT = process.env.PORT || 5000;

app.listen(PORT);