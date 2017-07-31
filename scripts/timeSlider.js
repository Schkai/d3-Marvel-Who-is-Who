var yearOutput = d3.selectAll("div").filter("#marvel").append('div')
  .attr('class','row')
  .append('h2');

var heroesData = [];
var canvas;
var currentYear;

var TimeSlider =  chroniton()
        .domain([new Date('1/1/1975'), new Date('1/1/2015')])
        .width(500)
        .labelFormat(d3.time.format('%Y'))
        .on('change', function(d) {
          var yearNameFormat = d3.time.format("%Y"); 
          console.log(yearNameFormat(d));
          yearOutput.text(yearNameFormat(d)).attr('class','col-sm-12');
          currentYear = yearNameFormat(d);
          return yearNameFormat(d);
        });


export { TimeSlider }
