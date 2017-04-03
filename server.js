var express = require('express');
var path = require('path');
var app = express();
require('datejs'); //extends Date object

var result = {unix: null, natural: null};

app.get('/',function(req,res){
   console.log(req.params.date);
   res.send(result);
});

app.get('/:date',function(req,res){
   console.log(req.params.date);
   var date = new Date(req.params.date);
   
   if(!isNaN(req.params.date)) {
       result.unix = req.params.date;
   } else if (isValidDate(date)) {
       //try to convert to date object
       result.natural = date;
       result.unix = converToUnixTime(req.params.date);
   }
   
   res.send(result);
   //return null object when input is null
});

function isValidDate(d) {
    var result = false;
    if ( Object.prototype.toString.call(d) === "[object Date]" ) {
      // it is a date
      console.log("is a date");
      if ( isNaN( d.getTime() ) ) {  // d.valueOf() could also work
        // date is not valid
      }
      else {
        // date is valid
        console.log("valid date");
        result = true;
      }
    }
    return result;
}

function converToUnixTime(d) {
    return Date.parse(d).getTime()/1000;
}

app.listen(8080, function(){
    console.log("listening on 8080")
});