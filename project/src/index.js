const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");


/*Middleware and static files */
/*Obs: the "public" folder needs to be at the same level of "views" folder to works using the way it's especified
below */
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(morgan("dev"));

/*Routes separated in other file */
const routes = require("./routes");
app.use("/", routes);

/*Conecting to MongoDB. The app.listen wil happens only if the database is correctly connect. */
const dbURI = "mongodb+srv://juniormelo:MortaDelamongodb1@nodetuts.igaan.mongodb.net/nodetuts?retryWrites=true&w=majority";
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true}).then((result)=>{
    app.listen(3000, ()=>{
        console.log("Running");
    });
}).catch((err)=>{
    console.log("Fail: can't connect to MongoDB. Error: "+ err);
});


/*Register view engine */
app.set('view engine', 'ejs');

/*The express will look for the directory "views" as the folder where the files to be rendered are, so
if you don't make any changes, it will search for that "views" directory. However, if you want to use a different
directory or change "views" to another folder, then use the command below to set the new configuration of where
express can find the files to be rendered 

app.set("views", "name of the folder views are")
*/

/*Using the "app.use" to send a message of error 404. The app.use will watch every request and if no other "get"
up there is reached, then the code will get there and send the message below. Obs: this app.use needs to be in
the end of the code to work as a "404 error message sender" */
app.use((req, res)=>{
    res.render("404", {title: "404"});
})