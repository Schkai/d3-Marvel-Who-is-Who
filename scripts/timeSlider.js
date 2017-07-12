var yearOutput = d3.select(document.body).append('h2');

var heroesData = [];
var canvas, node, link;
var rectangles;
var currentYear;

var cluster = d3.cluster()
    .size([360, innerRadius]);

var line = d3.radialLine()
    .curve(d3.curveBundle.beta(0.85))
    .radius(function(d) { return d.y; })
    .angle(function(d) { return d.x / 180 * Math.PI; });

var TimeSlider = {}; /*=  chroniton()
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
        });*/

function createCanvas(){
  /*canvas = d3.selectAll("#main").append("svg")
      .attr("class","content")
      .attr("width", 1000)
      .attr("height", 700);*/

  canvas = d3.selectAll("#main").append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
  .append("g")
    .attr("transform", "translate(" + radius + "," + radius + ")");

  link = canvas.append("g").selectAll(".link");
  node = canvas.append("g").selectAll(".node");
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
  d3.json("./../data/heroes.json", function (error, data) {
    heroesData = data;

    var root = packageHierarchy(heroesData)
      .sum(function(d) { return d.size; });

    cluster(root);

    link = link
      .data(packageImports(root.leaves()))
      .enter().append("path")
        .each(function(d) { d.source = d[0], d.target = d[d.length - 1]; })
        .attr("class", "link")
        .attr("d", line);

    node = node
      .data(root.leaves())
      .enter().append("text")
        .attr("class", "node")
        .attr("dy", "0.31em")
        .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + (d.y + 8) + ",0)" + (d.x < 180 ? "" : "rotate(180)"); })
        .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
        .text(function(d) { return d.data.key; })
        //.on("mouseover", mouseovered)
        //.on("mouseout", mouseouted);
    });

  console.log(heroesData);
  console.log(node);
  console.log(line);
}

function mouseovered(d) {
  node
      .each(function(n) { n.target = n.source = false; });

  link
      .classed("link--target", function(l) { if (l.target === d) return l.source.source = true; })
      .classed("link--source", function(l) { if (l.source === d) return l.target.target = true; })
    .filter(function(l) { return l.target === d || l.source === d; })
      .raise();

  node
      .classed("node--target", function(n) { return n.target; })
      .classed("node--source", function(n) { return n.source; });
}

function mouseouted(d) {
  link
      .classed("link--target", false)
      .classed("link--source", false);

  node
      .classed("node--target", false)
      .classed("node--source", false);
}

// Lazily construct the package hierarchy from class names.
function packageHierarchy(data) {
  /*var map = {};

  function find(name, data) {
    var node = map[name], i;
    if (!node) {
      node = map[name] = data || {name: name};
    }
    console.log(node);
    return node;
  }

  heroesData.forEach(function(d) {
    find(d.name, d);
  });*/

  return d3.hierarchy(data);
}

// Return a list of imports for the given array of nodes.
function packageImports(nodes) {
  var map = {},
      imports = [];

  // Compute a map from name to node.
  nodes.forEach(function(d) {
    map[d.data.name] = d;
  });

  // For each import, construct a link from the source to target node.
  nodes.forEach(function(d) {
    if (d.data.imports) d.data.imports.forEach(function(i) {
      imports.push(map[d.data.name].path(map[i]));
    });
  });

  return imports;
}





export { TimeSlider, drawData, loadData, createCanvas }
