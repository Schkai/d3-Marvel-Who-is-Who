var PRIV_KEY = "6a587885fb618288dae34bb1e6f19e5789fcd90d";
var PUBLIC_KEY = "c4742b92c7e0923f3a22eeb96f90ad17";

var marvelData = [];


function draw(data) {
    //    d3.select("#main")
    //        .append("circle")
    //        .attr("cx", 50)
    //        .attr("cy", 50)
    //        .attr("r", 50);

    myChart = d3.select("#main");
    selection_g = myChart.selectAll("g").data(data.columns);
    selectEnter = selection_g.enter().append("g");

    console.log(data);

    var entryList = {
        children: []
    };

}

//draw();


function getMarvelResponse() {

    // you need a new ts every request                                                                                    
    var ts = new Date().getTime();
    var hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();

    // the api deals a lot in ids rather than just the strings you want to use
    var characterId = '1009718'; // wolverine                                                                             


    var url = 'http://gateway.marvel.com:80/v1/public/events';
    var url2 = "http://gateway.marvel.com/v1/public/events/329/characters";
    var url3 = "http://gateway.marvel.com/v1/public/comics";
    const LIMIT = 100;

    console.log(url3);
    $.getJSON(url3, {
            limit: LIMIT,
            offset: 0,
            ts: ts,
            apikey: PUBLIC_KEY,
            hash: hash,
            //characters: characterId
        })
        .done(function (data) {
            // sort of a long dump you will need to sort through
            console.log(data);
            marvelData = data;
            testImages(data);
            draw(data);
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
