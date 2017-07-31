import { drawVisuals } from './visual';
import { selectNodeByName } from './visual';

const INPUT_SEARCH_LIMIT = 10;
const XMLHTTP_REQUEST_OK_CODE = 200;

function init() {
    drawVisuals();
    initSearch();
}

function initSearch() {
    loadJSON('/data/heroes_by_python.json',
        function (data) {
            var availableHeroes = [];

            // saves names in array
            for (var i = 0; i < data.length; i++) {
                availableHeroes.push(data[i].name);
            }

            $("#search_input").autocomplete({
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
    // standard json-loading-script from MME-course
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

