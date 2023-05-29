if(process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}
const express = require("express");
const app = express();
const expressLayouts =  require("express-ejs-layouts");

const router = require("./routes/index")

app.set("view engine", "ejs");
app.set("views", __dirname+"/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));

const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URL, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", error => console.error('error here', error));
db.once("open", () => console.log ("connected to DB"));



app.use("/", router);

app.listen(process.env.PORT || 3001);

