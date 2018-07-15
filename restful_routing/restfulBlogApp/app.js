var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

mongoose.connect("",{useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Blog App has started...");
})

