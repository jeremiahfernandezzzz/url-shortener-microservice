var express = require("express")
var app = express()
var mongodb = require("mongodb")
var MongoClient = mongodb.MongoClient
var url = 'mongodb://jopet:jopet@ds237445.mlab.com:37445/url-shortener-microservice-db'

app.get("/", function(req, res){
  res.end("hello")
})

app.get("/:qwe", function(req, res){
  var input = req.params.qwe
  res.send(input)
  res.end()
  
  MongoClient.connect(url, function(err, db){
    if (err){
      console.log("did not connect to " + url)
    }
    if (db) {
      console.log("connected to " + url)
    }
  })
})

app.listen(process.env.PORT)