/*BASIC SETUP*/
var express     = require("express");
var mongoose    = require("mongoose");
var bodyParser  = require("body-parser");
var app         = express();

/*CONNECTING PACKAGES*/
mongoose.connect("mongodb://localhost:27017//restful_blog_app",{useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));


/*SERVER*/
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Blog App has started...");
});

