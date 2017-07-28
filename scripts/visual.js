
/* global d3*/
export function drawVisuals()  {

  var yearOutput, currentYear;

var TimeSlider =  chroniton()
        .domain([new Date('1/1/1950'), new Date('1/1/2015')])
        .width(500)
        .labelFormat(d3.time.format('%Y'))
        .on('change', function(d) {
          var yearNameFormat = d3.time.format("%Y"); 
          console.log(yearNameFormat(d));
          currentYear = yearNameFormat(d);
          changeData(yearNameFormat(d));
          return yearNameFormat(d);
        });

  d3.selectAll("div").filter("#marvel")
  .append('div')
  .attr('class', 'row')
  .attr('style', 'margin-right: 10px')
  .classed('slider', true)
  .call(TimeSlider);

  d3.select('slider').append('h3xs').text('You selected data for:');


var diameter = 2160,
    radius = diameter / 2,
    innerRadius = radius - 120;

var cluster = d3.layout.cluster()
    .size([360, innerRadius])
    .sort(null)
    .value(function(d) { return d.size; });

var bundle = d3.layout.bundle();

var line = d3.svg.line.radial()
    .interpolate("bundle")
    .tension(.45)
    .radius(function(d) { return d.y; })
    .angle(function(d) { return d.x / 180 * Math.PI; });

var svg = d3.select("body").append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
  .append("g")
    .attr("transform", "translate(" + radius + "," + radius + ")");

var link = svg.append("g").selectAll(".link"),
    node = svg.append("g").selectAll(".node");

d3.json("../data/heroes_by_python.json", function(error, classes) {
  if (error){
    throw error;
  } 

  var nodes = cluster.nodes(packageHierarchy(classes)),
      links = packageImports(nodes);


  link = link
      .data(bundle(links))
    .enter().append("path")
      .each(function(d) { d.source = d[0], d.target = d[d.length - 1]; })
      .attr("class", "link")
      .attr('visibility', "hidden")
      .attr("d", line);

  node = node
      .data(nodes.filter(function(n) { return !n.children}))
    .enter().append("text")
      .attr("class", "node")
      .attr("dy", ".31em")
         //   .attr('visibility', "hidden")

      .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + (d.y + 8) + ",0)" + (d.x < 180 ? "" : "rotate(180)"); })
      .style("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
      .text(function(d) { return d.key; })
      .on("click", mouseclick)
      //.on("mouseout", mouseouted);
});


function mouseclick(d) {
  console.log(d);
  node
      .each(function(n) { n.target = n.source = false; });

  link
      .classed("link--target", function(l) { if (l.target === d){ return l.source.source = true; }})
      .classed("link--source", function(l) { if (l.source === d){ return l.target.target = true; }})
    .filter(function(l) { return l.target === d || l.source === d; })
      .each(function() { this.parentNode.appendChild(this); });

  node
      .classed("node--target", function(n) { return n.target; }) 
      .classed("node--source", function(n) { return n.source; });//set the class
    /*  .filter(function(d){ console.log(d.years >= 1950); return d.years >= 1970})
      .attr("visibility", "hidden");*/

 // console.log(d.name);
  //console.log(node);
  //filterYears(node);
}


d3.select(self.frameElement).style("height", diameter + "px");

function packageHierarchy(classes) {
  var map = {};

  function find(name, data) {
    var node = map[name], i;
    if (!node) {
      node = map[name] = data || {name: name, children: []};
      if (name.length) {
        node.parent = find(name.substring(0, i = name.lastIndexOf(".")));
        node.parent.children.push(node);
        node.key = name.substring(i + 1);
      }
    }
    return node;
  }

  classes.forEach(function(d) {
    find(d.name, d);
  });

  return map[""];
}


// Return a list of imports for the given array of nodes.
function packageImports(nodes) {
  var map = {},
      imports = [];

  // Compute a map from name to node.
  nodes.forEach(function(d) {
    map[d.name] = d;
  });

  // For each import, construct a link from the source to target node.
  nodes.forEach(function(d) {
    if (d.meets) d.meets.forEach(function(i) {
      imports.push({source: map[d.name], target: map[i]});
    });
  });

  return imports;
}

function changeData(year){
  console.log(year);

var link = d3.selectAll(".link"),
    node = d3.selectAll(".node");

    console.log(node)

node.filter(function(d){ 
  console.log(d.years);
  //console.log(d.years >= d);
});
  //console.log(d);});

   // console.log(link, node);

   // link.remove();
   // node.exit().remove();

}
}

