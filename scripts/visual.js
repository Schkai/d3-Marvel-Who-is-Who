var node, link, nodes, links, herocoordinates,
diameter = 2160,
radius = diameter / 2,
innerRadius = radius - 120;

export function drawVisuals() {

    var cluster = d3.layout.cluster()
        .size([360, innerRadius])
        .sort(null)
        .value(function (d) {
            return d.size;
        });

    var bundle = d3.layout.bundle();

    var line = d3.svg.line.radial()
        .interpolate("bundle")
        .tension(.45)
        .radius(function (d) {
            return d.y;
        })
        .angle(function (d) {
            return d.x / 180 * Math.PI;
        });

    var svg = d3.selectAll("div").filter("#main").append("svg")
        .attr("width", diameter)
        .attr("height", diameter)
        .append("g")
        .attr("transform", "translate(" + radius + "," + radius + ")")
        .attr("z-index", 1);

    link = svg.append("g").selectAll(".link");
    node = svg.append("g").selectAll(".node");

    d3.json("../data/heroes_by_python.json", function (error, classes) {
        if (error) throw error;
        herocoordinates = classes;

        nodes = cluster.nodes(packageHierarchy(classes));
        links = packageImports(nodes);

        link = link
            .data(bundle(links))
            .enter().append("path")
            .each(function (d) {
                d.source = d[0], d.target = d[d.length - 1];
            })
            .attr("class", "link")
            .attr("d", line);

        node = node
            .data(nodes.filter(function (n) {
                return !n.children;
            }))
            .enter().append("text")
            .attr("class", "node")
            .attr("dy", ".31em")
            .attr("transform", function (d) {
                return "rotate(" + (d.x - 90) + ")translate(" + (d.y + 8) + ",0)" + (d.x < 180 ? "" : "rotate(180)");
            })
            .style("text-anchor", function (d) {
                return d.x < 180 ? "start" : "end";
            })
            .text(function (d) {
                return d.key;
            })
            .on("click", mouseclick)
            //.on("mouseout", mouseouted);

        // node.addEventListener("node found", onNodeSearched);

    });

    function onNodeSearched(data) {
        //console.log("onNodeSearched");
        //console.log(data.node);
    }

    

    function mouseouted(d) {
        link
            .classed("link--target", false) //removes the class of previously clicked nodes
            .classed("link--source", false); //removes the class of previously clicked nodes

        node
            .classed("node--target", false)
            .classed("node--source", false);
    }

    d3.select(self.frameElement).style("height", diameter + "px");

    function packageHierarchy(classes) {
        var map = {};

        function find(name, data) {
            var node = map[name],
                i;
            if (!node) {
                node = map[name] = data || {
                    name: name,
                    children: []
                };
                if (name.length) {
                    node.parent = find(name.substring(0, i = name.lastIndexOf(".")));
                    node.parent.children.push(node);
                    node.key = name.substring(i + 1);
                }
            }
            return node;
        }

        classes.forEach(function (d) {
            find(d.name, d);
        });

        return map[""];
    }

    // Return a list of imports for the given array of nodes.
    function packageImports(nodes) {
        var map = {},
            imports = [];

        // Compute a map from name to node.
        nodes.forEach(function (d) {
            map[d.name] = d;
        });

        // For each import, construct a link from the source to target node.
        nodes.forEach(function (d) {
            if (d.meets) d.meets.forEach(function (i) {
                imports.push({
                    source: map[d.name],
                    target: map[i]
                });
            });
        });

        return imports;
    }


}

export function mouseclick(d) {
        console.log(d);
        var background = d3.select("#main"); //.selectAll("svg");

        var card = background.selectAll((".card")).remove();

        node
            .each(function (n) {
                n.target = n.source = false;
            });

        link
            .classed("link--target", function (l) {
                if (l.target === d) return l.source.source = true;
            })
            .classed("link--source", function (l) {
                if (l.source === d) return l.target.target = true;
            })
            .filter(function (l) {
                return l.target === d || l.source === d;
            })
            .each(function () {
                this.parentNode.appendChild(this);
            });

        node
            .classed("node--target", function (n) {
                return n.target;
            }) //set the class
            .classed("node--source", function (n) {
                return n.source;
            }); //set the class

        //console.log(d.name);

        var group = background.append("div")
            .style({
                position: "absolute",
                left: (radius - 200) + 'px',
                top: (radius - 200) + 'px'
            })
            .attr("class", "card");


        group.append("img")
            .attr("class", "card-img-top")
            .attr("width", 400)
            .attr("height", 400)
            .attr("src", d.thumbnail);



        group.append("h3")
            .text(d.name)
            .attr("class", "card-header");

        group.append("p")
            .text(d.years)
            .attr("class", "card-subtitle");

        group.append("p")
            .text(d.details)
            .attr("class", "card-text");

}

export function mousesearch(name) {
  console.log(nodes);
  var nd;
  for(var i = 0; i < nodes.length; i++){
    if (nodes[i].name == name){
      nd = nodes[i];
    }
  }
  console.log(nd);
  mouseclick(nd);
  /*for (var i = 0; i < herocoordinates.length; i++) {
    if (herocoordinates[i].name == nd.innerHTML) {
        mouseclick(herocoordinates[i]);
        console.log(herocoordinates[i]);
    }
  }*/
}








