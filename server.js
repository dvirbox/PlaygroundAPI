const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

require('./app/routes/graph.routes.js')(app);

// listen for requests
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});