/*BASIC SETUP*/
var express     = require("express");
var mongoose    = require("mongoose");
var bodyParser  = require("body-parser");
var app         = express();

/*CONNECTING PACKAGES*/
mongoose.connect("mongodb://localhost:27017/restful_blog_app",{useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));


//MANGOOSE SCHEMA/MODEL
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog",blogSchema);

//RESTFUL ROUTES
app.get("/blogs",function(req,res){
   Blog.find({},function(err,blogs){
       if(err){
           console.log("Something went wrong...");
       }else{
           res.render("index",{blogs:blogs}); 
       }
   });
   
});

app.get("/",function(req,res){
   res.redirect("/blogs"); 
});
// 

/*SERVER*/
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Blog App has started...");
});

