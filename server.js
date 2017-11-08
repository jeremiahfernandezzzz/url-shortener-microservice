var express = require("express")
var app = express()
var mongodb = require("mongodb")
var MongoClient = mongodb.MongoClient
var url = 'mongodb://jopet:jopet@ds237445.mlab.com:37445/url-shortener-microservice-db'
var validUrl = require('valid-url');
  

app.get("/", function(req,res){
  res.send("welcome to my 3rd fcc backend webdev certification basejump: url shortener microservice. </br> go to https://same-value.glitch.me/new/*your-url* to try the app")
})

app.get("/:shortened", function(req, res){
  var num = req.params.shortened.replace('/', '')
  if(!isNaN(num)){
    MongoClient.connect(url, function(err, db){
      if (db){
        db.collection("urls").find({short_url: 'https://same-value.glitch.me/' + Number(num)}, {_id: 0, original_url: 1, short_url: 1}).toArray(function(err, doc){
          if (err) {
            res.send("err")
          } else {
            if (doc[0]) {
              res.redirect((doc[0]['original_url']))
            } else {
              res.send({error: "url not found"})
            }
          }
        })
      }
      if (err) {
        res.end("did not connect to " + url)
      }
    })
  }
})


app.get("/new/*", function(req, res){
//var path
  MongoClient.connect(url, function(err, db){
    if (err){
      res.end("did not connect to " + url)
    }
    if (db) {
      var longUrl = req.url.replace('/new/', '')
      if(isNaN(longUrl)){
      //res.end("connected to " + url)
        if (validUrl.isUri(longUrl)){
              longUrl = encodeURI(longUrl)

              var newUrl = {
                original_url: "",
                short_url: ""
              }

              db.collection("urls").count(function (err, count){
                 newUrl = {
                  original_url: longUrl,
                  short_url: 'https://same-value.glitch.me/' + Number(count)
                }

                db.collection("urls").find({original_url: longUrl}, {_id: 0, original_url: 1, short_url: 1}).toArray(function(err, doc){
                  if (doc[0]){
                    res.send(doc)
                  } else {
                    db.collection("urls").insertOne(newUrl)
                    db.collection("urls").find({original_url: longUrl}, {_id: 0, original_url: 1, short_url: 1}).toArray(function(err, doc){
                      res.send(doc)
                    })
                  }
                })  
              })
        } else {
              res.send({error: "invalid url"})
        }
      } else {
          res.send({error: "invalid url"})
      }
    }
  })
 })

app.listen(process.env.PORT)