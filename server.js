var express = require("express")
var app = express()
var mongodb = require("mongodb")
var MongoClient = mongodb.MongoClient
var url = 'mongodb://jopet:jopet@ds237445.mlab.com:37445/url-shortener-microservice-db'

app.get("/", function(req, res){
  //var path
  MongoClient.connect(url, function(err, db){
    if (err){
      console.log("did not connect to " + url)
    }
    if (db) {
      /*
      db.collection("urls").insertOne({
        url: req.params.qwe,
        shortened: req.params.qwe
      })
      */
      db.collection("urls").find({}).toArray(function(err, results) {
        path = results
        res.end(path.length)
      })
    }
  })
  
})

app.listen(process.env.PORT)