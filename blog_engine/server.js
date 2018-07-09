const express = require('express');
const app = express();
const path = require('path');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const postRouter = require("./routes/newpost");
const loginRoute = require("./routes/log-in");
const signupRoute = require("./routes/sign-up");
const uploadRoute = require("./routes/upload");
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname, 'public')));
app.use("/newpost", postRouter);
app.use("/login",loginRoute);
app.use("/signup",signupRoute);
app.use("/upload",uploadRoute);
app.get("/blog", (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("blog");
        const sort = {time: -1};
        dbo.collection("blogpost").find({},{_id:0}).sort(sort).toArray(function(err, result) {
            if (err) throw err;
            res.render("index",{articles: result})
            console.log(result)
            });
            db.close();
        });
});



app.get("/", (req,res) => {
    res.redirect("/blog");
    res.status(200);
});
var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://127.0.0.1:%s", port)

});