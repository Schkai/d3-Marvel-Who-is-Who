var node, link, nodes, links, herocoordinates,
    diameter = 2160,
    radius = diameter / 2,
    innerRadius = radius - 120;

export function drawVisuals() {
    const FULL_CIRC_RAD_DEGREES = 360;
    const HALF_CIRC_RAD_DEGREES = 180;
    const TENSION_D3 = .45;
    const DIST_PADDING_BONUS = 8;

    //use cluster layout to produce node-link diagrams that place leaf nodes of the tree at same depth
    var cluster = d3.layout.cluster()
        .size([FULL_CIRC_RAD_DEGREES, innerRadius])
        .sort(null)
        .value(function (d) {
            return d.size;
        });

    //constructs a new default bundle layout
    var bundle = d3.layout.bundle();

    //create lines between nodes
    var line = d3.svg.line.radial()
        .interpolate("bundle")
        .tension(TENSION_D3)
        .radius(function (d) {
            return d.y;
        })
        .angle(function (d) {
            return d.x / HALF_CIRC_RAD_DEGREES * Math.PI;
        });
        
        //append divs
    var svg = d3.selectAll("div").filter("#main").append("svg")
        .attr("width", diameter)
        .attr("height", diameter)
        .append("g")
        .attr("transform", "translate(" + radius + "," + radius + ")")
        .attr("z-index", 1);

    link = svg.append("g").selectAll(".link");
    node = svg.append("g").selectAll(".node");

    //load data
    d3.json("../data/heroes_by_python.json", function (error, classes) {
        if (error) throw error;
        herocoordinates = classes;

        nodes = cluster.nodes(packageHierarchy(classes));
        links = packageImports(nodes);

        //bundle links
        link = link
            .data(bundle(links))
            .enter().append("path")
            .each(function (d) {
                d.source = d[0], d.target = d[d.length - 1];
            })
            .attr("class", "link")
            .attr("d", line);
        
        //bundle nodes and display them in a circle
        node = node
            .data(nodes.filter(function (n) {
                return !n.children;
            }))
            .enter().append("text")
            .attr("class", "node")
            .attr("dy", ".31em")
            .attr("transform", function (d) {
                return "rotate(" + (d.x - (HALF_CIRC_RAD_DEGREES / 2)) + ")translate(" + (d.y + 8) + ",0)" + (d.x < HALF_CIRC_RAD_DEGREES ? "" : "rotate(" + HALF_CIRC_RAD_DEGREES + ")");
            })
            .style("text-anchor", function (d) {
                return d.x < HALF_CIRC_RAD_DEGREES ? "start" : "end";
            })
            .text(function (d) {
                return d.key;
            })
            .on("click", nodeSelect);

    });

    d3.select(self.frameElement).style("height", diameter + "px");

    //hierarchical packaging of data
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

    //return a list of imports for the given array of nodes
    function packageImports(nodes) {
        var map = {},
            imports = [];

        //compute a map from name to node
        nodes.forEach(function (d) {
            map[d.name] = d;
        });

        //for each import, construct a link from the source to target node
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

//seect node and set according color
export function nodeSelect(d) {
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

    drawInfobox(background, d);
}

//draw the infobox card
function drawInfobox(background, d) {

    var PADDING_MID_CIRC_INFOBOX = 200;

    //infobox
    var group = background.append("div")
        .style({
            position: "absolute",
            left: (radius - PADDING_MID_CIRC_INFOBOX) + 'px',
            top: (radius - PADDING_MID_CIRC_INFOBOX) + 'px'
        })
        .attr("class", "card");

    if (d.details == "") {
        d.details = "Keine Beschreibung verfügbar"
    }
    //characterimage
    group.append("img")
        .attr("class", "card-img-top")
        .attr("width", PADDING_MID_CIRC_INFOBOX * 2)
        .attr("height", PADDING_MID_CIRC_INFOBOX * 2)
        .attr("src", d.thumbnail);

    //container for character information    
    var card_block = group.append("div")
        .attr("class", "card-block")

    //charactername
    card_block.append("h4")
        .text(d.name)
        .attr("class", "card-title")

    //release year
    card_block.append("h6")
        .text(d.years)
        .attr("class", "card-subtitle mb-2 text-muted");

    //characterdetails
    card_block.append("p")
        .text(d.details)
        .attr("class", "card-text")
        .attr("style", "max-width: 360px");
}

export function selectNodeByName(name) {
    // finding node by heroe's name from search-input
    var node;
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].name === name) {
            node = nodes[i];
        }
    }

    nodeSelect(node);
}
