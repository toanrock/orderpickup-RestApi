const express = require('express');
const mountRoutes = require('./Routes');

const app = express();
mountRoutes(app);


app.listen(3000);