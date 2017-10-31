var express = require("express")
var app = express()
var mongodb = require("mongodb")
var MongoClient = mongodb.MongoClient
var url = 'mongodb://jopet:jopet@ds237445.mlab.com:37445/url-shortener-microservice-db'

app.get("/:qwe", function(req, res){
  MongoClient.connect(url, function(err, db){
    if (err){
      console.log("did not connect to " + url)
    }
    if (db) {
      var cunt
      db.collection("urls").insertOne({
        url: req.params.qwe,
        shortened: req.params.qwe
      })
      db.collection("urls", function(err, collection){
        cunt = collection.count()
      })
      res.end(cunt)
    }
  })
})

app.listen(process.env.PORT)