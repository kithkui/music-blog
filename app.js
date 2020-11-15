require('dotenv').config();

var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose");
    Album         = require("./models/album");
    Supporter     = require("./models/supporter");
    functions     = require("./middleware/scripts");

mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.DATABASE_MONGODB, { useNewUrlParser: true, useFindAndModify: false });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs"); 
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res){
    let today = new Date();
    today = functions.changeDateFormat(today);
    Album.find({date:today}, function(err, foundAlbums){
        let todaysAlbum = foundAlbums[foundAlbums.length-1]
        res.render("landing", {todaysAlbum:todaysAlbum});
    });
});

app.get("/random", function(req, res){
    Album.find({}, function(err, foundAlbums){
        const randomAlbum = foundAlbums[Math.floor(Math.random() * foundAlbums.length)]
        res.render("random", {randomAlbum:randomAlbum});
    });
});


app.get("/about", function(req,res){
    res.render("about");
});

app.get("/subscription", function(req,res){
    res.render("subscription");
});

app.get("/mobileSubscription", function(req,res){
    res.render("mobileSubscription");
});

app.get("/tomorrow", function(req,res){
    res.render("tomorrow");
});

app.get("/history", function(req,res){
    Album.find({}, function(err, foundAlbums){
       if(err){
           console.log(err)
       } else {
           res.render("albums/index", {foundAlbums:foundAlbums});
       }
    });
});

app.get("/albums/new", function(req, res){
    res.render("albums/new");
});

app.post("/newSupporter", function(req,res){
    var newSupporter = {name:req.body.name, email:req.body.email}
    Supporter.create(newSupporter, function(err, newlyCreatedSupporter){
        if(err){
            console.log(err);
            res.redirect("/");
        } else {
            console.log(newlyCreatedSupporter);
            res.redirect("/subscription");
        }
    });
});

app.post("/albums", function(req,res){
    if (req.body.password === "chocapec"){
        var totalAlbums = 0;
        Album.find({}, function(err, foundAlbums){
            totalAlbums = foundAlbums.length
            var newAlbum = {index: totalAlbums+1, name:req.body.name, artist:req.body.artist, year:req.body.year,image:req.body.image,
                spotifyLink:req.body.spotifyLink, youtubeLink:req.body.youtubeLink,
                discogsLink:req.body.discogsLink, wikipediaLink:req.body.wikipediaLink, description:req.body.description, date:req.body.date}
                Album.create(newAlbum, function(err, newlyCreatedAlbum){
                    if(err){
                        console.log(err);
                    } else {
                        res.redirect("/");
                    }
                });
        });
    } else {
        res.redirect("/");
    }
});

app.get("/albums/:date", function(req,res){
    Album.find({date:req.params.date}, function(err, foundAlbum){
        if(err){
            console.log(err)
            res.redirect("albums");
        } else {
            res.render("albums/show", {album:foundAlbum});
        }
    })
});

app.get("email", function(req,res){
    Album.find({}, function(err, foundAlbums){
        let todaysAlbum = foundAlbums[foundAlbums.length-1]
        res.render("email", {todaysAlbum:todaysAlbum});
    });
});

app.get("/:anything", function(req,res){
    res.render("mistake");
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("The Music Blog Server Has Started!");
});