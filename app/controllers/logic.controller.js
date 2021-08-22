const _ = require('underscore');
const errorCodes = require('./errorCodes.js');

const graph = []; //(x, y, name, neighbors[])

// Create and Save a new Note
exports.addPoints = (req, res) => {
    var points = req.body;
    if (!points || points.length === 0) {
        return res.status(errorCodes.BadRequest).send({
            message: "Points list cant be empty"
        });
    }

    var validPoints = filterInvalidPoints(points);
    if (validPoints.length <= 0) {
        return res.status(errorCodes.BadRequest).send({
            message: "Points are invalid or already exist in the graph"
        });
    }

    graph.push(...validPoints);
    return res.send({
        addedPoints: validPoints,
        currentGraph: graph,
        graphSize: graph.length
    })
};

exports.getPoints = (req, res) => {
    return res.send({
        currentGraph: graph,
        graphSize: graph.length
    })
};

exports.findOnePoint = (req, res) => {

};

exports.updateOnePoint = (req, res) => {

};

exports.deleteOnePoint = (req, res) => {

};

exports.getEdges = (req, res) => {

};

exports.addEdges = (req, res) => {
    var edges = req.body;
    var validEdges = filterInvalidEdges(edges);

    if (!edges || validEdges.length <= 0) {
        return res.status(errorCodes.BadRequest).send({
            message: "Edges list cant be empty"
        });
    }

    validEdges.forEach((e) => AddEdge(e));
    return res.send({
        addedEdges: JSON.stringify(validEdges),
        graphSize: graph.length
    })
};

exports.getShortPath = (req, res) => {
    var body = req.body;
    var source = body.source;
    var destination = body.destination;
    var queue = [];
    var dist = {};
    var prev = {};

    _.each(graph, point => {
        dist[point.name] = Infinity;
        prev[point.name] = undefined;
        queue.push(point);
    });

    dist[source] = 0;
    while (!_.isEmpty(queue)) {
        var u = getVertexWithMinDist(dist, queue);
        queue = _.filter(queue, p => p.name !== u.name);
        var neighbors = u.neighbors;
        _.each(neighbors, v => {
            var alt = dist[u.name] + distance(v, u)

            if (alt < dist[v.name]) {
                dist[v.name] = alt;
                prev[v.name] = u.name;
            }
        });
    }

    var cur = destination;
    var ret = "" + destination;
  
    while (cur !== source) {
      ret = ret + " => " + prev[cur]
      cur = prev[cur];
    }

    return res.send(ret);
};

function getVertexWithMinDist(dist, queue) {
    var min = undefined;
    var vertex = undefined;

    _.each(queue, p => {
        if (min === undefined || dist[p.name] < min) {
            min = dist[p.name];
            vertex = p;
        }
    });

    return vertex;
}

function distance(p1, p2) {
    const power = 2;
    return Math.sqrt(Math.pow(p1.x - p2.x, power) + Math.pow(p1.y - p2.y, power));
}

function isEdgeAlreadyExist(edge) {
    _.each(graph, point => {
        if (!point.neighbors) {
            return false;
        }

        var isEdgeExist = _.filter(point.neighbors, ((n) => n.name === edge.v1 || n.name === edge.v2)) > 0;
        return isEdgeExist;
    });
}

function isValidEdge(edge) {
    return !!edge.v1 && !!edge.v2;
}

function filterInvalidEdges(edges) {
    return edges.filter((edge) => isValidEdge(edge) && !isEdgeAlreadyExist(edge));
}

function isValidPoint(point) {
    return !!point.x && !!point.y && !isNaN(point.x) && !isNaN(point.y) && !!point.name;
}

function isPointAlreadyExist(point) {
    return !!_.findWhere(graph, point)
}

function filterInvalidPoints(points) {
    return _.filter(points, (point) => isValidPoint(point) && !isPointAlreadyExist(point));
}

function AddEdge(edge) {
    var v1 = _.find(graph, point => point.name === edge.v1);
    var v2 = _.find(graph, point => point.name === edge.v2);
    if (!v1.neighbors) {
        v1.neighbors = [];
    }
    if (!v2.neighbors) {
        v2.neighbors = [];
    }

    v1.neighbors.push(v2);
    v2.neighbors.push(v1);
}

// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if (!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
};

module.exports = {
    // Add your exports here
}