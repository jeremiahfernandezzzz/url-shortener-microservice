var express = require("express")
var app = express()
var mongodb = require("mongodb")
var MongoClient = mongodb.MongoClient
var url = 'mongodb://jopet:jopet@ds237445.mlab.com:37445/url-shortener-microservice-db'

app.get("/", function(req, res){
  MongoClient.connect(url, function(err, db){
    if (err){
      res.send("did not connect to " + url)
      //console.log("did not connect to " + url)
    }
    if (db) {
      res.send("connected to " + url)
    }
  })
  
  //res.end()
})

app.get("/:qwe", function(req, res){
  var input = req.params.qwe
  
  MongoClient.connect(url, function(err, db){
    if (err){
      res

app.listen(process.env.PORT)