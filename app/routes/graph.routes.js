module.exports = (app) => {
    const graph = require('../controllers/logic.controller.js');

    //Graph

    // Retrieve shortest path
    app.get('/GetShortPath', graph.getShortPath);

    //Edges

    // Add edges to graph
    app.post('/AddEdges', graph.addEdges);

    // Retrieve all edges
    app.get('/GetEdges', graph.getEdges);

    //Points

    // Retrieve all points
    app.get('/GetPoints', graph.getPoints);

    // Add points to graph
    app.post('/AddPoints', graph.addPoints);

    // Retrieve a single point with pointId
    app.get('/Points/:pointId', graph.findOnePoint);

    // Update a point with pointId
    app.put('/Points/:pointId', graph.updateOnePoint);

    // Delete a point with pointId
    app.delete('/Points/:pointId', graph.deleteOnePoint);
}