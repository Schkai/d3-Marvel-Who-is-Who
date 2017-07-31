/*import {
    TimeSlider
}
<<<<<<< HEAD
from './timeSlider';
*/
=======
from './timeSlider';*/

>>>>>>> origin/master
import {
    drawVisuals
}
from './visual'

import {
    selectNodeByName
}
from './visual'


/*var PRIV_KEY = "2bc84665e9b2df0787d56fb4cf274d9c4645bd1f";
var PUBLIC_KEY = "979b099b043e4964b948d981ac2264b0";
var marvelData = [];
*/
const INPUT_SEARCH_LIMIT = 10;
const XMLHTTP_REQUEST_OK_CODE = 200;


function init() {
    drawVisuals();

    loadJSON('/data/heroes_by_python.json',
        function (data) {
            var availableHeroes = [];

            // saves names in array
            for (var i = 0; i < data.length; i++) {
                availableHeroes.push(data[i].name);
            }

            $("#tags").autocomplete({
                // sets the source to the array and sets the number of max displayed listitems to INPUT_SEARCH_LIMIT
                source: function (request, response) {
                    var results = $.ui.autocomplete.filter(availableHeroes, request.term);

                    response(results.slice(0, INPUT_SEARCH_LIMIT));
                },
                // delay only useful for http-calls
                delay: 0,
                autoFocus: true,
                // calling selectNodeByName(name) when selected
                select: function (event, ui) {
                    selectNodeByName(ui.item.value);
                },
                // enhancing usability by giving feedback if no hero found
                response: function (event, ui) {
                    if (ui.content.length === 0) {
                        $("#input_feedback").text("This Marvel-Hero does not exist!");
                    } else {
                        $("#input_feedback").empty();
                    }
                }
            });
        },
        function (xhr) {
            console.error(xhr);
        }
    );
}


function loadJSON(path, success, error) {
    // standard json-loading-script aus MME
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === XMLHTTP_REQUEST_OK_CODE) {
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

init();

/*function draw(data) {

    var sliderdiv = d3.selectAll("div").filter("#marvel")
        .append('div')
        .attr('class', 'row');
    //.attr('style', 'margin-right: 10px')
    sliderdiv.append("div").attr('class', 'col-sm-12').classed('slider', true)
        .call(TimeSlider);


    d3.select('slider').append('h3').text('You selected data for:');

}*/

/*draw();

getMarvelResponse();


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
}*/
