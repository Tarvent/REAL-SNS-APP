const express = require("express");
const app = express();
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const PORT = 3000;
const mongoose = require("mongoose");
require("dotenv").config();

//database connection
mongoose.connect(process.env.MONGOURL)
    .then(() =>{
        console.log("MongoDB connected successfully.");
    }).catch((err) => {
        console.log(err);
    });

// Middleware
app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.get("/", (req, res) => {
    res.send("I am using express.");
})

// app.get("/", (req, res) => {
//     res.send("I am using express.");
// });

app.listen(PORT, () => console.log("Server started"));
