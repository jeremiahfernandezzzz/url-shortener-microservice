var express = require("express")
var app = express()
var mongodb = require("mongodb")
var MongoClient = mongodb.MongoClient
var url = 'mongodb://jopet:jopet@ds237445.mlab.com:37445/url-shortener-microservice-db'

app.get("/new/:qwe", function(req, res){
  //var path
  MongoClient.connect(url, function(err, db){
    if (err){
      res.end("did not connect to " + url)
    }
    if (db) {
      
      var longUrl = req.params.qwe
      if(isNaN(longUrl)){
      //res.end("connected to " + url)
      function isURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return pattern.test(str);
      }  

        if (isURL(req.params.qwe)) {
          res.send("invalid url")
        } else { 
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

            res.send(JSON.stringify(newUrl))
          })
        }
      } else {
        db.collection("urls").find({shortened: Number(req.params.qwe)}, {_id: 0, url: 1, shortened: 1}).toArray(function(err, doc){
          if (err) {
            res.send("url not found")
          } else {
            res.send(JSON.stringify(doc))
          }
        })
      }
    }
  })
  
})

app.listen(process.env.PORT)