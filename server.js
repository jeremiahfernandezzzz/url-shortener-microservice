var express = require("express")
var app = express()

app.get("/", function(req, res){
  res.end("hello")
})

app.get("/:qwe", function(req, res){
  var input = req.qwe
})

app.listen(process.env.PORT)