var express = require('express');
var path = require('path');
var app = express();
require('datejs'); //extends Date object

var result = {};

var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

app.get('/',function(req,res){
    result = {unix: null, natural: null};
    res.send(result);
});

app.get('/:date',function(req,res){
    result = {unix: null, natural: null};
    var date = new Date(req.params.date);
    
    if(!isNaN(req.params.date)) {
        date = new Date(req.params.date*1000);
        result.unix = converToUnixTime(date);
        result.natural = convertToNaturalTime(date);
    }
    else if (isValidDate(date)) {
        result.natural = convertToNaturalTime(date);
        result.unix = converToUnixTime(date);
    }
   
   res.send(result);
});

function isValidDate(d) {
    var result = false;
    if ( Object.prototype.toString.call(d) === "[object Date]" ) {
      // it is a date
      if ( isNaN( d.getTime() ) ) {  // d.valueOf() could also work
        // date is not valid
      }
      else {
        // date is valid
        result = true;
      }
    }
    return result;
}

function converToUnixTime(d) {
    return Date.parse(d).getTime()/1000;
}

function convertToNaturalTime(d) {
    return monthNames[d.getMonth()] + " " +
    d.getDate() + ", " + d.getFullYear();
}

app.listen(8080, function(){
    console.log("listening on 8080")
});