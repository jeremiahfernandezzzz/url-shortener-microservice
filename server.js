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
      function ValidURL(str) {
        var pattern = new RegExp('^(https?:\/\/)?'+ // protocol
          '((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|'+ // domain name
          '((\d{1,3}\.){3}\d{1,3}))'+ // OR ip (v4) address
          '(\:\d+)?(\/[-a-z\d%_.~+]*)*'+ // port and path
          '(\?[;&a-z\d%_.~+=-]*)?'+ // query string
          '(\#[-a-z\d_]*)?$','i'); // fragment locater
        if(!pattern.test(str)) {
          return false;
        } else {
          return true;
        }
      }
      
      if (ValidURL(req.params.qwe)) { 
        
        var longUrl = req.params.qwe
        
        var newUrl = {
          url: "",
          shortened: ""
        }
        /*

        db.collection("urls").find({url: req.params.qwe}).toArray(function(err, doc){


        })
        */
        db.collection("urls").count(function (err, count){
           newUrl = {
            url: longUrl,
            shortened: Number(count)
          }

          db.collection("urls").insertOne(newUrl)

          res.send(JSON.stringify(newUrl))
        })

      } else {
        res.send("invalid url")
      }
      
     
      
    }
  })
  
})

app.listen(process.env.PORT)