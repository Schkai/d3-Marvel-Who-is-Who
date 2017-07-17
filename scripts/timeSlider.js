var yearOutput = d3.select(document.body).append('h2');

var heroesData = [];
var canvas;
var currentYear;
var exportYear;


var TimeSlider =  chroniton()
        .domain([new Date('1/1/1975'), new Date('1/1/2015')])
        .width(500)
        .labelFormat(d3.time.format('%Y'))
        .on('change', function(d) {
          var yearNameFormat = d3.time.format("%Y"); 
          console.log(yearNameFormat(d));
          yearOutput.text(yearNameFormat(d));
          currentYear = yearNameFormat(d);
          exportYear = currentYear;
          return yearNameFormat(d);
        });


export { TimeSlider };
