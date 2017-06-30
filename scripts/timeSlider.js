var yearOutput = d3.select(document.body).append('h2');

var heroesData = [];
var canvas;
var rectangles;
var currentYear;

var TimeSlider =  chroniton()
        .domain([new Date('1/1/1975'), new Date('1/1/2015')])
        .width(500)
        .labelFormat(d3.time.format('%Y'))
        .on('change', function(d) {
          var yearNameFormat = d3.time.format("%Y"); 
          console.log(yearNameFormat(d));
          yearOutput.text(yearNameFormat(d));
          currentYear = yearNameFormat(d);
          clearCanvas();
          drawData();
          return yearNameFormat(d);
        });

function createCanvas(){
  canvas = d3.selectAll("#main").append("svg")
      .attr("class","content")
      .attr("width", 1000)
      .attr("height", 700);
}

function drawData() {
    var rectGroup;
    var rect;
    var text;
    rectGroup = canvas.selectAll("g")
      .data(heroesData)
      .enter()
      .append("g")
      .filter(function(d) { return d.year == currentYear })

      rect = rectGroup.append("rect")
      .attr("width", 200)
      .attr("height", 50)
      .attr("y", function (d, i) {
        return i * 80;
      })
      .attr("fill", "red")

      text = rectGroup.append("text")
      .filter(function(d) { return d.year == currentYear })
      .attr("fill", "#ffffff")
      .attr("y", function (d, i) {
        return i * 80 + 30;
      })
      .attr("x", 5)
      .text(function (d) {
        console.log(d.name+" "+ currentYear);
        return d.name;

      });

    /*canvas.selectAll("text")
      .data(heroesData)
      .enter()
      .append("text")
      .filter(function(d) { return d.year == currentYear })
      .attr("fill", "#ffffff")
      .attr("y", function (d, i) {
        return i * 80 + 30;
      })
      .attr("x", 5)
      .text(function (d) {
        console.log(d.name+" "+ currentYear);
        return d.name;

      });*/
}

function clearCanvas(){
  canvas.selectAll("g").remove();
}

function loadData(){
  d3.json("./../data/heroes.json", function (data) {
    heroesData = data;
    console.log(heroesData);
    console.log(currentYear);
});
}





export { TimeSlider, drawData, loadData, createCanvas }
