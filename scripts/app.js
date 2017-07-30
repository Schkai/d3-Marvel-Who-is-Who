import {
    TimeSlider
}
from './timeSlider';

import {
    drawVisuals
}
from './visual'

import {
    selectNodeByName
}
from './visual'


var PRIV_KEY = "2bc84665e9b2df0787d56fb4cf274d9c4645bd1f";
var PUBLIC_KEY = "979b099b043e4964b948d981ac2264b0";

var marvelData = [];

var heroesData = [];
var that = new EventPublisher();

function init() {
    var dataList = document.getElementById("list");

    loadJSON('/data/heroes_by_python.json',
        function (data) {

            var availableHeroes = [];

            for (var i = 0; i < data.length; i++) {
                availableHeroes.push(data[i].name);
            }

            $("#tags").autocomplete({
                source: availableHeroes,
                max: 10,
                select: function (event, ui) {
                    selectNodeByName(ui.item.value);
                }
            });

        },
        function (xhr) {
            console.error(xhr);
        }
    );
}


function loadJSON(path, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success)
                    success(JSON.parse(xhr.responseText));
            } else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}

function draw(data) {

    d3.select(document.body)
        .append('div')
        .classed('slider', true)
        .call(TimeSlider);

    d3.select('slider').append('h3').text('You selected data for:');

}

init()

drawVisuals();

draw();


function getMarvelResponse() {

    // you need a new ts every request                                                                                    
    var ts = new Date().getTime();
    var hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();

    // the api deals a lot in ids rather than just the strings you want to use
    var characterId = '1009718'; // wolverine                                                                             


    var url = 'http://gateway.marvel.com:80/v1/public/events';
    var url2 = "http://gateway.marvel.com/v1/public/events/329/characters";
    const LIMIT = 100;

    $.getJSON(url, {
            limit: LIMIT,
            offset: 0,
            ts: ts,
            apikey: PUBLIC_KEY,
            hash: hash,
        })
        .done(function (data) {
            // sort of a long dump you will need to sort through
            marvelData = data;
        })
        .fail(function (err) {
            // the error codes are listed on the dev site
            console.log(err);
        });
};

function testImages(data) {
    var results = data.data.results;
    var resultsLen = results.length;
    var output = '<ul>';

    //append images to a simple list
    for (var i = 0; i < resultsLen; i++) {
        if (results[i].images.length > 0) {
            var imgPath = results[i].images[0].path + '/standard_xlarge.' + results[i].images[0].extension;
            output += '<li><img src="' + imgPath + '"><br>' + results[i].title + '</li>';
        }
    }
    output += '</ul>'
    $('#results').append(output);
}

getMarvelResponse();
