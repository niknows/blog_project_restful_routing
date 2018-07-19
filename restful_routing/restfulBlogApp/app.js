/*BASIC SETUP*/
var express          = require("express");
var methodOverride   = require("method-override");
var mongoose         = require("mongoose");
var bodyParser       = require("body-parser");
var app              = express();

/*CONNECTING PACKAGES*/
mongoose.connect("mongodb://localhost:27017/restful_blog_app",{useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));


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

app.get("/blogs/new",function(req,res){
    res.render("form");
});
app.get("/blogs/:id",function(req,res){
   Blog.findById(req.params.id,function(err,foundBlog){
       if(err){
           res.redirect("/blogs");
       }else {
         res.render("show",{blog: foundBlog});  
       }
   });
   
});
app.post("/blogs",function(req,res){
   Blog.create(req.body.blog,function(err,newBlog){
       if(err){
           res.render("new");
       }else {
           console.log(newBlog + "was added to the database!");
           res.redirect("/blogs");
       }
   });
});

//EDIT ROUTE
app.get("/blogs/:id/edit",function(req,res){
   Blog.findById(req.params.id,function(err,foundBlog){
       if(err){
           res.render("/blogs");
       }else{
           res.render("edit",{blog:foundBlog});  
       }
   });
   
});

//UPDATE ROUTE 
app.put("/blogs/:id", function(req,res){
    Blog.findByIdAndUpdate(req.params.id,req.body.blog, function(err,updatedBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs/" + req.params.id);
        }
    } );
});

/*SERVER*/
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Blog App has started...");
});

