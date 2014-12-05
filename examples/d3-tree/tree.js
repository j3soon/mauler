///////////////////////
// Tic Tac Toe stuff //
///////////////////////

var tic = new mauler.games.tic.TicTacToe().move(0).move(2).move(3).move(1).move(0);

var nodeSize = 70;

var svgView = new mauler.games.tic.TicTacToeSVGView({
    model: tic,
    sideLength: nodeSize
});

var depthFirstTreeGenerator = function(node) {
    var numMoves = node.game.numMoves();
    if (numMoves > 0) {
        node.children = [];
        for (var i = 0; i < numMoves; i++) {
            var newTic = node.game.copy();
            newTic.move(i);
            var newGameNode = { game: newTic };
            node.children.push(newGameNode);
            depthFirstTreeGenerator(newGameNode);
        }
    }
};

var root = {
    name: "root",
    game: tic
};

depthFirstTreeGenerator(root);

///////////////////////////
// Non Tic Tac Toe stuff //
///////////////////////////

var margin = { top: 50, right: 50, bottom: 100, left: 50 },
    width = 1700 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

var diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.x, d.y]; });

var svg = d3.select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("style", "background-color: wheat")
    .append("g")
    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

var tree = d3.layout.tree().size([width, height]);

tree.separation(function(a, b) {
    return a.parent == b.parent ? 1.5 : 2;
});

var nodes = tree(root);

var drawNodes = function() {
    // Draw edges
    svg.selectAll("path")
        .data(tree.links(nodes))
        .enter().append("path")
        .attr("d", diagonal)
        .attr("fill", "none")
        .attr("stroke", "#666666")
        .attr("stroke-width", 2);

    svg.selectAll("g.node-group")
        .data(nodes)
        .enter()
        .append("g")
        .attr("class", "node-group")
        .attr("transform", function(d) {
            return "translate(" + (d.x - 20) + ", " + d.y + ")"
        });

    // Draw nodes
    svg.selectAll(".node-group")
        .each(function(node) {
            svgView.model = node.game;
            svgView.svg = d3.select(this);
            svgView.render();
        });

    svg.selectAll(".node-group")
        .selectAll("rect.border")
        .filter(function(d) {
            return d.game.isGameOver();
        })
        .attr("stroke", "#ff0000")
        .attr("stroke-width", 2);

    svg.selectAll(".node-group")
        .filter(function(d) {
            return d.game.isGameOver();
        })
        .append("text")
        .attr("x", function() {
            return nodeSize / 2;
        })
        .attr("y", function() {
            return nodeSize + 25;
        })
        .attr("text-anchor", "middle")
        .attr("fill", "red")
        .text(function(d) {
            return mauler.utils.utilFunc(d.game, 0);
        });

    svg.selectAll(".node-group")
        .attr("transform", function() {
            return this.getAttribute("transform") + " scale(0.6)";
        });
};

drawNodes();