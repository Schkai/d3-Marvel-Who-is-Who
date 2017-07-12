var heroesData = [];
var canvas;
var diameter = 960,
    radius = diameter / 2,
    innerRadius = radius - 120;

function loadData(){
  d3.json("./../data/heroes.json", function (data) {
    heroesData = data;
    console.log(heroesData);
    console.log(currentYear);
});
}

function createCanvas(){
  canvas = d3.selectAll("#main").append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
  .append("g")
    .attr("transform", "translate(" + radius + "," + radius + ")");
}

function drawData(){
  console.log(heroesData);
}