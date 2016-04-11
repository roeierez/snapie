var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/pepper';

// start new db client connection
var client = new pg.Client(connectionString);
client.connect();

var createElementsTable = client.query('CREATE TABLE elements(id SERIAL PRIMARY KEY, source VARCHAR not null)');

createElementsTable.on('end', function() { client.end(); });