// DONT REALLY NEED THIS SINCE THE TABLE GETS CREATED IN HEROKU
// ONLY USED FOR CREATING ONE IN YOUR LOCAL ENV.

var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/pepper';

// start new db client connection
var client = new pg.Client(connectionString);
client.connect();

//var createElementsTable = client.query('CREATE TABLE elements(id SERIAL PRIMARY KEY, source VARCHAR not null)');

// New Schema
/*
{
  id: 1
  name: “cake”,
  preview: “cake-preview.png”
  source: “cake.svg"
}
*/
var createElementsTable = client.query('CREATE TABLE elements(id SERIAL PRIMARY KEY, name VARCHAR not null, preview VARCHAR not null, source VARCHAR not null)');

createElementsTable.on('end', function() { client.end(); });

