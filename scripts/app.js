/*import {
    TimeSlider
}
from './timeSlider';*/

import {
    drawVisuals
}
from './visual'

import {
    selectNodeByName
}
from './visual'


var marvelData = [];

function init() {
    var dataList = document.getElementById("list");

    loadJSON('/data/heroes_by_python.json',
        function (data) {

            var availableHeroes = [];

            for (var i = 0; i < data.length; i++) {
                availableHeroes.push(data[i].name);
            }

            $("#tags").autocomplete({
                source: function (request, response) {
                    var results = $.ui.autocomplete.filter(availableHeroes, request.term);

                    response(results.slice(0, 10));
                },
                delay: 0,
                autoFocus: true,
                select: function (event, ui) {
                    selectNodeByName(ui.item.value);
                },
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

/*function draw(data) {

    var sliderdiv = d3.selectAll("div").filter("#marvel")
        .append('div')
        .attr('class', 'row');
    //.attr('style', 'margin-right: 10px')
    sliderdiv.append("div").attr('class', 'col-sm-12').classed('slider', true)
        .call(TimeSlider);


    d3.select('slider').append('h3').text('You selected data for:');

}*/

init()

drawVisuals();

/*  draw function for the time slider
    commented because slider does not work properly, even though many hours where
    used to fix this problem
*/
// draw();
