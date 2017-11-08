var express = require("express")
var app = express()
var mongodb = require("mongodb")
var MongoClient = mongodb.MongoClient
var url = 'mongodb://jopet:jopet@ds237445.mlab.com:37445/url-shortener-microservice-db'
var validUrl = require('valid-url');
  
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
            url: "",
            shortened: ""
          }

          db.collection("urls").count(function (err, count){
             newUrl = {
              url: longUrl,
              shortened: Number(count)
            }

            db.collection("urls").insertOne(newUrl)
        
            db.collection("urls").find({shortened: Number(num)}, {_id: 0, url: 1, shortened: 1}).toArray(function(err, doc){
              res.send(JSON.stringify(doc))
            })  
          })
    } else {
          res.send("invalid url")
    }

      } else {
        var num = req.url.replace('/new/', '')
        db.collection("urls").find({shortened: Number(num)}, {_id: 0, url: 1, shortened: 1}).toArray(function(err, doc){
          if (err) {
            res.send("url not found")
          } else {
            res.redirect((doc[0]['url']))
          }
        })
      }
    }
  })
  
})

app.listen(process.env.PORT)