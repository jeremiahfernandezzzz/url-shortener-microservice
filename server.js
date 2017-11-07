var express = require("express")
var app = express()
var mongodb = require("mongodb")
var MongoClient = mongodb.MongoClient
var url = 'mongodb://jopet:jopet@ds237445.mlab.com:37445/url-shortener-microservice-db'

app.get("/:qwe", function(req, res){
  //var path
  MongoClient.connect(url, function(err, db){
    if (err){
      res.end("did not connect to " + url)
    }
    if (db) {
      //res.end("connected to " + url)
      
      var newUrl = {
          url: "",
          shortened: ""
      }
      
      db.collection("urls").count(function (err, count){
         newUrl = {
          url: req.params.qwe,
          shortened: Number(count)
        }
      })
      
      db.collection("urls").insertOne(newUrl)
      
      res.end(JSON.stringify(newUrl))
    }
  })
  
})

app.listen(process.env.PORT)