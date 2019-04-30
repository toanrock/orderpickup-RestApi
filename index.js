const express = require('express');
const mountRoutes = require('./Routes');


const app = express();
app.use(express.json({
    reviver: reviveJson
  }));
mountRoutes(app);


app.listen(3000);

const iso8601RegExp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;

function reviveJson(key, value) {
  // revive ISO 8601 date strings to instances of Date
  if (typeof value === 'string' && iso8601RegExp.test(value)) {
    return new Date(value);
  } else {
    return value;
  }
}