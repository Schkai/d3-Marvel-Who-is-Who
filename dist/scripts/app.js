"use strict";
var PRIV_KEY = "2bc84665e9b2df0787d56fb4cf274d9c4645bd1f";
var PUBLIC_KEY = "979b099b043e4964b948d981ac2264b0";
var marvelData = [];
function draw(data) {
  d3.select("#main").append("circle").attr("cx", 50).attr("cy", 50).attr("r", 50);
}
draw();
function getMarvelResponse() {
  var ts = new Date().getTime();
  var hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();
  var characterId = '1009718';
  var url = 'http://gateway.marvel.com:80/v1/public/events';
  var url2 = "http://gateway.marvel.com/v1/public/events/329/characters";
  var LIMIT = 100;
  console.log(url);
  $.getJSON(url, {
    limit: LIMIT,
    offset: 0,
    ts: ts,
    apikey: PUBLIC_KEY,
    hash: hash
  }).done(function(data) {
    console.log(data);
    marvelData = data;
  }).fail(function(err) {
    console.log(err);
  });
}
;
function testImages(data) {
  var results = data.data.results;
  var resultsLen = results.length;
  var output = '<ul>';
  for (var i = 0; i < resultsLen; i++) {
    if (results[i].images.length > 0) {
      var imgPath = results[i].images[0].path + '/standard_xlarge.' + results[i].images[0].extension;
      output += '<li><img src="' + imgPath + '"><br>' + results[i].title + '</li>';
    }
  }
  output += '</ul>';
  $('#results').append(output);
}
getMarvelResponse();
